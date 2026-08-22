import { useState, type FormEvent } from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const details = [
  { Icon: AiFillPhone, label: "Phone", value: "(805) 551-3036", href: "tel:+18055513036" },
  {
    Icon: AiOutlineMail,
    label: "Email",
    value: "brodyamcfarland@gmail.com",
    href: "mailto:brodyamcfarland@gmail.com",
  },
  { Icon: BiMap, label: "Location", value: "Thousand Oaks, CA 91360" },
];

const Contact = () => {
  const [sending, setSending] = useState(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
    const formEl = e.currentTarget;
    const fields = Array.from(formEl.elements).filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement =>
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
    );
    const empty = fields.find((f) => !f.value.trim());
    if (empty) {
      toast.error(`Please fill in "${empty.name}"`);
      return;
    }
    setSending(true);
    emailjs
      .sendForm(serviceID, templateID, formEl, { publicKey })
      .then(
        () => {
          toast.success(`Email has been successfully sent.`);
        },
        (error) => {
          toast.error(`Error: ${error.text}`);
          console.log(error, error.text);
        }
      )
      .finally(() => setSending(false));
    formEl.reset();
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-24 xl:px-6">
      <div className="mb-10 md:mb-14">
        <p className="eyebrow">02 — Get in touch</p>
        <h2 className="section-title mt-3">Contact</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="glass grid grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        {/* Info column */}
        <div className="relative flex flex-col justify-between gap-8 border-b border-white/5 bg-linear-to-br from-accent/10 via-transparent to-transparent p-6 md:border-b-0 md:border-r md:p-8">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Let&apos;s build something.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Open to full-time roles and freelance projects. Drop a message
              and I&apos;ll get back to you within a day.
            </p>
          </div>
          <ul className="space-y-4">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/4 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="block truncate text-sm text-gray-200 transition-colors hover:text-accent"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="truncate text-sm text-gray-200">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form column */}
        <form
          onSubmit={sendEmail}
          className="flex flex-col gap-3 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              name="name"
              placeholder="Name"
              className="contactInput"
              type="text"
              autoComplete="name"
            />
            <input
              name="email"
              placeholder="Email"
              className="contactInput"
              type="email"
              autoComplete="email"
            />
          </div>
          <input
            name="subject"
            placeholder="Subject"
            className="contactInput"
            type="text"
          />
          <textarea
            name="message"
            placeholder="Message"
            className="contactInput min-h-[140px] resize-y md:min-h-[180px]"
          />
          <div className="mt-1 flex items-center justify-between gap-4">
            <p className="hidden text-xs text-gray-600 sm:block">
              All fields required.
            </p>
            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {sending ? "Sending…" : "Send message"}
              <BsSend size={14} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
