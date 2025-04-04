"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const AUTH_URL = `${BASE_URL}/auth`;

export async function loginUser(prevState, formdata) {
	const email = formdata.get("email");
	const password = formdata.get("password");
	console.log("Logging in with", { email, password });

	const loginData = { email: email, password: password };

	try {
		const res = await fetch(`${AUTH_URL}/sign-in`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(loginData),
			credentials: "include",
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.log("Login failed:", errorData);
			return { message: `Login failed: ${errorData.error}` || res.statusText || "An unknown error occurred." };
		}

		const data = await res.json();
		const token = data.token;
		console.log(data);
		const cookieStore = await cookies();

		cookieStore.set("token", token, {
			httpOnly: false, // Ensure the cookie is not accessible via JavaScript
			secure: process.env.NODE_ENV === "production", // Only use Secure cookies in production
			maxAge: 60 * 60, // 1 hour expiration
			path: "/", // Available on all routes
			sameSite: "Strict",
		});
	} catch (error) {
		console.error("An error occurred while logging in:", error);
		return { message: "An error occurred. Please try again later." };
	}
	redirect("/dashboard");
}
