export function init() {
	console.log('홈 페이지 로직 실행 Home');
}

function getParentUserID() {
	console.log('홈 페이지 로직 실행 getParentUserID');

	try {
		const userElement = window.parent.document.querySelector('#userID');

		if (userElement) {
			const userID = userElement.innerText;
			console.log('부모에서 가져온 아이디:', userID);

			localStorage.setItem('loggedInUser', userID);
			return userID;
		} else {
			console.warn("부모 페이지에서 'userID' 요소를 찾을 수 없습니다.");
		}
	} catch (error) {
		console.error(
			'보안 정책(CORS)으로 인해 부모 페이지에 접근할 수 없습니다.',
			error,
		);
	}
}

window.addEventListener('load', getParentUserID);
