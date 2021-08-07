import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted mt-5">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom social-media">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          {/* links coming soon */}
          <span className="me-4 text-reset media-icons">
            <FaFacebook />
          </span>

          <span className="me-4 text-reset media-icons">
            <FaTwitter />
          </span>

          <span className="me-4 text-reset media-icons">
            <FaInstagram />
          </span>
        </div>
      </section>

      <div className="text-center p-4">© 2021 Copyright: Little Pony</div>
    </footer>
  );
}

export default Footer;
