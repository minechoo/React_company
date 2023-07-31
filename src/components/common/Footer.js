import { useDepartmentQuery } from '../../hooks/useDepartmentQuery';

function Footer() {
	const { data: Members, isSuccess } = useDepartmentQuery();
	return (
		<footer>
			<h1>DECODELAB</h1>
			<p>2023 DECODELAB &copy; ALL LIGHTS RESERVED</p>
			<p>{`This Company was founded by ${isSuccess && Members[0].name} in 2023`}</p>
		</footer>
	);
}

export default Footer;
