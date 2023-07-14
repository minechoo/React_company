import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	console.log(Vids);

	return (
		<section id='vids' className='myScroll'>
			<ul>
				{Vids.map((vid, idx) => {
					if (idx <= 4) return null;
					return (
						<li key={vid.id}>
							<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default memo(Vids);
