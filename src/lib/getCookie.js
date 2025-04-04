import { cookies } from "next/headers";

const getToken = async () => {
	const cookieStore = await cookies();
	const storageToken = localStorage.getItem("token");

	const token = `token=${cookieStore.get("token")?.value}` || `token=${storageToken}`;
	return token;
};

export { getToken };
