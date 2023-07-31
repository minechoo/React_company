import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//menuSlice 로 부터 전역 state 값을 변경해주는 close 함수 import
import { close } from '../../redux/menuSlice';
import { useEffect } from 'react';

function Menu() {
	const active = { color: 'aqua' };
	const dispatch = useDispatch();
	const menu = useSelector((store) => store.menu.open);

	//브라우저 resize시 1200 넘으면 닫히기
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) dispatch(close());
		});
	}, [dispatch]);

	return (
		<AnimatePresence>
			{menu && (
				<motion.nav
					id='mobilePanel'
					initial={{ opacity: 0, x: '-100%' }}
					animate={{ opacity: 1, x: '0%', transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: '-100%', transition: { duration: 0.5 } }}
					//닫기버튼 클릭시 전역 state를 변경하는 close함수를 호출해서 그 결과값인 action객체를 dispatch로 전달
					onClick={() => dispatch(close())}
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>
					<ul id='gnbMo'>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/member' activeStyle={active}>
								Member
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
