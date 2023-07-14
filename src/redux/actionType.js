//각 데이터 카테고리별로 사용할 액션 타입면을 변수처럼 모아놓은 객체
export const YOUTUBE = {
	start: 'YOUTUBE_START',
	success: 'YOUTUBE_SUCCESS',
	fail: 'YOUTUBE_FAIL',
};

export const DEPARTMENT = {
	start: 'DEPARTMENT_START',
	success: 'DEPARTMENT_SUCCESS',
	fail: 'DEPARTMENT_FAIL',
};

export const FLICKR = {
	start: 'FLICKR_START',
	success: 'FLICKR_SUCCESS',
	fail: 'FLICKR_FAIL',
};

/*
	리덕스 사가 데이터 흐름 순서
	1. actionType.js - 데이터요청, 성공, 실패에 대한 actionType을 세분화해서 객체형태로 export
	2. reduer.js - 3가지 액션타입 요청에 대한 데이터 변경처리 함수 export
	3. api.js - axios로 비동기 데이터 호출 함수를 순수함수 형태로 만들어서 export
	4. saga.js - 처음에 리듀서가 전달받는 start액션요청을 감지해서 api.js로 부터 데이터fetching받고 새로운 액션객체 반환 함수 export
	5. store.js - 리듀서에 saga미들웨어 연결후 연결된 데이터값으로 store 전역객체에 저장후 export
	6. index.js - store전역객체를 App루트 컴포넌트에 전달
	7. App.js - 컴포넌트 마운트되자 마자 Youtube_START라는 액션객체를 dipatch로 전달 (이후 reuder-saga-store흐름으로 전역 state객체가 생성)
	8. 원하는 컴포넌트에서 자유롭게 useSelector로 해당 데이터를 가져오면 됨
*/
