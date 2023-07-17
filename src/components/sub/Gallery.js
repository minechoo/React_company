import Layout from '../common/Layout';
import Modal from '../common/Modal';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../redux/flickrSlice';

function Gallery() {
	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickr.data);
	const openModal = useRef(null);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const counter = useRef(0);
	const firstLoaded = useRef(true);

	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	//새롭게 data fetching이 실행되면 참조객체에 담겨있는 카운터 값을 다시 0으로 초기화
	//useRef로 참조한 값은 컴포넌트가 재실행되더라도 일반 변수처럼 초기화되는 것이 아니라 직접 초기화해야됨
	// let counter = 0;
	// // counter.current = 0;
	// const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	// const key = '86fbba2c96b5252a51879bc23af1f41e';
	// const method_interest = 'flickr.interestingness.getList';
	// const method_user = 'flickr.people.getPhotos';
	// const method_search = 'flickr.photos.search';
	// const num = 50;
	// let url = '';
	// //const myId = '194260994@N06';

	// if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	// if (opt.type === 'search')
	// 	url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	// if (opt.type === 'user')
	// 	url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	// const result = await axios.get(url);

	// }, []);

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
		dispatch(fetchFlickr({ type: 'interest' }));
		isUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		dispatch(fetchFlickr({ type: 'user', user: '194260994@N06' }));
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요');

		if (!enableEvent.current) return;
		resetGallery(e);
		dispatch(fetchFlickr({ type: 'search', tags: tag }));
		searchInput.current.value = '';
		isUser.current = false;
	};

	useEffect(() => {
		console.log(Items);
		counter.current = 0;
		if (Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			dispatch(fetchFlickr({ type: 'user', user: '194260994@N06' }));
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}
		firstLoaded.current = false;
		const imgs = frame.current.querySelectorAll('img');

		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	}, [Items, dispatch]);

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
							<button className='btnInterest' onClick={showInterest}>
								Interest Gallery
							</button>
							<button className='btnMine on' onClick={showMine}>
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
													openModal.current?.open();
													setIndex(idx);
													console.log(openModal);
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
														dispatch(fetchFlickr({ type: 'user', user: e.target.innerText }));
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
