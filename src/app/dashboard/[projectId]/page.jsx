import ProjectDetails from "./ProjectDetails";
import { fetchProject } from "../../api/(project)/fetchProject";

import { redirect } from "next/navigation";

export default async function project({ params }) {
	const projectId = (await params).projectId;
	const projectData = await fetchProject(projectId);

	if (!projectData || projectData.length === 0) {
		redirect("/dashboard");
	}

	return <ProjectDetails projectData={projectData} />;
}
