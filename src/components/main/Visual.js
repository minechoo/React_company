import { memo } from 'react';
import { useSelector } from 'react-redux';

function Visual() {
	console.log('visual');
	useSelector((store) => console.log(store));

	return (
		<figure id='visual' className='myScroll'>
			<video src={process.env.PUBLIC_URL + '/img/vid.mp4'} loop autoPlay muted></video>
		</figure>
	);
}

export default memo(Visual);
