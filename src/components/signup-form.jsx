"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { signUp } from "../app/api/(auth)/auth";
import { AppContext } from "../context";

export function SignupForm({ className, ...props }) {
	const { setUser } = useContext(AppContext);
	const [message, setMessage] = useState();
	const [signupData, setSignupData] = useState({
		username: "",
		password: "",
		email: "",
	});

	const { username, password, email } = signupData;

	const handleChange = (evt) => {
		setMessage("");
		setSignupData({ ...signupData, [evt.target.name]: evt.target.value });
		console.log(signupData.username);
	};

	const router = useRouter();

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		try {
			const newUser = await signUp(signupData);
			setUser(newUser);
			router.push("/dashboard");
			console.log(newUser);
		} catch (error) {
			setMessage(error.message);
		}
	};

	const isFormInvalid = () => {
		// Check if username, password, and password confirmation are all valid
		return !(username && password && email);
	};

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Signup for BrandBasics</h1>
				<p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
			</div>

			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="username">Name</Label>
					<Input id="username" type="text" placeholder="Enter your name" required value={username} name="username" onChange={handleChange} />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="Enter your email" required value={email} name="email" onChange={handleChange} />
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
					</div>
					<Input id="password" type="password" placeholder="Enter your password" value={password} name="password" required onChange={handleChange} />
				</div>

				<p className="text-[12px] text-center leading-4 text-red-500">{message}</p>

				<Button type="submit" className="w-full" disabled={isFormInvalid()}>
					Create Account
				</Button>
			</div>

			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link href="/" className="underline underline-offset-4">
					Login here
				</Link>
			</div>
		</form>
	);
}
