import { ReactElement } from "react";

type ButtonProps = {
	children: string | ReactElement<any, any>;
	color?: "blue" | "red" | "transparent";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
	className?: string;
};

const colorClasses = {
	blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
	red: "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
	transparent:
		"bg-transparent hover:bg-gray-700 focus:ring-gray-300 dark:transparent dark:hover:bg-gray-600 dark:focus:ring-gray-800",
};

const Button = ({
	children,
	color = "blue",
	onClick,
	type,
	disabled,
	className,
}: ButtonProps) => {
	return (
		<button
			type={type || "button"}
			onClick={onClick}
			className={
				className ||
				`text-white ${
					colorClasses[color]
				} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
					disabled ? "disabled:cursor-not-allowed disabled:opacity-50" : ""
				}`
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
