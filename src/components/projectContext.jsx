"use client";
import { AppContext } from "../context";
import { useContext, useEffect } from "react";

export default function ProjectContext({ projectId, projectData }) {
	const { project,setProject, setIsProjectOpen } = useContext(AppContext);

	useEffect(() => {
		setProject(projectData);
		{
			projectId ? setIsProjectOpen(true) : setIsProjectOpen(false);
		}
	}, [project]);

	return;
}
