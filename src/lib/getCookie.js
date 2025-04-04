import { cookies } from "next/headers";

const getToken = async () => {
	const cookieStore = await cookies();

	const token = `token=${cookieStore.get("token")?.value}`;
	return token;
};

export { getToken };
