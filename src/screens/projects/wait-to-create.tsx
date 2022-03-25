import './recent-projects.scss';
import { useNav } from 'components/react-van';
import React, { useState } from 'react';
import { Input, Typography, Space, Button, Avatar, Spin } from 'antd';
import { Routes } from 'services/routes';
import { IconBook, IconBrandYoutube, IconBox } from '@tabler/icons';


export function WaitToCreate() {
	const nav = useNav();
	return <div className="hm-screen hm-screen-wait-to-create" style={{
		flex: '1 1 auto',
		padding: '44px',
		textAlign: 'center',
		justifyContent: 'center',
	}}>
		<Typography.Title style={{fontSize: 77, marginBottom: 0}}>🍻</Typography.Title>
		<Typography.Title level={3} style={{marginBottom: 24, marginTop: 12}}>Kora - Task management was created sucessfully!</Typography.Title>
		<Typography.Paragraph type="secondary" style={{marginBottom: 112}}>We are transfering you to the application panel in a few secounds…</Typography.Paragraph>

		<Typography.Paragraph type="secondary" style={{marginBottom: 44}}>Generating infrastructures 🏄‍♂️</Typography.Paragraph>
		<Spin/>
	</div>
}