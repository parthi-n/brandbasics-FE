import { getToken } from "../../lib/getCookie";
const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const AUTH_URL = `${BASE_URL}/users`;

export async function fetchUsers() {
	const token = await getToken();

	try {
		const res = await fetch(`${AUTH_URL}/retrieve-user-data`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: token,
			},
			credentials: "include",
		});

		// Ensure the response is valid JSON.
		let data;
		try {
			data = await res.json();
		} catch (error) {
			throw new Error(`Invalid response from server. Status: ${res.status}`);
		}

		// Check if the response was successful.
		if (!res.ok) {
			throw new Error(data.error || `HTTP error! Status: ${res.status}`);
		}

		// Return the user data if everything is fine.
		return data.user;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw new Error("Failed to fetch user data.");
	}
}
