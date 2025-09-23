function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Email: info@goldenheart.org</p>
      <p>Phone: +123-456-7890</p>
      <p>Address: 123 Hope Street, City, Country</p>
      <form>
        <label>Name: <input type="text" /></label>
        <label>Email: <input type="email" /></label>
        <label>Message: <textarea></textarea></label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default Contact;