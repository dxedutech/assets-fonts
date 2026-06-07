const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/oddong' : '';
const main = document.querySelector('main');

const loadPage = async (v) => {
	const { p } = v;

	v.res = await fetch(`${basePath}/woof/${p}/${p}.html`);
	v.html = await v.res.text();
	main.innerHTML = v.html;

	main.querySelectorAll('img').forEach(img => {
		if (!img.src.includes(basePath) && !img.src.startsWith('http')) {
			v.src = img.getAttribute('src');
			img.src = `${basePath}${v.src.startsWith('/') ? '' : '/'}${v.src}`;
		}
	});

	try {
		v.m = await import(`${basePath}/woof/${p}/${p}.js`);
		if (v.m.init) v.m.init();
	} catch (e) {
		console.log('이 페이지는 별도 JS가 필요 없습니다.');
	}
};

export const dx = { loadPage, basePath };
