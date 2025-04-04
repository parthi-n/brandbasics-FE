"use server";
import { getToken } from "../../lib/getCookie";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_URL || process.env.NEXT_PUBLIC_BRANDBASICS_BACKEND_LOCAL_URL;
const PROJECTS_URL = `${BASE_URL}/strategy`;

export async function createStrategy(userData, formdata) {
	const token = await getToken();

	console.log("User Data:", userData);
	const brandName = formdata.get("brandName");
	const category = formdata.get("category");
	const productValue = formdata.get("productValue");
	const audienceInsights = formdata.get("audienceInsights");
	const desiredPersona = formdata.get("desiredPersona");
	const brandVision = formdata.get("brandVision");

	const brandDetails = {
		brandName: brandName,
		category: category,
		productValue: productValue,
		audienceInsights: audienceInsights,
		desiredPersona: desiredPersona,
		brandVision: brandVision,
		userId: userData.userId,
		projectId: userData.projectId,
	};

	let strategyId;

	try {
		const res = await fetch(`${PROJECTS_URL}/create-quick-strategy`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: token,
			},
			credentials: "include",
			body: JSON.stringify(brandDetails),
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.log("Generate brand strategy failed:", errorData);
			return { message: `Generate brand strategy failed: ${errorData.error}` || res.statusText || "An unknown error occurred." };
		}
		const data = await res.json();
		strategyId = data.aiStrategyOutput.id;
		const projectId = data.aiStrategyOutput.projectId;
		console.log("data", data);
	} catch (error) {
		console.error("Error Brand Strategy:", error);
		return { message: "Failed to Brand Strategy. Please try again later." };
	}
	redirect(`/dashboard/${userData.projectId}/quick-strategy/${strategyId}`);
}
