import { memo } from 'react';
function Visual() {
	console.log('visual');
	return (
		<figure id='visual' className='myScroll'>
			<video src={process.env.PUBLIC_URL + '/img/vid.mp4'} loop autoPlay muted></video>
		</figure>
	);
}

export default memo(Visual);
