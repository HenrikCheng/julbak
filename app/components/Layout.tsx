import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between align-middle">
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
