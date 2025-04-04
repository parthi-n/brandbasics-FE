"use client";

import { useActionState } from "react";
import { createUser } from "../app/actions/auth";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { Button } from "./ui/button";


const initialState = {
	message: "",
};

export function SignupForm({ className, ...props }) {
	const [state, formAction, pending] = useActionState(createUser, initialState);

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Signup for BrandBasics</h1>
				<p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
			</div>

			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="username">Name</Label>
					<Input id="username" type="text" placeholder="Enter your name" required name="username" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="Enter your email" required name="email" />
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
					</div>
					<Input id="password" type="password" placeholder="Enter your password" name="password" required />
				</div>

				<p className="text-[12px] text-center leading-4 text-red-500">{state?.message}</p>

				<Button type="submit" className="w-full" disabled={pending}>
					{pending ? "Processing..." : "Create Account"}
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
