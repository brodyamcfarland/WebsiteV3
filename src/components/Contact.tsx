import React, { useRef } from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

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
        <div className="mx-4 pb-20">
            <h1 className="z-30 mt-20 text-center text-xl uppercase tracking-widest">
                CONTACT
            </h1>
            <div className="mt-2 flex max-w-3xl flex-col items-center border-t border-gray-600/75 bg-gradient-to-t from-red-500/10 to-transparent p-10 pb-5 text-center shadow-inner md:mx-auto">
                <div className="mt-18 flex flex-col space-y-10 md:mt-0">
                    <div className="space-y-3 md:space-y-3">
                        <div className="flex items-center justify-center space-x-5">
                            <AiFillPhone className="h-7 w-7 animate-pulse text-emerald-600" />
                            <p className="text-md md:text-lg">(805) 551-3036</p>
                        </div>
                        <div className="flex items-center justify-center space-x-5">
                            <AiOutlineMail className="h-7 w-7 animate-pulse text-emerald-600" />
                            <p className="text-md md:text-lg">
                                brodyamcfarland@gmail.com
                            </p>
                        </div>
                        <div className="flex items-center justify-center space-x-5">
                            <BiMap className="h-7 w-7 animate-pulse text-emerald-600" />
                            <p className="text-md md:text-lg">
                                Simi Valley, CA, 93065
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
                            className="contactInput"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-[#0e8882] py-3 px-10 text-lg font-semibold opacity-70 duration-500 hover:opacity-100"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
