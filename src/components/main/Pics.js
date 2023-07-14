//import { library } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	const { flickr } = useSelector((store) => store.flickrReducer);
	console.log(flickr);
	// const currentPos = Scrolled - Pos;
	// console.log(Scrolled);
	// const base = window.innerHeight / 2;
	// const modified = currentPos + base;

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
			<ul>
				{flickr.map((pic, idx) => {
					if (idx <= 4) return null;
					return (
						<li key={pic.id}>
							<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
