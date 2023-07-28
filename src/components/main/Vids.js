import { memo } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function BtnRolling() {
	const btnStart = useRef(null);
	const btnStop = useRef(null);
	const swiper = useSwiper();
	return (
		<nav className='controls'>
			<FontAwesomeIcon
				icon={faPlay}
				ref={btnStart}
				onClick={(e) => {
					swiper.autoplay.start();
					btnStart.current.classList.add('on');
					btnStop.current.classList.remove('on');
				}}
			/>
			<FontAwesomeIcon
				icon={faPause}
				ref={btnStop}
				onClick={(e) => {
					swiper.autoplay.stop();
					btnStop.current.classList.add('on');
					btnStart.current.classList.remove('on');
				}}
			/>
		</nav>
	);
}

function Vids() {
	const { data: Vids, isSuccess } = useYoutubeQuery();
	//console.log(data);
	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				loop={true}
				spaceBetween={30}
				slidesPerView={1}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				pagination={{ clickable: true }}
				navigation={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				<BtnRolling />
				{isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 5) return null;

						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</div>
									<h2>
										{vid.snippet.title.length >= 30 ? vid.snippet.title.substr(0, 30) + '...' : vid.snippet.title}
									</h2>
									<p>
										{vid.snippet.description.length >= 100
											? vid.snippet.description.substr(0, 100) + '...'
											: vid.snippet.description}
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
