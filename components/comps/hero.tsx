"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import "@/styles/hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          {/* Left */}
          <div className="col-lg-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-badge"
            >
              New Collection 2026
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="hero-title"
            >
              Discover Products That
              <span> Inspire Your Lifestyle.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hero-text"
            >
              Shop premium electronics, accessories and modern gadgets designed
              for everyday life.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <button className="btn-shop">Shop Now</button>

              <button className="btn-outline-custom">Explore</button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <h3>25K+</h3>
                <span>Customers</span>
              </div>

              <div>
                <h3>1200+</h3>
                <span>Products</span>
              </div>

              <div>
                <h3>4.9★</h3>
                <span>Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right */}

          <div className="col-lg-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="hero-image-wrapper"
            >
              <div className="hero-circle"></div>

              <Image
                src="/heroImage/HeadPhone.webp"
                alt="Product"
                width={550}
                height={550}
                priority
                className="hero-image"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
