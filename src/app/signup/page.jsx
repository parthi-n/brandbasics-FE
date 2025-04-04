"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "../../components/signup-form.jsx";
import Image from "next/image";
import { AppContextWrapper } from "../../context";

import bbSplash from "../../images/bb-splash.jpg";
console.log(bbSplash);

export default function SignupPage() {
	return (
		<AppContextWrapper>
			<div className="grid min-h-svh lg:grid-cols-2">
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex justify-center gap-2 md:justify-start">
						<a href="#" className="flex items-center gap-2 font-medium">
							<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
								<GalleryVerticalEnd className="size-4" />
							</div>
							BrandBasics.io
						</a>
					</div>
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-xs">
							<SignupForm />
						</div>
					</div>
				</div>
				<div className="relative hidden bg-muted lg:block">
					<Image
						src={bbSplash}
						alt="Image"
						width={500}
						height={500}
						className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
			</div>
		</AppContextWrapper>
	);
}
