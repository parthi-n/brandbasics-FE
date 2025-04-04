"use client";

import { useActionState, useContext } from "react";
import { createStrategy } from "../app/actions/createStrategy";
import { AppContext } from "../context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormStatus } from "react-dom";

const Loader = () => (
	<div className="min-h-80 flex flex-col rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
		<div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
			<div className="flex justify-center">
				<div
					className="animate-spin inline-block size-10 border-3 border-current border-t-transparent text-black rounded-full dark:text-blue-500"
					role="status"
					aria-label="loading"
				>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		</div>
	</div>
);

const initialState = {
	message: "",
};

export function CreateQuickStrategy() {
	const { user, project } = useContext(AppContext);
	const userData = { userId: user?.userId, projectId: project?.id };
	const createStrategyWithUserData = createStrategy.bind(null, userData);

	const [state, formAction, isPending] = useActionState(createStrategyWithUserData, initialState);
	const { pending } = useFormStatus();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Generate Strategy</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] md:max-w-[900px]">
				<DialogHeader>
					<DialogTitle>Generate Strategy</DialogTitle>
					<DialogDescription>Enter the brand details.</DialogDescription>
				</DialogHeader>

				<form action={createStrategyWithUserData}>
					{isPending ? (
						<Loader />
					) : (
						<div>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="brandName" className="text-right">
										Brand name
									</Label>
									<Input id="brandName" name="brandName" placeholder="EcoLife" className="col-span-3" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="category" className="text-right">
										Brand Category
									</Label>
									<Input id="category" name="category" placeholder="Sustainable Products" className="col-span-3" />
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="brandVision" className="text-right">
										Brand vision
									</Label>
									<Input id="brandVision" name="brandVision" placeholder="Make eco-living accessible to everyone" className="col-span-3" />
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="productValue" className="text-right">
										Product / Service value
									</Label>
									<Input id="productValue" name="productValue" placeholder="Affordable and eco-friendly" className="col-span-3" />
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="audienceInsights" className="text-right">
										Demographic insights
									</Label>
									<Input
										id="audienceInsights"
										name="audienceInsights"
										placeholder="Young urban customers care about environment"
										className="col-span-3"
									/>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="desiredPersona" className="text-right">
										Desired persona
									</Label>
									<Input id="desiredPersona" name="desiredPersona" placeholder="Friendly, Trustworthy, Green Innovator" className="col-span-3" />
								</div>

								{/* Display message if there is any error */}
								<p className="text-[12px] text-center leading-4 text-red-500">{state.message}</p>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Processing..." : "Generate strategy"}
						</Button>
					</DialogFooter>
				</form>

				{/* Form */}
			</DialogContent>
		</Dialog>
	);
}
