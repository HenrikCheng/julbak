import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID || "",
			clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
			issuer: process.env.AUTH0_ISSUER,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET || "",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
