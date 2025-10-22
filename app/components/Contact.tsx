"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demo message sent!");
    setState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-10 text-gradient">
          Get In Touch
        </h2>
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <input
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            required
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg"
            placeholder="Your Name"
          />
          <input
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            required
            type="email"
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg"
            placeholder="Your Email"
          />
          <textarea
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            required
            rows={6}
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg"
            placeholder="Your Message"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-gradient-to-r from-neonBlue to-neonPink text-black font-bold"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
