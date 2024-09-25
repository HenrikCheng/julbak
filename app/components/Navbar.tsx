"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./Button";

const Navbar = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "authenticated" && session?.user?.name) {
			setName(session?.user?.name);
		} else {
			setName("");
		}
	}, [session, status]);

	return (
		<nav className="max-w-screen-xl w-full fixed top-0 bg-gray-900">
			<div className="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4">
				<form className="flex items-end gap-2 mx-auto flex-wrap">
					<div className="flex-shrink-0">
						<label
							htmlFor="Username"
							className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex-shrink-0"
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
					<div className="flex-shrink-0">
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
					<Button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							console.log("Pressed");
						}}
					>
						Uppdatera
					</Button>
				</form>
			</div>
		</nav>
	);
};

export default Navbar;
