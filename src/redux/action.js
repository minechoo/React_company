//reducer로 전달되는 액션객체 생성함수

//인수로 전달된 값을 payload에 담아서 액션객체를 반환하는 함수 export
//해당 액션생성함수는 추후 컴포넌트에서 호출될 예정
export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};

/*
	1- action.js -> 액션 생성후 리턴
  2- reducer.js -> 액션 객체를 받아서 전역데이터를 변형한뒤 리턴
  3- store.js -> 리듀서가 반환한 객체를 전역 store공간에 저장후 export
  4- index.js -> store 전역데이터 객체를 App컴포넌트에 Provider로 전달
  5- 원하는 컴포넌트 어디에서든 useSelector로 store데이터 호출 가능
*/
