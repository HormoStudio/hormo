import {debounce} from 'react-soa/dist/debounce';

export function registerResizeFixer() {
	let initHeight = window.innerHeight;
	const debouncedUpdate = debounce(() => {
		const x = window.innerHeight < initHeight ? 0 : 0;
		const vh = (window.innerHeight + x) * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		const vw = (window.innerWidth) * 0.01;
		document.documentElement.style.setProperty('--vw', `${vw}px`);

	}, 1);
	debouncedUpdate();
	['orientationchange', 'resize'].forEach(ev => {
		window.addEventListener(ev, (e) => {
			if (ev === 'orientationchange')
				initHeight = window.innerHeight;
			debouncedUpdate();
		});
	});
}