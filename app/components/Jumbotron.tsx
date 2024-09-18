import { Session } from "next-auth";
import Button from "./Button";
import Image from "next/image";

type JumbotronProps = {
	session?: Session;
	signIn: any;
	signOut: any;
};

const Jumbotron = ({ session, signIn, signOut }: JumbotronProps) => {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
					Pepparkaksbak 2024
				</h1>
				<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
					Varje år har vi en fin tradition där vi ordnar pepparkaksbak där
					pengarna vi tjänar in går till att ge barnen extra roliga aktiviteter
					och nya leksaker. Vi behöver hjälp under bakandet men även bidrag i
					form av ingredienser och andra saker. Scrolla ner eller tryck på
					knappen för att se vad som behövs!
				</p>

				<div className="flex items-center justify-center h-full">
					{session ? (
						<div className="text-center space-y-4">
							<div className="flex items-center justify-center space-x-4">
								{session?.user?.image && (
									<Image
										alt={`${session.user?.name}'s Avatar`}
										src={session?.user?.image}
										width={50}
										height={50}
										className="rounded-full"
									/>
								)}
								<p className="text-lg font-medium">
									Välkommen, {session.user?.name}
								</p>
							</div>
							<Button onClick={() => signOut()} color="red">
								Logga ut
							</Button>
						</div>
					) : (
						<div className="text-center space-y-4">
							<p className="text-lg font-medium">You are not logged in.</p>
							<Button onClick={() => signIn()}>Logga in</Button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;
