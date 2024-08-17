import React, { useRef } from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef<any>();

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
    const inputs = form.current!.elements;
    for (let i = 0; i < inputs.length - 1; i++) {
      const input = inputs[i];
      if (!input.value) {
        toast.error(`Error: Please fill "${input.name}"`);
        return;
      }
    }
    emailjs.sendForm(serviceID, templateID, form.current!, publicKey).then(
      (result) => {
        toast.success(`Email has been successfully sent.`);
      },
      (error) => {
        toast.error(`Error: ${error.text}`);
      }
    );
    (e.target as any).reset();
  };

  return (
    <div className="mx-4 pt-20 md:pt-0">
      <h1 className="z-30 select-none text-center text-xl uppercase tracking-widest md:mt-20 ">
        CONTACT
      </h1>
      <div className="max-w-screen mt-2 flex w-full flex-col items-center border-t border-gray-600/75 pt-10 pb-5 text-center shadow-inner md:mx-auto md:max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 2,
          }}
          className="mt-18 flex flex-col space-y-10 md:mt-0"
        >
          <div className="space-y-3 md:space-y-3">
            <div className="flex items-center justify-start space-x-5">
              <AiFillPhone className="h-5 w-5 text-white md:h-7  md:w-7" />
              <p className="text-sm opacity-75 md:text-lg">(805) 551-3036</p>
            </div>
            <div className="flex items-center justify-start space-x-5">
              <AiOutlineMail className="h-5 w-5 text-white md:h-7  md:w-7" />
              <p className="text-sm opacity-75 md:text-lg">
                brodyamcfarland@gmail.com
              </p>
            </div>
            <div className="flex items-center justify-start space-x-5">
              <BiMap className="h-5 w-5 text-white md:h-7  md:w-7" />
              <p className="text-sm opacity-75 md:text-lg">
                Thousand Oaks, CA 91360
              </p>
            </div>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="mx-auto flex w-full flex-col space-y-2 pb-20"
          >
            <div className="flex flex-col space-y-2 space-x-0 md:flex-row md:space-y-0 md:space-x-2">
              <input
                name="name"
                placeholder="Name"
                className="contactInput"
                type="text"
              />
              <input
                name="email"
                placeholder="Email"
                className="contactInput"
                type="email"
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
              className="contactInput min-h-[100px] md:min-h-[200px]"
            />
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-[150px] rounded-md border border-white/50 bg-transparent py-1 px-5 text-lg font-semibold opacity-70 duration-500 hover:bg-white/20 hover:opacity-100"
              >
                Send Email
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
