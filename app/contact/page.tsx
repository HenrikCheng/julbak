"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../components/Layout";
import Button from "../components/Button";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		from_name: "",
		to_name: "Henrik Cheng",
		email: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		emailjs
			.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
				formData,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
			)
			.then((result) => {
				console.log("Email successfully sent:", result.text);
			})
			.catch((error) => {
				console.error("Error sending email:", error);
			});
	};

	return (
		<Layout>
			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="text"
						name="from_name"
						id="from_name"
						value={formData.from_name}
						onChange={handleChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="from_name"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Name
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Email
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<textarea
						name="message"
						id="message"
						value={formData.message}
						onChange={handleChange}
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="message"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Message
					</label>
				</div>

				<Button type="submit">Send</Button>
			</form>
		</Layout>
	);
};

export default ContactPage;
