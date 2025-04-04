import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import { createProject } from "../app/api/(project)/createProject";
import { AppContext } from "../context";

export function CreateProject() {
	const router = useRouter();
	const { user } = useContext(AppContext);
	const [message, setMessage] = useState();
	const [projectDetails, setProjectDetails] = useState({
		projectName: "",
		industry: "",
	});

	const { projectName, industry } = projectDetails;

	const handleChange = (evt) => {
		setMessage(""); // Clear message on input change
		setProjectDetails({ ...projectDetails, [evt.target.name]: evt.target.value });
		console.log(projectDetails.projectName);
	};

	const handleIndustryChange = (value) => {
		setMessage(""); // Clear message on input change
		setProjectDetails({ ...projectDetails, industry: value });
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		try {
			const updatedProjectDetails = { ...projectDetails, projectOwnerId: user.userId };
			const newProject = await createProject(updatedProjectDetails);
			setProjectDetails({
				projectName: "",
				industry: "",
			});

			router.push(`/dashboard/${newProject.project.id}`);
		} catch (error) {
			setMessage(error.message);
		}
	};

	const industries = [
		"Financial Services",
		"Sustainability",
		"Technology",
		"Food & Beverage",
		"Lifestyle",
		"Healthcare",
		"Government",
		"Education",
		"Property",
		"Others",
	];

	const isFormInvalid = () => {
		return !(projectName && industry);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create Project</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create a new project</DialogTitle>
					<DialogDescription>Enter the project details.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="projectName" className="text-right">
								Project name
							</Label>
							<Input
								id="projectName"
								value={projectName}
								name="projectName"
								placeholder="ACME Rebrand"
								onChange={handleChange}
								className="col-span-3"
							/>
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="industry" className="text-right">
								Industry
							</Label>

							<Select value={industry} onValueChange={handleIndustryChange}>
								<SelectTrigger className="w-min-full w-[410px]">
									<SelectValue placeholder="Select your industry" />
								</SelectTrigger>

								<SelectContent>
									{industries.map((industry, idx) => (
										<SelectItem key={idx} value={industry}>
											{industry}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<p className="text-[12px] text-center leading-4 text-red-500">{message}</p>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isFormInvalid()}>
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
