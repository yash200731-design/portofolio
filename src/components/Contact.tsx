import React, { useState } from "react";
import { 
  Contact, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  MessageSquare,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function ContactSection() {
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
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
      
      // Clear success notification after delay
      setTimeout(() => setSendSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Contact className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold font-mono tracking-wider uppercase">Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
            Get In Touch
          </h2>
          <div className="h-1 w-16 bg-indigo-500 mx-auto rounded" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Card directory indicators */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
              Looking to collaborate on AI or Cloud systems?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              If you have any questions, want to talk about serverless AWS architectures, or have an internship opening, feel free to contact me. You can copy my credentials to your clipboard in one tap or message me directly!
            </p>

            <div className="space-y-4 pt-2">
              {/* Email Address details */}
              <div className="group relative flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-150 dark:border-slate-800/80 hover:border-indigo-500/20 dark:hover:border-indigo-400/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-900 text-indigo-505 rounded-xl shadow-sm border border-slate-205/30 dark:border-slate-800/50">
                    <Mail className="w-5 h-5 text-indigo-550 dark:text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-650 transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.email, "email")}
                  className="p-2 border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-400 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedType === "email" ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Contacts details */}
              <div className="group relative flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-150 dark:border-slate-800/80 hover:border-indigo-500/20 dark:hover:border-indigo-400/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-900 text-emerald-505 rounded-xl shadow-sm border border-slate-205/30 dark:border-slate-800/50">
                    <Phone className="w-5 h-5 text-emerald-550 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-550 transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.phone, "phone")}
                  className="p-2 border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-400 transition-colors cursor-pointer"
                  title="Copy number to clipboard"
                >
                  {copiedType === "phone" ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Geographic Placement Location */}
              <div className="flex items-center space-x-4 p-4 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-slate-150/45 dark:border-slate-900/40">
                <div className="p-3 bg-white dark:bg-slate-900 text-slate-400 rounded-xl shadow-sm border border-slate-205/30 dark:border-slate-800/50">
                  <MapPin className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    New Delhi, India
                  </span>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="flex justify-between p-4 bg-indigo-50/30 dark:bg-slate-900/50 rounded-2xl border border-indigo-100/10 dark:border-slate-800/50 items-center">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Direct Handles
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href={CONTACT_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/45 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 rounded-xl shadow-sm transition-colors"
                  >
                    <Github className="w-4 h-4 mr-1 inline-block" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </a>
                  <a
                    href={CONTACT_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/45 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 rounded-xl shadow-sm transition-colors"
                  >
                    <Linkedin className="w-4 h-4 mr-1 inline-block" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 border border-slate-200/70 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2.5 mb-6">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
              </span>
              <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                Send a Message
              </h4>
            </div>

            {sendSuccess ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/40 rounded-2xl shadow-inner space-y-4 animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 mx-auto">
                  <Check className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-base text-slate-950 dark:text-white">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Thank you! Your message was received securely. Yash Trivedi will review it and follow up within 24 business hours as per yash2007.31@gmail.com standards.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                
                {/* Visual grid fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Your Name */}
                  <div>
                    <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/30 transition-all text-sm font-medium"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/30 transition-all text-sm font-medium"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Yash! I am interested in talking about your green carbon calculation codes, can we setup an interview next week?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/30 transition-all text-sm font-medium"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/15 disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
