import './recent-projects.scss';
import { useNav } from 'components/react-van';
import React, { useState } from 'react';
import { Input, Typography, Space, Button, Avatar } from 'antd';
import { Routes } from 'services/routes';
import { IconBook, IconBrandYoutube, IconBox } from '@tabler/icons';


export function RecentProjects() {
	const nav = useNav();
	return <div className="hm-screen hm-screen-recent-projects" style={{
		flex: '1 1 auto',
		padding: '44px'
	}}>
		<div className="profile-wrapper">
			<Avatar>U</Avatar>
			<div className="name">Harry Brown</div>
			<Button>Go to Premium</Button>
		</div>
		<div className="button-wrapper">
			<Button>
				<IconBook/>
				<div className="title">Read our Documentation<i className="material-icons">east</i></div>
				<div className="subtitle">Learn how to use Hormo Studio</div>
			</Button>

			<Button>
				<IconBrandYoutube/>
				<div className="title">Read our Documentation<i className="material-icons">east</i></div>
				<div className="subtitle">Learn how to use Hormo Studio</div>
			</Button>
		</div>
		<div className="recent-applications">
			<Typography.Title level={4}>Recent Applications</Typography.Title>
			<div className="application-grid">
				<Button size="large" className="app-item">
					<IconBox/> My project <i className="material-icons">east</i>
				</Button>
			</div>
			<Button size="large" type="primary" style={{
				marginTop: 'auto',
				padding: '0 77px',
				alignSelf: 'center',
			}} onClick={() => nav.changePath(Routes.projects.create)}>Create New Applications</Button>
		</div>
	</div>
}