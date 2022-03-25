import React, { Fragment } from 'react';
import { Experiment, Route } from "components/react-van";
import { Routes } from 'services/routes';
import { Login } from 'screens/login/login';
import { CreateAccount } from 'screens/login/create-account';
import { ForgotPassword } from 'screens/login/forgot-password';
import { RecentProjects } from 'screens/projects/recent-projects';
import { CreateApplication } from 'screens/projects/create-application';
import { WaitToCreate } from 'screens/projects/wait-to-create';


export function App() {
	return <Fragment>
		<Experiment name="login-flow" flow>
			<Route
				name={Routes.login.login}
				component={Login}
				root
			/>
			<Route
				name={Routes.login.createAccount}
				component={CreateAccount}
			/>
			<Route
				name={Routes.login.forgotPassword}
				component={ForgotPassword}
			/>
		</Experiment>
		<Experiment name="projects">
			<Route 
				name={Routes.projects.recent}
				component={RecentProjects}
				root
			/>
			<Route 
				name={Routes.projects.create}
				component={CreateApplication}
			/>
			<Route 
				name={Routes.projects.wait}
				component={WaitToCreate}
			/>
			
		</Experiment>
	</Fragment>
}