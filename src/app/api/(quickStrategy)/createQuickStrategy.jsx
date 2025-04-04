import { handleResponse } from "../../../lib/handleResponse";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const PROJECTS_URL = `${BASE_URL}/strategy`;

export async function createQuickStrategy(brandDetails) {
	try {
		const res = await fetch(`${PROJECTS_URL}/create-quick-strategy`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(brandDetails),
		});

		return await handleResponse(res);
	} catch (error) {
		console.error("Error Brand Strategy:", error);
		throw new Error("Failed to Brand Strategy.");
	}
}
