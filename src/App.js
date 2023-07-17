import { Route, Switch } from 'react-router-dom';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';
// main
import Main from './components/main/Main';
//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
import { useRef } from 'react';

import { fetchYoutube } from './redux/youtubeSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//Menu 컴포넌트를 App새거 호출한 뒤 토글 객체를 각각 메이느 섭브 헤더로 전달해서 토글메뉴기능이 가능하도록

/*
	redux-toolkit의 작업흐름
	1.redux 폴더안쪽에 작업하려는 data의 slice 파일 생성 (data fetching후 액션객체 생성함수, 액션객체받아서 전역데이터 수정함수)
	2.index.js에서 slice값으로 연동된 데이터 store에 저장하고 App에 전달
	3.app.js에서 slice파일로부터 action객체 생성함수를 import후 호출하여 action만들고 dispatch로 전달
	4.원하는 컴포넌트에서 useSelector로 데이터 가져오기
*/
function App() {
	const menu = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchYoutube());
	}, [dispatch]);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />

			<Route path='/community' component={Community} />

			<Route path='/gallery' component={Gallery} />

			<Route path='/youtube' component={Youtube} />

			<Route path='/contact' component={Contact} />

			<Route path='/member' component={Member} />

			<Footer />

			<Menu ref={menu} />
		</>
	);
}

export default App;
