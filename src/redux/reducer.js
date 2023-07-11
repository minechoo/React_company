//store의 데이터를 변경해주는 변형자함수
import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'President',
			pic: 'member1.jpg',
		},
		{
			name: 'David',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Front-end Engineer',
			pic: 'member4.jpg',
		},
		{
			name: 'Sara',
			position: 'Back-end Engineer',
			pic: 'member5.jpg',
		},
		{
			name: 'Michael',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	],
};
//초기 데이터값을 state로 저장하고 추후 action 객체거 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는
//변형자 함수 생성
const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};
//해당 변형자 함수가 반환하는 객체값을 하나의 객체로 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer });

export default reducers;
