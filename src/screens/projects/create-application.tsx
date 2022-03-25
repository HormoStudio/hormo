import './create-application.scss';
import { useNav } from 'components/react-van';
import React, { Fragment, useState } from 'react';
import { Input, Typography, Space, Button, Avatar, Steps } from 'antd';
import { Routes } from 'services/routes';
import { IconBook, IconBrandYoutube, IconBox, IconRocket, IconBuildingStore, IconBrowser } from '@tabler/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';


export function CreateApplication() {
	const nav = useNav();
	const [state, setState] = useState(0);
	const [template, setTemplate] = useState(-1);
	const [services, setServices] = useState([]);

	const serviceItems = [
		'Google Auth', 'Documentation', 'Monitoring', 'Admin Dashboard'
	];
	function contains(i) {
		return services.indexOf(i) > -1;
	}
	function toggleService(i) {
		setServices(a => {
			const copy = Array.from(a);
			const index = copy.indexOf(i);
			if(index > -1) {
				copy.splice(index, 1);
			}else {
				copy.push(i);
			}
			return copy;
		})
	}

	function changeState(x) {

		let a = state;
		a += x;
		if(a > 2) {
			nav.changePath(Routes.projects.wait);
			return;
		}else if( a < 0) {
			nav.goBack();
			return;
		}
		setState(a)

	}
	return <div className="hm-screen hm-screen-create-application" style={{
		flex: '1 1 auto',
		padding: '44px',
		alignItems: 'center'
	}}>
		
		<Steps current={state} style={{marginBottom: 44, width: '100%', maxWidth: 480}}>
			<Steps.Step title="Information"/>
			<Steps.Step title="Template"/>
			<Steps.Step title="Services"/>
		</Steps>
		{state === 0 ? (
			<Fragment>
				<Typography.Title level={3} style={{marginBottom: 32}}>Enter your new application information.</Typography.Title>
				<Space direction="vertical" style={{ maxWidth: 320, width: '100%' }}>
					<label>Application name :</label>
					<Input placeholder="Name of new application" />
					<label>Application description :</label>
					<Input placeholder="What is it about" />
					<label>Application location :</label>
					<Input placeholder="/Documents/hormo/" />
				</Space>
			</Fragment>
		) : state === 1 ? (
			<Fragment>
				<Typography.Title level={3} style={{marginBottom: 32}}>Choose your prefrred application template.</Typography.Title>
				
				<div className="template-grid">
					<Button onClick={() => setTemplate(0)} ghost={template === 0} type={template === 0 ? 'primary' : 'default'}>
						<IconBox/>
						<div className="title">Blank</div>
						<div className="subtitle">Strat fresh!</div>
					</Button>

					<Button onClick={() => setTemplate(1)} ghost={template === 1} type={template === 1 ? 'primary' : 'default'}>
						<IconRocket/>
						<div className="title">Jump Start</div>
						<div className="subtitle">Start powerful!</div>
					</Button>

					<Button className="comming-soon" disabled>
						<IconBuildingStore/>
						<div className="title">eCommerce</div>
						<div className="subtitle">Start selling!</div>
					</Button>

					<Button className="comming-soon" disabled>
						<IconBrowser/>
						<div className="title">Company Website</div>
						<div className="subtitle">Start Professional!</div>
					</Button>
				</div>
			</Fragment>
		) : state === 2 ? (
			<Fragment>
				<Typography.Title level={3} style={{marginBottom: 32}}>Select your prefrred application services.</Typography.Title>
				<div className="template-grid">
					{serviceItems.map((item, i) => {
						const selected = contains(i);
						return  <Button key={i} onClick={() => toggleService(i)} ghost={selected} type={selected ? 'primary' : 'default'}>
							<Checkbox checked={selected}>{item}</Checkbox>
						</Button>
					})}
				</div>
			</Fragment>
		) : null}
		<div className="button-wrapper">
			<Button size="large" onClick={()=>changeState(-1)}><i className="material-icons">west</i>Back</Button>
			<Button size="large" type="primary" onClick={()=>changeState(1)}>Next<i className="material-icons">east</i></Button>
		</div>
	</div>
}