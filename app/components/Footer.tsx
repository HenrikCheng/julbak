import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 max-w-screen-xl w-full">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2024{" "}
					<Link
						href="https://henrikcheng.github.io/react-ts/"
						className="hover:underline"
					>
						Henrik Cheng
					</Link>
					. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li>
						<Link
							href="https://henrikcheng.github.io/react-ts/"
							className="hover:underline me-4 md:me-6"
						>
							About
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
						<a href="mailto:henrikcheng@live.se" className="hover:underline">
							Contact
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
