import { useSelector } from 'react-redux';

function Footer() {
	const President = useSelector((store) => store.memberReducer.members[0].name);
	return (
		<footer>
			<h1>DECODELAB</h1>
			<p>2023 DECODELAB &copy; ALL LIGHTS RESERVED</p>
			<p>{`This Institude was established by ${President} in 1995`}</p>
		</footer>
	);
}

export default Footer;
