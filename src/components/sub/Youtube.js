import Layout from '../common/Layout';
//import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';

function Youtube() {
	const modal = useRef(null);
	// const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);
	const Vids = useSelector((store) => store.youtubeReducer.youtube);

	// const fetchYoutube = async () => {
	// 	const key = 'AIzaSyANMdnk7q2cBX8tqGJZXpVFH9bGJMOwmEc'; //api 키
	// 	const list = 'PLMafzyXZ12TPBYgeplFEdJeSMcJvb3v5u'; //class 브라우저 상단값
	// 	const num = 10;
	// 	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	// 	const result = await axios.get(url);
	// 	setVids(result.data.items);
	// };

	// useEffect(() => {
	// 	fetchYoutube();
	// }, []);
	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					return (
						<article key={idx}>
							<h2>{vid.snippet.title.length > 50 ? vid.snippet.title.substr(0, 50) + '...' : vid.snippet.title}</h2>
							<div className='txt'>
								<p>
									{vid.snippet.description.length > 200
										? vid.snippet.description.substr(0, 200) + '...'
										: vid.snippet.description}
								</p>
								<span>{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
							<div
								className='pic'
								onClick={() => {
									modal.current.open();
									// 썸네일 클릭시 현재 클릭한 요수의 순번값으로 Index state 값 변경
									setIndex(idx);
								}}
							>
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal}>
				{/* 첫 랜더링 싸이클에서는 Vids[0]의 객체값 자체가 없으므로 업는 요소의 id값 호출오류 */}
				{/* 옵셔널 체이닝은 객체에서만 */}
				<iframe
					title={Vids[Index]?.id}
					src={`https://youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
