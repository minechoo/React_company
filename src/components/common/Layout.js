import { useEffect, useRef } from 'react';
import React from 'react';

function Layout({ name, children, txt = 'Defalut', bg }) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);
	return (
		<section className={`content ${name}`} ref={frame}>
			<figure style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${bg})` }}></figure>

			<div className='inner'>
				<h1>{name}</h1>
				<h2>
					{/* 해당 구분자로 문자값을 배열로 분리하고 반복을 돌면서 b태그 추가: 이때 주의할점 : 반복도는 요소이므로 key속성을 적용하기 위해서는 React.Fragement형태로 wrapping처리 */}
					{txt.split('-').map((el, idx) => {
						return (
							<React.Fragment key={idx}>
								{el}
								<br />
							</React.Fragment>
						);
					})}
				</h2>
				{children}
			</div>
		</section>
	);
}

export default Layout;
