import React, { useState } from "react";
import { Github, Linkedin, Mail, Check, Copy, Send, AlertCircle } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Validation
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email formatting";
    }
    if (!message.trim()) {
      tempErrors.message = "Message cannot be empty";
    } else if (message.trim().length < 10) {
      tempErrors.message = "Please write a slightly more detailed note";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    // Simulate inquiry transmit delay
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      
      setTimeout(() => setSendSuccess(false), 5000);
    }, 1500);
  };

  return (
    <footer
      id="contact"
      className="py-20 bg-[#0e0e0e] text-[#f5f5f0] border-t border-[#2a2a28] px-6 sm:px-12 lg:px-20 relative select-none"
    >
      {/* Morphing Blob Styling keyframes */}
      <style>{`
        @keyframes morphBlob {
          0%, 100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          }
          33% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
          }
          66% {
            border-radius: 50% 50% 30% 70% / 40% 60% 30% 70%;
          }
        }
        .morph-blob {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          animation: morphBlob 8s ease-in-out infinite;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
          display: inline-block;
          flex-shrink: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Socials, Copyable Email & Blob */}
        <div className="lg:col-span-6 space-y-10 text-left">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888880] leading-none">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-display font-light text-[#f5f5f0] leading-[1.1] tracking-tight">
              Drop a message or<br />
              check out my socials.
            </h2>
          </div>

          {/* Copyable Email CTA */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={copyEmail}
              className="text-lg sm:text-2xl font-display font-semibold hover:text-[#6366f1] transition-colors border-b border-[#f5f5f0]/20 pb-1 cursor-pointer text-left break-all select-all outline-none"
            >
              {CONTACT_INFO.email}
            </button>
            <button
              onClick={copyEmail}
              className="p-2 border border-[#2a2a28] bg-[#161616] hover:bg-[#20201e] text-[#888880] hover:text-[#f5f5f0] rounded-xl transition-all cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Minimal Social Links */}
          <ul className="space-y-4 pt-4 max-w-sm" role="list">
            <li>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[#2a2a28] hover:text-[#6366f1] text-sm font-semibold transition-all group"
              >
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </div>
                <span className="text-xs text-[#888880] group-hover:translate-x-1 transition-transform">
                  @yash200731-design &rarr;
                </span>
              </a>
            </li>
            <li>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 border-b border-[#2a2a28] hover:text-[#6366f1] text-sm font-semibold transition-all group"
              >
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </div>
                <span className="text-xs text-[#888880] group-hover:translate-x-1 transition-transform">
                  Yash Trivedi &rarr;
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Inquiry Message Form */}
        <div className="lg:col-span-6 bg-[#161616] rounded-3xl p-8 border border-[#2a2a28] shadow-2xl w-full text-left">
          {sendSuccess ? (
            <div className="p-8 text-center bg-[#0e0e0e] border border-emerald-950/40 rounded-2xl shadow-inner space-y-4 animate-scale-up">
              <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base text-white">
                  Message Transmitted
                </h4>
                <p className="text-xs text-[#888880] leading-relaxed">
                  Thank you! Your message was received securely. Yash Trivedi will review it and follow up as soon as possible.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold font-mono tracking-wider text-[#888880] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2a2a28] bg-[#0e0e0e] text-[#f5f5f0] placeholder:text-[#888880]/50 focus:outline-none focus:ring-1 focus:ring-[#6366f1] transition-all text-xs font-semibold"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold font-mono tracking-wider text-[#888880] uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2a2a28] bg-[#0e0e0e] text-[#f5f5f0] placeholder:text-[#888880]/50 focus:outline-none focus:ring-1 focus:ring-[#6366f1] transition-all text-xs font-semibold"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono tracking-wider text-[#888880] uppercase mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2a2a28] bg-[#0e0e0e] text-[#f5f5f0] placeholder:text-[#888880]/50 focus:outline-none focus:ring-1 focus:ring-[#6366f1] transition-all text-xs font-semibold"
                />
                {errors.message && (
                  <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 px-6 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Footer copyright, tag line & Morphing Blob */}
      <div className="max-w-7xl mx-auto w-full pt-16 border-t border-[#2a2a28] mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="morph-blob" />
          <p className="text-[11px] font-mono text-[#888880] tracking-wide uppercase">
            &copy; {new Date().getFullYear()} Yash Trivedi &mdash; built with obsession.
          </p>
        </div>
      </div>
    </footer>
  );
}
