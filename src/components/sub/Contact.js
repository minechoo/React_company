import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Contact() {
	//지도가 들어갈 프레임도 가상요소 참조를 위해 useRef로 참조객체생성
	const container = useRef(null);
	//일반 HTML버전과는 달리 윈도우객체에서 직접 kakao 상의 객체값을 뽑아옴
	const { kakao } = window;
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	useEffect(() => {
		const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`, // 마커이미지의 주소입니다
			imageSize = new kakao.maps.Size(232, 99), // 마커이미지의 크기입니다
			imageOption = { offset: new kakao.maps.Point(116, 99) };
		const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
		//인스턴스 호출구문은 컴포넌트 처음 마운트시 호출
		const mapInstance = new kakao.maps.Map(container.current, option);
		const marker = new kakao.maps.Marker({
			position: option.center,
			image: markerImage,
		});

		marker.setMap(mapInstance);
	}, []);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Contact;
