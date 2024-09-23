"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const [formData, setFormData] = useState({
		from_name: "", // Change this to match your template
		to_name: "Recipient Name", // Hard-code or add another input for this
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
				"service_ikndhbs", // Your service ID
				"template_dtvphms", // Your template ID
				formData,
				"-YN_Of0pXeqC-7XTQ", // Your public key
			)
			.then((result) => {
				console.log("Email successfully sent:", result.text);
				// Reset form or show success message
			})
			.catch((error) => {
				console.error("Error sending email:", error);
			});
	};

	return (
		<form onSubmit={handleSubmit} className="text-red-500">
			<div>
				<label htmlFor="from_name">Name</label>
				<input
					type="text"
					id="from_name"
					name="from_name"
					value={formData.from_name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="message">Message</label>
				<textarea
					id="message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit">Send</button>
		</form>
	);
};

export default Contact;
