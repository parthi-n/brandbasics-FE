import { handleResponse } from "../../../lib/handleResponse";
import { getToken } from "../../../lib/getCookie";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const PROJECTS_URL = `${BASE_URL}/projects`;

export async function fetchProject(projectId) {
	const token = await getToken();
	try {
		const res = await fetch(`${PROJECTS_URL}/${projectId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: token,
			},
			credentials: "include",
		});

		return await handleResponse(res);
	} catch (error) {
		console.error("Error fetching user data:", error);
		//throw new Error("Failed to fetch user data.");
	}
}
