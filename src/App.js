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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

//Menu 컴포넌트를 App새거 호출한 뒤 토글 객체를 각각 메이느 섭브 헤더로 전달해서 토글메뉴기능이 가능하도록

function App() {
	const dispatch = useDispatch();
	const menu = useRef(null);

	useEffect(() => {
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.DEPARTMENT.start });
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', user: '194260994@N06' } });
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
