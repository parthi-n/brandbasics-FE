import { handleResponse } from "../../../lib/handleResponse";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const PROJECTS_URL = `${BASE_URL}/projects`;

export async function fetchProjectList(userId) {
	try {
		const res = await fetch(`${PROJECTS_URL}/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		return await handleResponse(res);
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw new Error("Failed to fetch user data.");
	}
}

