import Image from "next/image";
import React from "react";
import Footer from "./Footer";
// import Navbar from "./Navbar";
import { SessionProvider } from "next-auth/react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<SessionProvider>
			<div className="flex min-h-screen flex-col items-center justify-between align-middle">
				{/* <Navbar /> */}
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
		</SessionProvider>
	);
};

export default Layout;
