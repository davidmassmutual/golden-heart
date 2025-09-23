import DonationForm from '../components/DonationForm';
import '../styles/Donate.css';

function Donate() {
  return (
    <div className="donate">
      <h1>Support Golden Heart Orphanage</h1>
      <p>Your donation makes a difference!</p>
      <DonationForm />
    </div>
  );
}
export default Donate;