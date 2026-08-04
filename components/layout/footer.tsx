"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import "@/styles/footer.css";
export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row gy-5">
          {/* Brand */}

          <div className="col-lg-4">
            <Link href="/" className="footer-logo">
              Nova<span>Store</span>
            </Link>

            <p className="footer-text mt-4">
              Discover premium gadgets, electronics and accessories designed to
              upgrade your lifestyle.
            </p>

            <div className="footer-social">
              <a href="#">
                <FaFacebookF size={18} />
              </a>

              <a href="#">
                <FaInstagram size={18} />
              </a>

              <a href="#">
                <FaTwitter size={18} />
              </a>

              <a href="#">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}

          <div className="col-6 col-lg-2">
            <h5>Shop</h5>

            <ul>
              <li>
                <Link href="#">Beauty</Link>
              </li>
              <li>
                <Link href="#">Fragrance</Link>
              </li>
              <li>
                <Link href="#">Furniture</Link>
              </li>
              <li>
                <Link href="#">Grocery</Link>
              </li>
            </ul>
          </div>

          {/* Company */}

          <div className="col-6 col-lg-2">
            <h5>Company</h5>

            <ul>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}

          <div className="col-lg-4">
            <h5>Stay Updated</h5>

            <p className="footer-text">
              Subscribe to receive offers, launches and exclusive discounts.
            </p>

            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />

              <button>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NovaStore. All Rights Reserved.</p>

          <div>
            <Link href="#">Privacy</Link>

            <Link href="#">Terms</Link>

            <Link href="#">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
