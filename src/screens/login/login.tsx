import { useNav } from 'components/react-van';
import React, { useState } from 'react';
import { Input, Typography,Space, Button } from 'antd';
import { Routes } from 'services/routes';


export function Login() {
	const nav = useNav();
	return <div className="hm-screen" style={{padding: 44, alignItems: 'center'}}>
		<Typography.Title level={2} style={{marginBottom: 28}}>Sign In</Typography.Title>
		<Space direction="vertical" style={{ maxWidth: 320, width: '100%' }}>
			<label>Email :</label>
			<Input placeholder="Enter your email" />
			<label>Password :</label>
			<Input.Password placeholder="Enter your password" />
			<Button type="primary" style={{marginTop: 12}} onClick={() => nav.changePath(Routes.projects.recent)} block>Sign In</Button>
			<Typography.Paragraph style={{textAlign: 'center', marginBottom: 0, marginTop: 12}}>
				Already have an account? <Typography.Link onClick={() => nav.changePath(Routes.login.createAccount)}>Create an Account</Typography.Link>
			</Typography.Paragraph>
			<Typography.Paragraph style={{textAlign: 'center', marginBottom: 0, marginTop: 4}}>
				<Typography.Link onClick={() => nav.changePath(Routes.login.forgotPassword)}>Forget password?</Typography.Link>
			</Typography.Paragraph>
		</Space>
	</div>
}