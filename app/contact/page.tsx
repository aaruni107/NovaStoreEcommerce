"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "@/styles/contact.css";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="contact-page">
        <div className="contact-container">
          {/* LEFT SIDE */}
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p>Have questions? We'd love to hear from you.</p>

            <div className="info-box">
              <h3>Email</h3>
              <p>support@novastore.com</p>
            </div>

            <div className="info-box">
              <h3>Phone</h3>
              <p>+91 6291800976</p>
            </div>

            <div className="info-box">
              <h3>Address</h3>
              <p>Kolkata, West Bengal, India</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-form">
            <form>
              <div className="input-group">
                <input type="text" placeholder="Your Name" />
              </div>

              <div className="input-group">
                <input type="email" placeholder="Your Email" />
              </div>

              <div className="input-group">
                <textarea placeholder="Your Message"></textarea>
              </div>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
