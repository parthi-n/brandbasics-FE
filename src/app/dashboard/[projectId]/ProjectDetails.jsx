"use client";
import { AppContext } from "../../../context";
import { useContext, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

export default function ProjectDetails({ projectData }) {
	const { project, setProject, setIsProjectOpen } = useContext(AppContext);


	useEffect(() => {
		setProject(projectData);
		{
			project && project.id ? setIsProjectOpen(true) : setIsProjectOpen(false);
		}
	}, [project]);

	return (
		<div>
			{project?.projectName && (
				<div>
					<h1 className="text-4xl font-bold">{project?.projectName}</h1>
					<div className="my-10 w-[550px]">
						Transform Your Brand with Precision, Purpose, and Clarity – <br />
						A.I.-Driven Strategy for Visionary Leaders and Passionate Branding Experts. Uncover hidden opportunities, craft meaningful connections,
						and build brand legacies that resonate deeply, one impactful step at a time.
					</div>

					<Link href={`/dashboard/${project?.id}/quick-strategy`}>
						<Button>Lets Get Started</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
