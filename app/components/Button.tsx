import { ReactElement } from "react";

type ButtonProps = {
	children: string | ReactElement<any, any>;
	color: "blue" | "red" | "gray";
	onClick: () => void;
};

const colorClasses = {
	blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
	red: "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
	gray: "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
};

const Button = ({ children, color, onClick }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`text-white ${colorClasses[color]} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
		>
			{children}
		</button>
	);
};

export default Button;
