import { useSelector } from 'react-redux';

function Footer() {
	const Members = useSelector((store) => store.memberReducer.members);
	return (
		<footer>
			<h1>DECODELAB</h1>
			<p>2023 DECODELAB &copy; ALL LIGHTS RESERVED</p>
			<p>{`This Institude was established by ${Members[0]?.name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
