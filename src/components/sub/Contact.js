import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Contact() {
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	//지도가 들어갈 프레임도 가상요소 참조를 위해 useRef로 참조객체생성
	const container = useRef(null);
	//일반 HTML버전과는 달리 윈도우객체에서 직접 kakao 상의 객체값을 뽑아옴
	const { kakao } = window;
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};
	//아래 5개 변수값들은 useEffect 구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect 바깥에 배치
	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`; // 마커이미지의 주소입니다
	const imageSize = new kakao.maps.Size(232, 99); // 마커이미지의 크기입니다
	const imageOption = { offset: new kakao.maps.Point(116, 99) };
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	useEffect(() => {
		//인스턴스 호출구문은 컴포넌트 처음 마운트시 호출
		const mapInstance = new kakao.maps.Map(container.current, option);

		marker.setMap(mapInstance);
		//지역변수의 mapInstance값을 다른 함수에서도 활용해야 되므로 Location state에 해당 인스턴스 값 지정
		setLocation(mapInstance);
	}, []);

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
		</Layout>
	);
}

export default Contact;
