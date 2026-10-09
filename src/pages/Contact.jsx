import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";

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
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [e.target.name]: "",
      }));
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
        },
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

  const inputClassName = (hasError) =>
    `theme-focus-border-accent w-full border-b px-0 py-3 font-mono transition-colors focus:outline-none ${
      hasError ? "border-red-500" : ""
    }`;

  return (
    <motion.section
      id="contact"
      className="relative flex min-h-screen flex-col justify-center px-4 py-20 sm:px-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden border backdrop-blur-xl theme-border theme-surface-strong">
        <div className="flex h-8 items-center justify-between border-b px-4 theme-border theme-panel">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--color-danger) 50%, transparent)" }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--color-warning) 50%, transparent)" }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--color-success) 50%, transparent)" }} />
          </div>
          <div className="text-xs font-mono theme-text-muted">
            user@portfolio-terminal:~/contact-form
          </div>
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <motion.div className="mb-10" variants={itemVariants}>
            <div className="mb-2 font-mono theme-accent">$ init_comm_link</div>
            <h2 className="mb-4 text-4xl font-bold theme-text-primary md:text-5xl">
              PING_ME
            </h2>
            <p
              className="max-w-lg border-l-2 pl-4 text-sm font-mono theme-text-secondary"
              style={{ borderColor: "var(--color-border-strong)" }}
            >
              Initiate handshake protocol. Send a transmission for collaboration,
              inquiries, or just to say hello.
            </p>
          </motion.div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants} className="group relative">
                <label
                  htmlFor="name"
                  className="group-focus-within-theme-accent mb-1 block text-xs font-mono theme-text-muted transition-colors"
                >
                  NAME_INPUT
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ENTER NAME..."
                  className={`${inputClassName(errors.name)} theme-placeholder-faint`}
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-panel) 88%, transparent)",
                    borderColor: errors.name ? undefined : "var(--color-border-strong)",
                    color: "var(--color-text-primary)",
                  }}
                />
                {errors.name && (
                  <span className="absolute right-0 top-8 text-xs font-mono text-red-500">
                    ERR: REQUIRED
                  </span>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="group relative">
                <label
                  htmlFor="email"
                  className="group-focus-within-theme-accent mb-1 block text-xs font-mono theme-text-muted transition-colors"
                >
                  EMAIL_ADDRESS
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ENTER EMAIL..."
                  className={`${inputClassName(errors.email)} theme-placeholder-faint`}
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-panel) 88%, transparent)",
                    borderColor: errors.email ? undefined : "var(--color-border-strong)",
                    color: "var(--color-text-primary)",
                  }}
                />
                {errors.email && (
                  <span className="absolute right-0 top-8 text-xs font-mono text-red-500">
                    ERR: INVALID
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="group relative">
              <label
                htmlFor="message"
                className="group-focus-within-theme-accent mb-1 block text-xs font-mono theme-text-muted transition-colors"
              >
                MESSAGE_BODY
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="TYPE MESSAGE HERE..."
                className={`${inputClassName(errors.message)} theme-placeholder-faint resize-none`}
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-panel) 88%, transparent)",
                  borderColor: errors.message ? undefined : "var(--color-border-strong)",
                  color: "var(--color-text-primary)",
                }}
              />
              {errors.message && (
                <span className="absolute right-0 top-8 text-xs font-mono text-red-500">
                  ERR: EMPTY_MSG
                </span>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6">
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="flex w-full items-center justify-center gap-4 px-10 py-4 font-mono font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                style={{
                  backgroundColor: isSubmitted
                    ? "var(--color-success)"
                    : "var(--color-text-primary)",
                  color: isSubmitted ? "#ffffff" : "var(--color-bg)",
                }}
              >
                {isLoading ? (
                  <span className="animate-pulse">TRANSMITTING...</span>
                ) : isSubmitted ? (
                  <>
                    <span>TRANSMISSION_COMPLETE</span> <FiCheckCircle />
                  </>
                ) : (
                  <>
                    <span>EXECUTE_SEND</span> <FiSend />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>

        <div
          className="theme-grid pointer-events-none absolute inset-0 z-0 opacity-10"
          style={{ backgroundSize: "40px 40px" }}
        />
      </div>
    </motion.section>
  );
};

export default Contact;
