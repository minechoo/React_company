import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	console.log(Vids);

	return (
		<section id='vids' className='myScroll'>
			Vids
		</section>
	);
}

export default memo(Vids);
