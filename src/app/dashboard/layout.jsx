import { fetchUsers } from "../api/fetchUserData";
import { AppContextWrapper } from "../../context";
import DashboardUi from "../../components/dashboardUi";

export default async function DashboardLayout({ children }) {
	const userData = await fetchUsers();
console.log(userData)
	return (
		<AppContextWrapper userData={userData}>
			<DashboardUi>{children}</DashboardUi>
		</AppContextWrapper>
	);
}
