import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
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
    name: '',
    email: '',
    message: ''
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
      fromEmail: 'hemanthsavanth5555@gmail.com', // default sender
      toEmail: data?.email || 'savanthhemanth@gmail.com', // portfolio email (receiver)
    };

    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: payload,
      });

      if (error) throw error;

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      // Graceful fallback: open mail client if function is not available
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${payload.toEmail}?subject=${subject}&body=${body}`;
      // Reset form after triggering the default mail client
      setFormData({ name: '', email: '', message: '' });
      setStatus('Sent via email client.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="pt-16 md:pt-20 pb-24 md:pb-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-bl from-primary/20 to-transparent blur-[100px] md:blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-tr from-secondary/20 to-transparent blur-[100px] md:blur-[140px] rounded-full -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-start">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12 md:mb-16">
              <span className="inline-block text-gradient-brand font-mono tracking-widest text-xs md:text-sm uppercase mb-4 md:mb-6 font-bold">Get in Touch</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8">Let's build something <br className="hidden sm:block" /> <span className="text-gradient-brand">extraordinary.</span></h2>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Whether you have a question, a project proposal, or just want to discuss the latest in tech, I'm all ears.
              </p>
            </div>

            <div className="space-y-4 md:space-y-5">
              {/* Email Item */}
              <div className="group flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-primary/50 hover:from-primary/10 hover:to-transparent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/20">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 flex-shrink-0">
                  <Mail size={20} className="md:hidden" />
                  <Mail size={22} className="hidden md:block" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/80 uppercase tracking-widest mb-1 md:mb-2 font-semibold">Email</p>
                  <a href={`mailto:${data?.email || "savanthhemanth@gmail.com"}`} className="text-base md:text-lg font-semibold hover:text-gradient-brand transition-all break-all">
                    {data?.email || "savanthhemanth@gmail.com"}
                  </a>
                </div>
              </div>

              {/* Phone Item */}
              <div className="group flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-secondary/50 hover:from-secondary/10 hover:to-transparent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-secondary/20">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-secondary/30 transition-all duration-300 flex-shrink-0">
                  <Phone size={20} className="md:hidden" />
                  <Phone size={22} className="hidden md:block" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/80 uppercase tracking-widest mb-1 md:mb-2 font-semibold">Phone</p>
                  <a href={`tel:${data?.phone || "+917349599759"}`} className="text-base md:text-lg font-semibold hover:text-gradient-brand transition-all">
                    {data?.phone || "+91 7349599759"}
                  </a>
                </div>
              </div>

              {/* Location Item */}
              <div className="group flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-accent/50 hover:from-accent/10 hover:to-transparent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-accent/20">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-300 flex-shrink-0">
                  <MapPin size={20} className="md:hidden" />
                  <MapPin size={22} className="hidden md:block" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/80 uppercase tracking-widest mb-1 md:mb-2 font-semibold">Location</p>
                  <p className="text-base md:text-lg font-semibold">
                    {data?.location || "Bengaluru, Whitefield"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Modern Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="tech-card bg-gradient-to-br from-[#0a0e1a]/90 to-[#0a0e1a]/70 backdrop-blur-2xl p-6 md:p-10 lg:p-12 border-white/20 shadow-2xl shadow-primary/10">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground/90 ml-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/30 border border-white/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/30 text-sm md:text-base shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground/90 ml-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/30 border border-white/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/30 text-sm md:text-base shadow-inner"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground/90 ml-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/30 border border-white/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/30 resize-none text-sm md:text-base shadow-inner"
                    placeholder="Tell me a bit about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full btn-primary-glow flex items-center justify-center gap-3 py-4 md:py-5 text-base md:text-lg mt-4 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Send Message <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-green-400 mt-4 bg-green-500/10 py-2 rounded-lg border border-green-500/20"
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};