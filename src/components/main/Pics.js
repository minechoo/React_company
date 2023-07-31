import { useFlickrQuery } from '../../hooks/useFlickerQuery';

function Pics({ Scrolled, Pos }) {
	const { data, isSuccess } = useFlickrQuery({ type: 'user', user: '194260994@N06' });
	console.log(data);
	//const currentPos = Scrolled - Pos;
	// console.log(Scrolled);
	//const base = window.innerHeight / 2;
	//const modified = currentPos + base;
	return (
		<section id='pics' className='myScroll'>
			{/* <h1 style={{ transform: `translateX(${currentPos}px)` }}>FLICKR</h1>
			<article
				style={{
					transform: `translate(-50%, -50%) rotate(${Scrolled >= Pos - base ? modified : 0}deg) scale(${
						Scrolled >= Pos - base ? 1 + modified / 500 : 1
					}) `,
					opacity: `${Scrolled >= Pos - base ? 1 - modified / 500 : 1}`,
				}}
			></article> */}
		</section>
	);
}

export default Pics;
