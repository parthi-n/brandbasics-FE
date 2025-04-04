import { handleResponse } from "../../../lib/handleResponse";
import { getToken } from "../../../lib/getCookie";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const PROJECTS_URL = `${BASE_URL}/strategy`;

export async function listQuickStrategies(projectId) {
	const token = await getToken();
	try {
		const res = await fetch(`${PROJECTS_URL}/list-quick-strategies/${projectId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: token,
			},
			credentials: "include",
		});

		if (res.status === 404) {
			//	console.error("Resource not found (404)");
			return;
		}

		return await handleResponse(res);
	} catch (error) {
		console.error("Error Brand Strategy:", error);
		//	throw new Error("Failed to Brand Strategy.");
	}
}
