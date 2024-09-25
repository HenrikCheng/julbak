"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./Button";

const Navbar = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [hidden, setHidden] = useState(false);

	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "authenticated" && session?.user?.name) {
			setName(session?.user?.name);
		} else {
			setName("");
		}
	}, [session, status]);

	if (hidden)
		return (
			<div className="fixed top-0">
				<Button type="button" onClick={() => setHidden(!hidden)}>
					V
				</Button>
			</div>
		);

	return (
		<nav className="max-w-screen-xl w-full fixed top-0 bg-gray-900">
			<div className="max-w-screen-xl w-full flex flex-wrap items-center justify-center mx-auto p-4">
				<form className="flex flex-col sm:flex-row items-end gap-2 w-full sm:w-auto mx-auto">
					<div className="w-full sm:w-auto">
						<label
							htmlFor="Username"
							className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Namn:
						</label>
						<input
							id="Username"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
							required
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={!!session?.user?.name && status === "authenticated"}
						/>
					</div>
					<div className="w-full sm:w-auto">
						<label
							htmlFor="PhoneNumber"
							className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Telefonnummer:
						</label>
						<input
							type="tel"
							id="PhoneNumber"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="w-full sm:w-auto">
						<Button
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								console.log("Pressed");
							}}
						>
							Uppdatera
						</Button>
						<Button type="button" onClick={() => setHidden(!hidden)}>
							Ʌ
						</Button>
					</div>
				</form>
			</div>
		</nav>
	);
};

export default Navbar;
