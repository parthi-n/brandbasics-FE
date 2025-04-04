import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/api/(auth)/verifyToken";

export async function middleware(req: NextRequest) {
	// const cookie = req.cookies.get("token");

	// if (!cookie || !cookie.value) {
	// 	return NextResponse.redirect(new URL("/", req.url));
	// }

	// try {
	// 	const isValid = await verifyToken();
	// 	if (cookie && isValid) {
	// 		return NextResponse.next();
	// 	} else {
	// 		return NextResponse.redirect(new URL("/", req.url));
	// 	}
	// } catch (error) {
	// 	console.log("Invalid or expired token", error);
	// 	return NextResponse.redirect(new URL("/", req.url));
	// }
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
