"use client";

import React, { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext(undefined);

// Custom hook for consuming the context
function useAppContext() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppContextProvider");
	}
	return context;
}

function AppContextWrapper({ children, userData }) {
	const initialUser =
		userData && userData.id ? { username: userData.username, email: userData.email, userId: userData.id, userType: userData.userType } : null;

	const initialProjectList = userData && userData.project ? userData.project : null;

	const [user, setUser] = useState(initialUser);
	const [project, setProject] = useState(null);
	const [projectList, setProjectList] = useState(initialProjectList);
	const [quickBrandStrategies, setQuickBrandStrategies] = useState(null);
	const [isProjectOpen, setIsProjectOpen] = useState(false);
	const value = {
		user,
		setUser,
		project,
		setProject,
		projectList,
		setProjectList,
		quickBrandStrategies,
		setQuickBrandStrategies,
		isProjectOpen,
		setIsProjectOpen,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContextWrapper, useAppContext, AppContext };
