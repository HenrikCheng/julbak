import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 max-w-screen-xl w-full">
			<div className="w-full mx-auto max-w-screen-xl py-4 px-8 gap-2 flex-col-reverse md:flex-row flex items-center justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-bold">
					© 2024 Henrik Cheng. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li>
						<Link href="/" className="hover:underline me-4 md:me-6">
							Hem
						</Link>
					</li>
					<li>
						<Link
							href="https://henrikcheng.github.io/react-ts/"
							className="hover:underline me-4 md:me-6"
						>
							Om
						</Link>
					</li>
					<li>
						<Link
							href="https://www.linkedin.com/in/henrik-cheng/"
							className="hover:underline me-4 md:me-6"
						>
							LinkedIn
						</Link>
					</li>
					<li>
						<Link href="/contact" className="hover:underline">
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
