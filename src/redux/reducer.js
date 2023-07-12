//store의 데이터를 변경해주는 변형자함수
import { combineReducers } from 'redux';

//초기 데이터값을 state로 저장하고 추후 action 객체가 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는
//변형자 함수 생성
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			//기존 state를 action.payload로 덮어쓰기
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			//기존 state를 action.payload로 덮어쓰기
			return { ...state, youtube: action.payload };

		default:
			return state;
	}
};
//해당 변형자 함수가 반환하는 객체값을 하나의 객체로 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;
