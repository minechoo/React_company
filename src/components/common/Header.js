import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

function Header({ type }) {
	// const active = { color: 'aqua' };
	const active = 'on';
	return (
		//prop으로 전달되는 type값을 header의 class명으로 지칭해서 스타일 분기처리
		<header className={type}>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='/department' activeClassName={active}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={active}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={active}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={active}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={active}>
						contact
					</NavLink>
				</li>
				<li>
					<NavLink to='/member' activeClassName={active}>
						Member
					</NavLink>
				</li>
			</ul>

			<FontAwesomeIcon icon={faBars} />
		</header>
	);
}

export default Header;