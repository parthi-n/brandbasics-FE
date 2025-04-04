"use client";
import { useActionState, useOptimistic } from "react";
import { loginUser } from "../app/actions/auth";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { FormSubmit } from "./form-submit";
import { Button } from "./ui/button";

const initialState = {
	message: "",
};
export function SigninForm({ className, ...props }) {

	const [state, formAction, pending] = useActionState(loginUser, initialState);

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required name="email" />
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" name="password" required />
				</div>
				<p className="text-[12px] text-center leading-4 text-red-500">{state?.message}</p>

				<FormSubmit />
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
