import React, { useState } from 'react';
import '../styles/ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone:'',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
      };
    
      return (
        <>
        <div className="banner text-left">
          <div className="banner-text">
            <h1>CONTACT</h1>
            <h2>ACECLEAN XPERTS</h2>
            <p>We're Here to Help with Any Inquiries, Connect With Us Now</p>
          </div>
        </div>
        <div className="contact-us-section container">
          <h3 className="section-heading">Let’s Get In Touch</h3>
          <div className="form-map-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                ></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
            <div className="contact-info">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5949217166667!2d144.95605441531715!3d-37.817209979751846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e33!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1616029192573!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="contact-info-section">
                <div className="contact-info-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                  <p>10th Floor, Bloor St Toronto, L6T 324 Ontario, Canada</p>
                </div>
                <div className="contact-info-item">
                  <FontAwesomeIcon icon={faPhoneAlt} className="contact-icon" />
                  <p><a href="tel:+15415747550">+1 (541) 574 – 7550</a></p>
                </div>
                <div className="contact-info-item">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                  <p><a href="mailto:info@acecleanxperts.com">info@acecleanxperts.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      );
}

