import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const [Index, setIndex] = useState(0);
	const [Success, setSuccess] = useState(false);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const inputMessage = useRef(null);
	//지도가 들어갈 프레임도 가상요소 참조를 위해 useRef로 참조객체생성
	const container = useRef(null);
	//일반 HTML버전과는 달리 윈도우객체에서 직접 kakao 상의 객체값을 뽑아옴
	const { kakao } = window;
	const info = [
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];
	const option = {
		center: info[Index].latlng, // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};
	//아래 5개 변수값들은 useEffect 구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect 바깥에 배치
	const imageSrc = info[Index].imgSrc; // 마커이미지의 주소입니다
	const imageSize = info[Index].imgSize; // 마커이미지의 크기입니다
	const imageOption = info[Index].imgPos;
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	//email
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_gvvhk36', 'template_dtqpmbl', form.current, 'J8tG7AbQZVM2JAujR').then(
			(result) => {
				console.log(result.text);
				setSuccess(true);
				inputName.current.value = '';
				inputEmail.current.value = '';
				inputMessage.current.value = '';
			},
			(error) => {
				console.log(error.text);
				setSuccess(false);
			}
		);
	};
	//email
	useEffect(() => {
		container.current.innerHTML = '';
		//인스턴스 호출구문은 컴포넌트 처음 마운트시 호출
		const mapInstance = new kakao.maps.Map(container.current, option);

		marker.setMap(mapInstance);

		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

		//setCenter가 호출시 내부적으로 Index State 값에 의존하기때문에
		//useEffect안쪽에서 setCenter함수를 정의하고 호출
		const setCenter = () => {
			mapInstance?.setCenter(info[Index].latlng);
		};
		//지역변수의 mapInstance값을 다른 함수에서도 활용해야 되므로 Location state에 해당 인스턴스 값 지정
		window.addEventListener('resize', setCenter);
		setLocation(mapInstance);

		mapInstance.setZoomable(false);

		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		//Location state에 담겨있는 앱 인스턴스로부터 traffic레이어 호출구문처리
		//첫 랜더링 사이클에서는 Location 값이 null이므로 Optionl Changing 을 활용해서 해당값이 담기는 두번째 랜더링 사이클부터 동작하도록 처리
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic on' : 'Traffic off'}</button>
			<ul className='branch'>
				{info.map((el, idx) => {
					return (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					);
				})}
			</ul>

			<div className='formBox'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='user_name' ref={inputName} />
					<label>Email</label>
					<input type='email' name='user_email' ref={inputEmail} />
					<label>Message</label>
					<textarea name='message' />
					<input type='submit' value='Send' ref={inputMessage} />
				</form>
				{Success && <p>메일이 성공적으로 발송되었습니다</p>}
			</div>
		</Layout>
	);
}

export default Contact;