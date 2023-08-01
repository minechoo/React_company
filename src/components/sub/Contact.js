import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../hooks/useThrottle';

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
	const info = useRef([
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
	]);
	//아래 5개 변수값들은 useEffect 구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect 바깥에 배치

	//marker의 정보값을 useMemo로 메모이제이션 해야 되는 이유
	//해당 정보값이 바뀌지않는 static한 값이 아니고 State에 의해서 계속 변경되는 값이기 때문에
	//내부에 index State값이 바뀔때마 임시로 메모이제이션을 풀기 위해서 useMemo에 Index State를 의존성 배열에 등록해야 되기 때문
	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(
				info.current[Index].imgSrc,
				info.current[Index].imgSize,
				info.current[Index].imgPos
			),
		});
	}, [Index, kakao]);

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

	const setCenter = useCallback(() => {
		console.log('setCenter');
		Location?.setCenter(info.current[Index].latlng);
	}, [Index, Location]);

	//커스텀훅은 다른 hook안쪽에서 호출이 불가능하므로
	//useThrottle을 활용해야 되는 함수가 useEffect안쪽에 있다면
	//밖으로 꺼내서 useThrottle적용한다음 또다른 useEffect안쪽에서 이벤트 연결
	const setCenter2 = useThrottle(setCenter);

	useEffect(() => {
		container.current.innerHTML = '';
		//인스턴스 호출구문은 컴포넌트 처음 마운트시 호출
		const mapInstance = new kakao.maps.Map(container.current, { center: info.current[Index].latlng, level: 3 });

		marker.setMap(mapInstance);

		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

		setLocation(mapInstance);

		mapInstance.setZoomable(false);
	}, [Index, kakao, marker]);

	useEffect(() => {
		window.addEventListener('resize', setCenter2);
		return () => window.removeEventListener('resize', setCenter2);
	}, [setCenter2]);

	useEffect(() => {
		//Location state에 담겨있는 앱 인스턴스로부터 traffic레이어 호출구문처리
		//첫 랜더링 사이클에서는 Location 값이 null이므로 Optionl Changing 을 활용해서 해당값이 담기는 두번째 랜더링 사이클부터 동작하도록 처리
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	return (
		<Layout name={'Contact'} bg={`Location.jpg`}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic on' : 'Traffic off'}</button>
			<ul className='branch'>
				{info.current.map((el, idx) => {
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
