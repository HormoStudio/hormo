import { useNav } from 'components/react-van';
import React, { useState } from 'react';
import { Routes } from 'services/routes';
import { Input, Typography,Space, Button } from 'antd';


export function ForgotPassword() {
	const nav = useNav();
	return <div className="hm-screen" style={{padding: 44, alignItems: 'center'}}>
		<Typography.Title level={2}>Forgot Password</Typography.Title>
		<Typography.Paragraph type="secondary" style={{marginBottom: 28}}>We’ll send you a link to reset your password.</Typography.Paragraph>
		<Space direction="vertical" style={{ maxWidth: 320, width: '100%' }}>
			<label>Email :</label>
			<Input type="email" placeholder="Enter your email" />
			<Button type="primary" style={{marginTop: 12}} block>Reset Password</Button>
			<Typography.Paragraph style={{textAlign: 'center', marginBottom: 0, marginTop: 4}}>
				<Typography.Link onClick={() => nav.changePath(Routes.login.login)}>Sign In</Typography.Link>
			</Typography.Paragraph>
			
		</Space>
	</div>
}