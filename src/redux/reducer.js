//전역 state 의 데이터를 맥션타입에 종류에 따라서 변경해서 반환하는 함수
import { combineReducers } from 'redux';
import * as types from './actionType';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		//컴포넌트로부터  넘겨받는 action객체
		//해당 객체를 넘겨받으면 saga가 해당 타입에 대한 비동기 데이터처리하고 새로운객체 반환
		case types.YOUTUBE.start:
			return state;
		//saga로 부터 새롭게 넘겨받은 action객체로 데이터처리 (데이터 fetching성공시)
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		//saga로 부터 새롭게 넘겨받은 action객체로 데이터처리 (데이터 fetching실패시)
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const departmentReducer = (state = { department: [] }, action) => {
	switch (action.type) {
		case types.DEPARTMENT.start:
			return state;
		case types.DEPARTMENT.success:
			return { ...state, department: action.payload };
		case types.DEPARTMENT.fail:
			return { ...state, department: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer, departmentReducer });
export default reducers;
