import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: { open: false },
	//서버사이드 state를 관리하는 것이 아닌 client side state관리이므로 reudcer로 설정
	//extraReducers는 createAsyncThunk가 반환하는 액션객체의 상태(요청, 성공, 실패)에 따라 자동으로 값을 저장하는 반면
	//reudcers는 초기 state값을 변경해주는 함수를 직접 등록
	reducers: {
		close: (state) => {
			//액션객체 반환
			state.open = false;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});

//state변경함수 export
//reducer에서 반환한 함수는 menuSlice의 actions 프로퍼티에서 비구조화할당으로 뽑아서 export (각 컴포넌트에서 이벤트 발생시 import)
export const { close, toggle } = menuSlice.actions;
//해당 함수로 변경되는 실제적인 전역 state값을 reducer 프로퍼티에서 뽑아 export (store에 저장할때 import)
export default menuSlice.reducer;
