import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client'; // New: For real-time chat
import '../styles/Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [chats, setChats] = useState([]); // New: Store chats
  const [selectedChat, setSelectedChat] = useState(null); // New: Selected chat for reply
  const [adminMessage, setAdminMessage] = useState(''); // New: Admin's message input
  const [socket, setSocket] = useState(null); // New: Socket.io connection

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`, {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordChangeMessage('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/change-password`,
        changePasswordForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordChangeMessage(res.data.message);
      setChangePasswordForm({ currentPassword: '', newPassword: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error changing password');
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [volunteerRes, donationRes, chatRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/volunteers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/donations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats`, {
          headers: { Authorization: `Bearer ${token}` },
        }), // New: Fetch chats
      ]);
      setVolunteers(volunteerRes.data);
      setDonations(donationRes.data);
      setChats(chatRes.data);
    } catch (err) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // New: Connect Socket.io for admin replies
  useEffect(() => {
    if (token) {
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
      setSocket(newSocket);

      newSocket.on('new-message', (msg) => {
        if (selectedChat && msg.chatId === selectedChat._id) {
          setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, msg] });
        }
        fetchChats(); // Refresh chats
      });

      newSocket.on('error', (err) => {
        setError(err);
      });

      return () => newSocket.close();
    }
  }, [token, selectedChat]);

  // New: Fetch chats (used in useEffect and socket handler)
  const fetchChats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(res.data);
    } catch (err) {
      setError('Error fetching chats');
    }
  };

  // New: Send admin message
  const sendAdminMessage = (chatId) => {
    if (adminMessage.trim() && socket) {
      socket.emit('send-message', { chatId, text: adminMessage, sender: 'admin' });
      setAdminMessage('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setVolunteers([]);
    setDonations([]);
    setChats([]); // New
    setSelectedChat(null); // New
    setPasswordChangeMessage('');
    if (socket) socket.close(); // New
  };

  const renderFile = (idFile) => {
    if (!idFile) return <span className="no-file">No ID uploaded</span>;
    const ext = idFile.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      return <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${idFile}`} alt="ID" className="id-image" onError={(e) => { e.target.style.display = 'none'; }} />;
    }
    return <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${idFile}`} target="_blank" rel="noopener noreferrer" className="file-link">Download PDF</a>;
  };

  if (!token) {
    return (
      <div className="admin-container">
        <div className="login-card">
          <h2>Admin Login</h2>
          {error && <div className="alert error">{error}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Golden Heart Orphanage Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {error && <div className="alert error">{error}</div>}
      {passwordChangeMessage && <div className="alert success">{passwordChangeMessage}</div>}

      <section className="data-section">
        <div className="section-card">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange} className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                id="currentPassword"
                type="password"
                value={changePasswordForm.currentPassword}
                onChange={(e) => setChangePasswordForm({ ...changePasswordForm, currentPassword: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                type="password"
                value={changePasswordForm.newPassword}
                onChange={(e) => setChangePasswordForm({ ...changePasswordForm, newPassword: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </section>

      <section className="data-section">
        <div className="section-card">
          <h2>SmartHub Chats (Donation Support)</h2>
          {chats.length === 0 ? (
            <p className="no-data">No chats yet.</p>
          ) : (
            <div className="chat-list">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className="chat-item"
                  onClick={() => setSelectedChat(chat)}
                >
                  <strong>{chat.userName}</strong> ({chat.userId}) - {chat.messages.length} messages
                </div>
              ))}
            </div>
          )}
          {selectedChat && (
            <div className="selected-chat">
              <h3>Chat with {selectedChat.userName}</h3>
              <div className="messages">
                {selectedChat.messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender}`}>
                    <strong>{msg.sender === 'admin' ? 'You' : 'User'}:</strong> {msg.text}
                    <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendAdminMessage(selectedChat._id);
                }}
              >
                <input
                  type="text"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="Reply to user..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
      </section>

      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <>
          <section className="data-section">
            <div className="section-card">
              <h2>Volunteer Applications</h2>
              {volunteers.length === 0 ? (
                <p className="no-data">No volunteers yet.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>ID Document</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((volunteer) => (
                        <tr key={volunteer._id}>
                          <td>{volunteer.name}</td>
                          <td>{volunteer.email}</td>
                          <td>{volunteer.phone}</td>
                          <td>{volunteer.role}</td>
                          <td>{renderFile(volunteer.idFile)}</td>
                          <td>{volunteer.message.substring(0, 100)}...</td>
                          <td>{new Date(volunteer.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          <section className="data-section">
            <div className="section-card">
              <h2>Donations</h2>
              {donations.length === 0 ? (
                <p className="no-data">No donations yet.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation._id}>
                          <td>{donation.name}</td>
                          <td>{donation.email}</td>
                          <td>${donation.amount}</td>
                          <td>{donation.paymentMethod}</td>
                          <td>{donation.message ? donation.message.substring(0, 100) + '...' : 'N/A'}</td>
                          <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Admin;