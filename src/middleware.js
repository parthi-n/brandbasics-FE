import { NextResponse } from "next/server";
import { verifyToken } from "./app/api/(auth)/verifyToken";

export async function middleware(req) {
	const cookie = req.cookies.get("token");
	console.log("Token cookie:", cookie);

	if (!cookie || !cookie.value) {
		console.log("no cookie");
		return NextResponse.redirect(new URL("/", req.url));
	}

	try {
		const isValid = await verifyToken();
		console.log("isValid", isValid);
		if (cookie && isValid) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/", req.url));
		}
	} catch (error) {
		console.log("Invalid or expired token", error);
		return NextResponse.redirect(new URL("/", req.url));
	}
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
