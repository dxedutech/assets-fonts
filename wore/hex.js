const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/oddong' : '';
const main = document.querySelector('main');

const loadPage = async (v) => {
	const { p } = v;

	/*** Html 제어 */
	v.res = await fetch(`${basePath}/woof/${p}/${p}.html`);
	v.html = await v.res.text();
	main.innerHTML = v.html;

	/*** 로컬과 서버 이미지 호출 주소 제어 */
	main.querySelectorAll('img').forEach(img => {
		if (!img.src.includes(basePath) && !img.src.startsWith('http')) {
			v.src = img.getAttribute('src');
			img.src = `${basePath}${v.src.startsWith('/') ? '' : '/'}${v.src}`;
		}
	});

	/*** Javascript 제어 */
	try {
		v.m = await import(`${basePath}/woof/${p}/${p}.js`);
		if (v.m.init) v.m.init(); /// 해당 자바스크립트를 가져와 해당 함수 실행
	} catch (e) {
		console.log('이 페이지는 별도 JS가 필요 없습니다.');
	}
};

/*** Nav a 태그 라우터 제어 */
main.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;

  e.preventDefault();
  const page = new URL(a.href).searchParams.get('page');
  if (page) {
    loadPage({ p: page });
  }
});

export const dx = { loadPage };
