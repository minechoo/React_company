import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	useSelector((store) => console.log(store));
	return <section id='vids' className='myScroll'></section>;
}

export default memo(Vids);
