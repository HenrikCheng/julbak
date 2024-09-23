import { Session } from "next-auth";
import Button from "./Button";
import Image from "next/image";
import loginFeature from "@/app/config/featureFlags";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

type JumbotronProps = {
	session?: Session;
	signIn?: any;
	signOut?: any;
};

const LinkComponent = () => (
	<Link
		href="#Ingredients"
		className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
	>
		Starta här
		<svg
			className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 10"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M1 5h12m0 0L9 1m4 4L9 9"
			/>
		</svg>
	</Link>
);

const Jumbotron = ({ session, signIn, signOut }: JumbotronProps) => {
	return (
		<section className="bg-white dark:bg-gray-900 rounded">
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
					Pepparkaksbaket 2024
				</h1>
				<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
					Varje år har vi en fin tradition där vi ordnar pepparkaksbak där
					pengarna vi tjänar in går till att ge barnen extra roliga aktiviteter
					och nya leksaker. Vi behöver hjälp under bakandet men även bidrag i
					form av ingredienser och andra saker. Scrolla ner eller tryck på
					knappen för att se{" "}
					<TypeAnimation
						sequence={[
							"vad som behövs.",
							2000,
							"vad du kan hjälpa.",
							1000,
							"vad du kan hjälpa till med.",
							3000,
						]}
						wrapper="span"
						cursor={true}
						repeat={Infinity}
					/>
				</p>

				<div className="flex items-center justify-center h-full">
					{loginFeature ? (
						session ? (
							<div className="text-center space-y-4">
								<div className="flex items-center justify-center space-x-4">
									{session?.user?.image && (
										<Image
											alt={`${session.user?.name}'s Avatar`}
											src={session?.user?.image}
											width={50}
											height={50}
											className="rounded-full"
											unoptimized // Disable image optimization for external URL
										/>
									)}
									<p className="text-lg font-medium">
										Välkommen, {session.user?.name}
									</p>
								</div>
								<Button size="large" onClick={() => signOut()} color="red">
									Logga ut
								</Button>
							</div>
						) : (
							<div className="text-center space-y-4">
								<Button size="large" onClick={() => signIn()}>
									Logga in
								</Button>
							</div>
						)
					) : (
						<LinkComponent />
					)}
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;
