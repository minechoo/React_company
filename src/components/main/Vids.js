import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const youtube = useSelector((store) => store.youtubeReducer.youtube);
	console.log(youtube);
	return (
		<section id='vids' className='myScroll'>
			{youtube.map((vid, idx) => {
				if (idx >= 4) return null;
				return <img key={vid.id} src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />;
			})}
		</section>
	);
}
export default memo(Vids);
