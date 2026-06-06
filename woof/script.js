const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/oddong' : '';

const main = document.querySelector('main');

const loadPage = async (v) => {
	const { p } = v;

	v.res = await fetch(`${basePath}/woof/${p}/${p}.html`);
	v.html = await v.res.text();
	main.innerHTML = v.html;
	console.log(params, p); ///
	try {
		v.m = await import(`${basePath}/woof/${p}/${p}.js`);
		if (v.m.init) v.m.init();
	} catch (e) {
		console.log('이 페이지는 별도 JS가 필요 없습니다.');
	}
};
const params = new URLSearchParams(window.location.search);
loadPage({ p: 'home' });

document.querySelectorAll('nav a').forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const page = new URL(link.href).searchParams.get('page');
		if (page) {
			// window.history.pushState({ page }, '', `?page=${page}`);
			loadPage({ p: page });
		}
	});
});
