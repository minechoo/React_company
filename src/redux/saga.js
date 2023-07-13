//redecer에 액션 요청이 처음 들어왔을때 중간에서 가로채서 대신 중간작업을 수행한뒤 다시 새롭게 반환된 액션 객체를 리듀서에 전달
//미들웨어 : 중간 특정 시점에 감섭을 해서 부가적인 기능을 수행

/*
  takeLatest (제일 마지막에 들어온 api 요청만 수행), takeEvery (들어오는 모든 api요청을 수행)
  put (saga에서 새롭게 생성된 액션객체를 리듀서에 전달, saga에서 전용으로 쓰이는 dispatch)
  call (saga에서 api관련 함수를 가져와서 호출할때 쓰이는 함수, 두번째 인수값을 전달 가능)
  fork (saga관련 함수를 실행하는 함수)
  all (fork함수를 비동기적으로 동시에 여러개 호출할때 필요한 함수)
  작업흐름
  1- 컴포넌트로부터 리듀서에 전달된 초기 action요청을 takeLatest로 가져오는 함수 정의
  2- api.js로 부터 fetching함수를 가져와서 call로 호출하는 함수 정의
  3- 데이터 fetching에 성공유무에 따라 서로 다른 액션객체를 반환
  4- 이렇게 만들어진 함수를 한번에 호출하는 함수를 제작
  5- 위의 함수들을  saga단에서 단계에 맞게 동기화 호출할 수 있도록 제너레이터 함수로 제작
*/
import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube } from './api';
import * as types from './actionType';

//컴포넌트로부터 리듀서에 전달된 YOUTUBE_START 액션요청을 대신 전달받아 데이터 fetching함수 호출해주는 함수
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//유튜브 데이터 호출한뒤 반환된 값으로 새롭게 액션객체를 생성하는 함수
function* returnYoutube() {
	try {
		//데이터 fetching에 성공했을때
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		//데이터 fetching에 실패했을때
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

//최종적으로 fork를 통해 callYoutube호출 함수 제작
export default function* rootSaga() {
	yield all([fork(callYoutube)]);
}
