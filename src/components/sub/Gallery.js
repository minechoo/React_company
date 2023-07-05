import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const [Items, setItems] = useState([]);

	const getFlicker = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '86fbba2c96b5252a51879bc23af1f41e';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 50;
		let url = '';
		//const myId = '194260994@N06';

		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);
	};

	//미션1 - 아래 호출문으로 풍경이미지 검색되도록 함수 코드 수정
	//getFlickr({type: 'search', tags: 'landscape'})

	//미션2 - 아래 호출문으로 내 계정의 이미지 갤러리 호출되도록
	//getFlickr({type: 'user', user: '내아이디'})
	//useEffect(() => getFlicker({ type: 'user', user: '194260994@N06' }), []);
	useEffect(() => getFlicker({ type: 'interest' }), []);

	return (
		<Layout name={'Gallery'}>
			<>
				<div className='searchBox'>
					<div className='search'>
						<label htmlFor='search'></label>
						<input type='text' id='search' name='' placeholder='검색어입력' />
						<button className='btn_search'>Search</button>
					</div>

					<div className='btnSet'>
						<button className='btnInterest'>Interest Gallery</button>
						<button className='btnMine'>My Gallery</button>
					</div>
				</div>

				<div className='frame'>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title === '' ? 'Have a good day!!' : item.title}</h2>

										<div class='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span className='userid'>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</>
		</Layout>
	);
}

export default Gallery;
