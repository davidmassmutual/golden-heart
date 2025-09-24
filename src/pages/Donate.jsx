import React from "react";
import DonationForm from "../components/DonationForm";
import "../styles/Donate.css";
import { FaPaypal, FaApplePay, FaGooglePay, FaCreditCard, FaUniversity, FaBitcoin, FaEthereum, FaGift } from "react-icons/fa";

function Donate() {
  return (
    <div className="donate-page">
      {/* Hero Section */}
      <section className="donate-hero">
        <div className="overlay">
          <h1>💖 Support Golden Heart Orphanage</h1>
          <p>
            Every contribution helps us provide shelter, education, and healthcare
            to children in need. Thank you for your generosity!
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="donation-form-section container">
        <h2>Make a Direct Donation</h2>
        <DonationForm />
      </section>

      {/* Donation Methods */}
      <section className="donation-methods container">
        <h2>Ways to Donate</h2>

        {/* Digital Payments */}
        <div className="donation-category">
          <h3>💳 Digital & Online Payments</h3>
          <ul>
            <li><FaPaypal className="icon" /> PayPal – Safe and easy for one-time or recurring donations.</li>
            <li><FaApplePay className="icon" /> Apple Pay / <FaGooglePay className="icon" /> Google Pay – Quick tap-to-donate.</li>
            <li><FaCreditCard className="icon" /> Credit or Debit Card – Visa, MasterCard, AmEx supported.</li>
            <li>Stripe – Modern, international payment processing.</li>
            <li>Cash App – Send instantly: <strong>$CashtagHere</strong></li>
          </ul>
        </div>

        {/* Bank Transfers */}
        <div className="donation-category">
          <h3>🏦 Bank & Wire Transfers</h3>
          <ul>
            <li><FaUniversity className="icon" /> Direct Bank Transfer (ACH/Wire) – IBAN & SWIFT available.</li>
            <li>Wise / Revolut – Low-fee international transfers (UK & Europe).</li>
          </ul>
        </div>

        {/* Crypto */}
        <div className="donation-category">
          <h3>🪙 Cryptocurrency Donations</h3>
          <ul>
            <li><FaBitcoin className="icon" /> Bitcoin (BTC)</li>
            <li><FaEthereum className="icon" /> Ethereum (ETH), USDT, and more</li>
          </ul>
        </div>

        {/* Alternative Giving */}
        <div className="donation-category">
          <h3>🎁 Alternative Giving Options</h3>
          <ul>
            <li><FaGift className="icon" /> Gift Cards (Amazon, Walmart, Visa gift cards)</li>
            <li>Zelle – Send directly via bank transfer.</li>
            <li>Venmo – Easy local donations (if available in your country).</li>
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="donation-cta">
        <h2>🌍 Every Gift Counts</h2>
        <p>
          Your kindness helps us build a brighter future for orphaned children.
          Whether big or small, every gift changes a life.
        </p>
        <a href="/volunteer" className="cta-btn">Become a Volunteer</a>
      </section>
    </div>
  );
}

export default Donate;
