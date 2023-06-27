function Visual() {
	return (
		<figure id='visual'>
			<video src={process.env.PUBLIC_URL + '/img/vid.mp4'} loop autoPlay muted></video>
		</figure>
	);
}

export default Visual;
