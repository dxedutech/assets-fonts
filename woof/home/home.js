import { dx } from '../../wore/hex.js';

export function init() {
	console.log('홈 페이지 로직 실행 Home');
}

document.querySelectorAll('.hex a').forEach((a) => {
	a.addEventListener('click', (e) => {
		e.preventDefault();
		const page = new URL(a.href).searchParams.get('page');
		console.log(page);
		if (page) {
			// window.history.pushState({ page }, '', `?page=${page}`);
			dx.loadPage({ p: page });
		}
	});
});