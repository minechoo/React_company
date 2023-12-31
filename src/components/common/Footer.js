import React from 'react';
import { useSelector } from 'react-redux';

function Footer() {
	const Department = useSelector((store) => store.department.data);
	return (
		<footer>
			<h1>DECODELAB</h1>
			<p>2023 DECODELAB &copy; ALL LIGHTS RESERVED</p>
			<p>{`This Company was founded by ${Department[0]?.name} in 2023`}</p>
		</footer>
	);
}

export default Footer;
