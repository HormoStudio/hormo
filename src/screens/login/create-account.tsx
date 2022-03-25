import { useNav } from 'components/react-van';
import React, { useState } from 'react';
import { Routes } from 'services/routes';
import { Input, Typography,Space, Button } from 'antd';


export function CreateAccount() {
	const nav = useNav();
	return <div className="hm-screen" style={{padding: 44, alignItems: 'center'}}>
		<Typography.Title level={2}>Create an Account</Typography.Title>
		<Typography.Paragraph type="secondary" style={{marginBottom: 28}}>Free forever. No credit card required.</Typography.Paragraph>
		<Space direction="vertical" style={{ maxWidth: 320, width: '100%' }}>
			<label>Name :</label>
			<Input placeholder="Enter your name" />
			<label>Email :</label>
			<Input type="email" placeholder="Enter your email" />
			<label>Password :</label>
			<Input.Password placeholder="Enter your password" />
			<Button type="primary" style={{marginTop: 12}} block>Create Account</Button>
			<Typography.Paragraph style={{textAlign: 'center', marginBottom: 0, marginTop: 12}}>
				Already have an account? <Typography.Link onClick={() => nav.changePath(Routes.login.login)}>Sign In</Typography.Link>
			</Typography.Paragraph>
		</Space>
	</div>
}