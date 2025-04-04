import Link from "next/link";
import ProjectContext from "../../../../components/projectContext";
import { listQuickStrategies } from "../../../api/(quickStrategy)/listQuickStrategies";
import { fetchProject } from "../../../api/(project)/fetchProject";
import { CreateQuickStrategy } from "../../../../components/create-quick-strategy-alt";

export default async function Page({ params }) {
	const projectId = (await params).projectId;
	const projectData = await fetchProject(projectId);
	const quickStrategyData = await listQuickStrategies(projectId);

	return (
		<div className="flex flex-1 flex-col gap-4 pt-0">
			<ProjectContext projectId={projectId} projectData={projectData} />
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold">Quick Start</h1>
				<CreateQuickStrategy />
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				{quickStrategyData?.map((item) => (
					<Link href={`/dashboard/${item.projectId}/quick-strategy/${item.id}`} key={item.id} className="bg-muted/50 aspect-video rounded-xl">
						<div className="flex justify-center items-center h-full ">
							<p className="text-3xl font-bold">{item.quickStrategyInput.brandName}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
