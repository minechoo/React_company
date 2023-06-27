import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Department() {
	const [Members, setMembers] = useState([]);
	console.log(Members);
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			// console.log(data.data.members);
			setMembers(data.data.members);
		});
	}, []);
	return (
		<Layout name={'Department'}>
			{Members.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
