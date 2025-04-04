import { getToken } from "../../../lib/getCookie";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const AUTH_URL = `${BASE_URL}/auth`;

// for token verification, used in middleware for route protection
export const verifyToken = async () => {
	const token = await getToken();
	try {
		const res = await fetch(`${AUTH_URL}/verify-token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: token,
			},
			credentials: "include",
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error("Failed to verify token");
		}

		return data.isValid;
	} catch (error) {
		console.log("Error during token verification:", error);
		throw new Error(error.message);
	}
};


