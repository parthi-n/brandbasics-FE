"use client";
import { AppSidebar } from "../components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Separator } from "../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppContext } from "../context";
import { useContext } from "react";

export default function DashboardUi({ children }) {
	const { project, isProjectOpen } = useContext(AppContext);

	console.log("isProjectOpen", isProjectOpen);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-8">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="/dashboard">Projects</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage className="capitalize">{project?.projectName}</BreadcrumbPage>
								</BreadcrumbItem>
								{/*<BreadcrumbSeparator className="hidden md:block" />
								 <BreadcrumbItem>
									<BreadcrumbPage>Module Name</BreadcrumbPage>
								</BreadcrumbItem> */}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="px-8">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
