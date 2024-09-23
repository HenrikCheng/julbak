"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav className="max-w-screen-xl w-full">
			<div className="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4">
				<div>
					<span className="inline-block text-2xl brightness-75 -rotate-90">
						🍪
					</span>
					<span className="inline-block text-2xl brightness-90">🍪</span>
					<span className="inline-block text-2xl rotate-45">🍪</span>
				</div>
				<button
					data-collapse-toggle="navbar-default"
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="navbar-default"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
						<li>
							<Link
								href="/"
								className={`hover:underline me-4 md:me-6 ${
									pathname === "/" && "text-blue-500"
								}`}
							>
								Hem
							</Link>
						</li>
						<li>
							<Link
								href="/contact"
								className={`hover:underline ${
									pathname === "/contact" && "text-blue-500"
								}`}
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
