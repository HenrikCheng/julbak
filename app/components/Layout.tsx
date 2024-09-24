import Image from "next/image";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between align-middle">
			<Navbar />
			<main>{children}</main>
			<Image
				src="/gingerbread.svg"
				alt="Gingerbread Man"
				width={150}
				height={150}
				className="self-center justify-center text-center"
			/>
			<Footer />
		</div>
	);
};

export default Layout;
