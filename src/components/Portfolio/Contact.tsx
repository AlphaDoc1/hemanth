import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
interface ContactProps {
  data?: {
    email?: string;
    phone?: string;
    location?: string;
  };
}

export const Contact = ({ data }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    const payload = {
      name: formData.name,
      customerEmail: formData.email,
      message: formData.message,
      fromEmail: "hemanthsavanth5555@gmail.com", // default sender
      toEmail: data?.email || "savanthhemanth@gmail.com", // portfolio email (receiver)
    };

    try {
      if (!supabase) throw new Error("Email client fallback");
      const { error } = await supabase.functions.invoke("send-email", {
        body: payload,
      });

      if (error) throw error;

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      // Graceful fallback: open mail client if function is not available
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      );
      window.location.href = `mailto:${payload.toEmail}?subject=${subject}&body=${body}`;
      // Reset form after triggering the default mail client
      setFormData({ name: "", email: "", message: "" });
      setStatus("Email draft opened. Send it from your email app.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="portfolio-section contact-section page-width"
    >
      <p className="eyebrow">04 / Get in Touch</p>
      <div className="contact-layout">
        <div>
          <h2>
            Let's build something <span className="accent">extraordinary.</span>
          </h2>
          <p className="section-intro">
            Whether you have a question, a project proposal, or just want to
            discuss the latest in tech, I'm all ears.
          </p>
          <dl className="contact-details">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${data?.email || "savanthhemanth@gmail.com"}`}>
                  {data?.email || "savanthhemanth@gmail.com"}
                  <ArrowUpRight size={16} />
                </a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${data?.phone || "+917349599759"}`}>
                  {data?.phone || "+91 7349599759"}
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{data?.location || "Bengaluru, Whitefield"}</dd>
            </div>
          </dl>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-heading">
            <span className="eyebrow">Start a conversation</span>
            <ArrowUpRight size={20} />
          </div>
          <div className="form-pair">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me a bit about your project..."
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="action action-primary"
          >
            {sending ? "Sending..." : "Send Message"}
            <ArrowUpRight size={18} />
          </button>
          <p role="status" aria-live="polite" className="form-status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
};
