import { useRef, useEffect, useState, useCallback } from 'react';
import Anime from '../../asset/anime';

function Btns({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef([]);
	const [Num, setNum] = useState(0);

	const getPos = useCallback(() => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	}, [setScrolled]);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		//리액트는 SPA이기 때문에 페이지가 변경된다고 하더라도 스크롤 위치값이 초기화 되지 않으므로 마운트시마다 스크롤값을 초기화함
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, [getPos, activation]);

	/*
		eslint가 의존성 배열에 activation, getPos함수를 등록하라고 권고문구를 띄우는 이유
		- useEffect내부에서 getPos, activation이라는 외부 함수를 사용하고 있으므로 리액트 입장에서는 해당 변경될 수도 있는 점을 대비해 의존성배열에 등록할 것을 권고

		- 이때 권고사항에 따라 activation, getPos를 의존성배열에 등록하면 해당 컴포넌트가 업데이트 될때마다 해당 함수에서 변경되는 점이 없음에도 불구하고 계속 호출하면서 무한루프에 빠짐

		- 추후 useCallback, useMemo를 이용해서 컴포넌트 내부에 있는 특정 함수 혹은 특정 리턴값을 강제로 메모리에 저장해서 다음번 렌더링사이클에서는 같은 함수와 같은 리턴값을 매번 연산하지 않도록 처리 (Memoization) 
		
		- 메모리 점유율을 늘려서 성능을 올리는 방식
		- 메모리를 강제로 많이 점유하면 메모이제이션 처리된 값들은 자스엔진 내부적으로 garbage-collection에서 제외됨 (성능면에서 약영향 미칠 수 있음)
	*/

	return (
		<ul className='btnNavi' ref={btnRef}>
			{/* 현재 세로 위치값이 담겨있는 배열의 갯수로 빈배열 동적으로 생성하고 버튼 반복처리 */}
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';
					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
