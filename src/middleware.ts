import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/api/(auth)/verifyToken";

export async function middleware(req: NextRequest) {
	const cookie = req.cookies.get("token") || localStorage.getItem("token");
	console.log("Token cookie:", cookie);

	if (!cookie) {
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
