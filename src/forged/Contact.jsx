import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading, ExternalLink } from "./ui";
import { profile } from "./content";
export default function Contact() {
  const formRef = useRef();
  const submitting = useRef(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    setStatus("");
    const data = new FormData(formRef.current);
    const next = {};
    if (!data.get("name").trim()) next.name = "Name is required";
    if (!data.get("email").trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email")))
      next.email = "Please enter a valid email";
    if (!data.get("message").trim()) next.message = "Message is required";
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current.elements[Object.keys(next)[0]].focus();
      return;
    }
    if (
      !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ) {
      setStatus(
        "The contact form is unavailable. Please use the contact links.",
      );
      return;
    }
    submitting.current = true;
    setBusy(true);
    setStatus("");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      setStatus("TRANSMISSION_COMPLETE");
      formRef.current.reset();
    } catch {
      setStatus("Failed to send message. Please try again later.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="page contact-page">
      <SectionHeading
        number="05"
        label="CONTACT / INIT_COMM_LINK"
        title="PING_ME"
      />
      <div className="contact-layout">
        <div>
          <p className="contact-intro">
            Initiate handshake protocol. Send a transmission for collaboration,
            inquiries, or just to say hello.
          </p>
          <div className="contact-links">
            <ExternalLink href={profile.phone}>
              REQUEST_A_CALLBACK <ArrowUpRight size={18} />
            </ExternalLink>
            {profile.socials.map((s) => (
              <ExternalLink href={s.url} key={s.label}>
                {s.label}
                <ArrowUpRight size={18} />
              </ExternalLink>
            ))}
          </div>
          <span className="contact-asterisk" aria-hidden="true">
            ✳
          </span>
        </div>
        <form
          className="contact-form"
          ref={formRef}
          onSubmit={submit}
          noValidate
          aria-busy={busy}
        >
          <h2>Send a message</h2>
          {[
            ["name", "Name", "text", "ENTER NAME..."],
            ["email", "Email", "email", "ENTER EMAIL..."],
            ["message", "Message", "textarea", "TYPE MESSAGE HERE..."],
          ].map(([name, label, type, placeholder]) => (
            <div className="form-field" key={name}>
              <label htmlFor={name}>{label}</label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  rows={7}
                  placeholder={placeholder}
                  required
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? name + "-error" : undefined}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  autoComplete={name}
                  placeholder={placeholder}
                  required
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? name + "-error" : undefined}
                />
              )}
              {errors[name] && (
                <p className="field-error" id={name + "-error"}>
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
          <button className="button primary" disabled={busy} type="submit">
            {busy ? "Sending…" : "Send Message"} <ArrowUpRight size={18} />
          </button>
          <p
            role="status"
            className={
              "form-status " +
              (busy
                ? "sending"
                : status === "TRANSMISSION_COMPLETE"
                  ? "success"
                  : status
                    ? "failure"
                    : "")
            }
          >
            {busy ? "Sending your message…" : status}
          </p>
        </form>
      </div>
    </section>
  );
}
