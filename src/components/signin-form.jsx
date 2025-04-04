"use client";

import { cn } from "../lib/utils";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AppContext } from "../context";
import Link from "next/link";
import { signIn } from "../app/api/(auth)/auth";

export function SigninForm({ className, ...props }) {
	const { setUser, user } = useContext(AppContext);
	const router = useRouter();

	const [message, setMessage] = useState("");
	const [signinData, setSigninData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = signinData;
	const handleChange = (evt) => {
		setMessage("");
		setSigninData({ ...signinData, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const signedInUser = await signIn(signinData);
			await setUser(signedInUser.user);
		} catch (error) {
			setMessage(error.message);
		}
	};

	const isFormInvalid = () => {
		// Check if username, password, and password confirmation are all valid
		return !(email && password);
	};


	useEffect(() => {
		if (user) {
		  router.push("/dashboard");
		}
	  }, [user, router]);
	

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required value={email} name="email" onChange={handleChange} />
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" value={password} name="password" required onChange={handleChange} />
				</div>
				<p className="text-[12px] text-center leading-4 text-red-500">{message}</p>

				<Button type="submit" className="w-full" disabled={isFormInvalid()}>
					Login
				</Button>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link href="/signup" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</form>
	);
}
