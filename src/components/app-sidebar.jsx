"use client";

import * as React from "react";
import { Sparkles, AudioWaveform, MessageSquareQuote, Command, Frame, GalleryVerticalEnd, Target, BookA, Settings2, Telescope } from "lucide-react";
import { NavMain } from "../components/nav-main";
import { NavUser } from "../components/nav-user";
import { TeamSwitcher } from "../components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../components/ui/sidebar";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";

export function AppSidebar({ ...props }) {
	const { isProjectOpen, project } = useContext(AppContext);

	const projectSlug = project?.id;

	const data = {
		teams: [
			{
				name: "Acme Inc",
				logo: GalleryVerticalEnd,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveform,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: Command,
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Quick Start",
				url: "#",
				icon: Sparkles,
				isActive: true,
				items: [
					{
						title: "Generate Brand Strategy",
						url: `/dashboard/${projectSlug}/quick-strategy`,
					},
				],
			},

			{
				title: "Discovery",
				url: "#",
				icon: Telescope,

				items: [
					{
						title: "Onboarding",
						url: `/dashboard/${projectSlug}/onboarding`,
					},
					{
						title: "Stakeholder Interviews",
						url: `/dashboard/${projectSlug}/interview`,
					},
					{
						title: "Market Research",
						url: "#",
					},
					{
						title: "Audience Analysis",
						url: "#",
					},
					{
						title: "Brand Audit",
						url: "#",
					},
				],
			},
			{
				title: "Brand Core Definition",
				url: "#",
				icon: BookA,
				items: [
					{
						title: "Purpose / Vision / Mission",
						url: "#",
					},
					{
						title: "Brand Values",
						url: "#",
					},
					{
						title: "Personality & Promise",
						url: "#",
					},
				],
			},
			{
				title: "Positioning Strategy",
				url: "#",
				icon: Target,
				items: [
					{
						title: "Positioning Statement",
						url: "#",
					},
					{
						title: "Unique Selling Proposition (USP)",
						url: "#",
					},
					{
						title: "Brand Archetype",
						url: "#",
					},
				],
			},
			{
				title: "Messaging Framework",
				url: "#",
				icon: MessageSquareQuote,
				items: [
					{
						title: "Tagline",
						url: "#",
					},
					{
						title: "Key Messages",
						url: "#",
					},
					{
						title: "Tone of Voice",
						url: "#",
					},
				],
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2,
				items: [
					{
						title: "General",
						url: "#",
					},
					{
						title: "Team",
						url: "#",
					},
					{
						title: "Billing",
						url: "#",
					},
					{
						title: "Limits",
						url: "#",
					},
				],
			},
		],

		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame,
			},
		],
	};

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				{isProjectOpen && (
					<div>
						<NavMain items={data.navMain} />
						{/* <NavProjects projects={data.projects} /> */}
					</div>
				)}
			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
