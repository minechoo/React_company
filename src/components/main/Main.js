import React from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';

import { useState } from 'react';
import Btns from './Btns';
/*
	Prop drilling
	- 특정 값을 자식 컴포넌트에게 전달하기 위해서 불필요하게 많은 중간 컴포넌트들이 값을 전달목적으로 쓰이는 경우
	Redux
	위와 같은 prop drilling을 방지하기 위해서 복잡하게 컴포넌트를 통해 전달할 값을 prop아닌 컴포넌트외부에 데이터 전용 객체를 만들어서 어떤 위치의 컴포넌트에서든 편하게 값을 가져오고 수정할 수 있게 만든 전역 데이터 체계
*/

function Main({ menu }) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);
	return (
		<main>
			{/* 미션 -  Btns컴포넌트에서 만들어진 scroll값을 Pics컴포넌트에 전달하는 방법 고민 */}
			{/* 미션 답안 - 부모요소에 State와 State변경함수를 만들고 값을 전달해야 되는 자식 컴포넌트에는 State변경함수를, 값을 받아야 되는 자식 컴포넌트에는 State값을 prop으로 전달 */}
			<Header type={'main'} menu={menu} />
			<Visual />
			<News />
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
