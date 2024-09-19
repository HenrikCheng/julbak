/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com", // Google
			"platform-lookaside.fbsbx.com", // Facebook
			"is5-ssl.mzstatic.com", // Apple
			"apis.live.net", // Microsoft
			"avatars.githubusercontent.com", // GitHub
			"pbs.twimg.com", // Twitter
			"s.gravatar.com",
		],
	},
};

export default nextConfig;
