import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchDepartment = createAsyncThunk('department/requestDepartment', async () => {
	const result = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
	return result.data.members;
});

//reducer 함수 대신
const departmentSlice = createSlice({
	name: 'department',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchDepartment.pending]: (state) => {
			state.isLoading = true;
		},
		//성공수행
		[fetchDepartment.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		//실패
		[fetchDepartment.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default departmentSlice.reducer;
