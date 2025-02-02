import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-inherit p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-white mb-6">Contact Me</h2>
      <div className="h-[5px] w-[200px] bg-green-600 mb-6"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 p-8 rounded-xl shadow-lg"
      >
        {/* Name Input */}
        <div className="mb-4">
          <label className="text-white text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-white text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label className="text-white text-sm font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Enter your message"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition duration-300"
        >
          Send Message
        </button>

        {isSubmitted && (
          <p className="text-green-400 text-center mt-4">Message Sent Successfully!</p>
        )}
      </form>
    </motion.div>
  );
};

export default Contact;
