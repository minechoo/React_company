import Layout from '../common/Layout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const openModal = useRef(null);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);

	//const counter = useRef(0);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);

	const getFlickr = async (opt) => {
		//새롭게 data fetching이 실행되면 참조객체에 담겨있는 카운터 값을 다시 0으로 초기화
		//useRef로 참조한 값은 컴포넌트가 재실행되더라도 일반 변수처럼 초기화되는 것이 아니라 직접 초기화해야됨
		let counter = 0;
		// counter.current = 0;
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
		if (result.data.photos.photo.length === 0) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[0].classList.add('on');
			getFlickr({ type: 'interest' });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다');
		}
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);

		//외부데이터가 State에 담기고 DOM이 생성되는 순간
		//모든 img요소를 찾아서 반복처리
		const imgs = frame.current.querySelectorAll('img');

		imgs.forEach((img) => {
			//이미지요소에 load이벤트가 발생할때 (소스이미지까지 로딩이 완료될떄마다)
			img.onload = () => {
				//내부적으로 카운터값을 1씩 증가
				++counter;

				//임시방편 - 전체 이미지 갯수가 하나 모잘라도 출력되게 수정
				//문제점 - myGallery, interestGallery는 전체 이미지 카운트가 잘 되는데 특정 사용자 갤러리만 갯수가 1씩 모자라는 현상
				if (counter === imgs.length - 2) {
					//로더 제거하고 이미지 갤러리 보임처리
					setLoader(false);
					frame.current.classList.add('on');
					//모션중 재이벤트 방지시 모션이 끝날때까지 이벤트를 방지를 시켜도
					//모션이 끝나는순간에도 이벤트가 많이 발생하면 특정값이 바뀌는 순간보다 이벤트가 더 빨리들어가서 오류가 발생가능
					//해결방법 - 물리적으로 이벤트 호출을 지연시켜서 마지막에 발생한 이벤트만 동작처리 (debouncing)
					//단시간에 많이 발생하는 이벤트시 함수 호출을 줄이는 방법
					//debouncing: 이벤트 발생히 바로 호출하는게 아닌 일정시간 텀을 두고 마지막에 발생한 이벤트만 호출
					//throttling: 이벤트 발생시 호출되는 함수자체를 적게 호출

					enableEvent.current = true;
				}
			};
		});
	};

	//기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'user', user: '194260994@N06' });
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요');

		if (!enableEvent.current) return;
		resetGallery(e);
		getFlickr({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	//미션1 - 아래 호출문으로 풍경이미지 검색되도록 함수 코드 수정
	//getFlickr({type: 'search', tags: 'landscape'})

	//미션2 - 아래 호출문으로 내 계정의 이미지 갤러리 호출되도록
	//getFlickr({type: 'user', user: '내아이디'})
	// useEffect(() => getFlickr({ type: 'user', user: '194260994@N06' }), []);
	useEffect(() => getFlickr({ type: 'interest' }), []);

	return (
		<>
			<Layout name={'Gallery'}>
				<>
					<div className='searchBox'>
						<div className='search'>
							<label htmlFor='search'></label>
							<input
								type='text'
								id='search'
								name=''
								defaultValue=''
								placeholder='검색어를 입력하세요'
								ref={searchInput}
								onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
							/>
							<button className='btn_search' onClick={showSearch}>
								Search
							</button>
						</div>

						<div className='btnSet' ref={btnSet}>
							<button className='btnInterest on' onClick={showInterest}>
								Interest Gallery
							</button>
							<button className='btnMine' onClick={showMine}>
								My Gallery
							</button>
						</div>
					</div>

					<div className='frame' ref={frame}>
						<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
							{Items.map((item, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<div
												className='pic'
												onClick={() => {
													openModal.current.open();
													setIndex(idx);
												}}
											>
												<img
													src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
													alt={item.title}
												/>
											</div>
											<h2>{item.title === '' ? 'Have a good day!!' : item.title}</h2>

											<div className='profile'>
												<img
													src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
													alt={item.owner}
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
												<span
													className='userid'
													onClick={(e) => {
														if (isUser.current) return;
														isUser.current = true;
														setLoader(true);
														frame.current.classList.remove('on');
														getFlickr({ type: 'user', user: e.target.innerText });
													}}
												>
													{item.owner}
												</span>
											</div>
										</div>
									</article>
								);
							})}
						</Masonry>
					</div>
					{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
				</>
			</Layout>

			<Modal ref={openModal}>
				<img
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
