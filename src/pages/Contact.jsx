import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(e => ({ ...e, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen px-4 sm:px-12 py-20 flex flex-col justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto w-full bg-black/80 backdrop-blur-xl border border-gray-800 rounded-sm relative overflow-hidden">
            {/* Terminal Header */}
            <div className="h-8 bg-gray-900 border-b border-gray-800 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-gray-500 font-mono text-xs">user@portfolio-terminal:~/contact-form</div>
            </div>

            <div className="p-8 md:p-12 relative z-10">
                <motion.div className="mb-10" variants={itemVariants}>
                     <div className="font-mono text-blue-500 mb-2">$ init_comm_link</div>
                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">PING_ME</h2>
                     <p className="text-gray-400 font-mono text-sm max-w-lg border-l-2 border-gray-700 pl-4">
                        Inititate handshake protocol. Send a transmission for collaboration, inquiries, or just to say hello.
                     </p>
                </motion.div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="name" className="block text-xs font-mono text-gray-500 mb-1 group-focus-within:text-blue-400 transition-colors">NAME_INPUT</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ENTER NAME..."
                                className={`w-full bg-gray-900/50 border-b border-gray-700 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <span className="absolute right-0 top-8 text-red-500 text-xs font-mono">ERR: REQUIRED</span>}
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative group">
                            <label htmlFor="email" className="block text-xs font-mono text-gray-500 mb-1 group-focus-within:text-blue-400 transition-colors">EMAIL_ADDRESS</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ENTER EMAIL..."
                                className={`w-full bg-gray-900/50 border-b border-gray-700 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <span className="absolute right-0 top-8 text-red-500 text-xs font-mono">ERR: INVALID</span>}
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative group">
                        <label htmlFor="message" className="block text-xs font-mono text-gray-500 mb-1 group-focus-within:text-blue-400 transition-colors">MESSAGE_BODY</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="TYPE MESSAGE HERE..."
                            className={`w-full bg-gray-900/50 border-b border-gray-700 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono ${errors.message ? 'border-red-500' : ''}`}
                        />
                        {errors.message && <span className="absolute right-0 top-8 text-red-500 text-xs font-mono">ERR: EMPTY_MSG</span>}
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-6">
                        <button
                            type="submit"
                            disabled={isLoading || isSubmitted}
                            className={`w-full md:w-auto px-10 py-4 bg-white text-black font-bold font-mono hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 ${isSubmitted ? 'bg-green-500 text-white' : ''}`}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">TRANSMITTING...</span>
                            ) : isSubmitted ? (
                                <><span>TRANSMISSION_COMPLETE</span> <FiCheckCircle /></>
                            ) : (
                                <><span>EXECUTE_SEND</span> <FiSend /></>
                            )}
                        </button>
                    </motion.div>
                </form>
            </div>

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
        </div>
    </motion.section>
  );
};

export default Contact;
