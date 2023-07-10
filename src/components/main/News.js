import { useEffect, useState } from 'react';
import { memo } from 'react';

function News() {
	const dummy = [
		{ title: 'Hello6', content: 'Here comes description in detail' },
		{ title: 'Hello5', content: 'Here comes description in detail' },
		{ title: 'Hello4', content: 'Here comes description in detail' },
		{ title: 'Hello3', content: 'Here comes description in detail' },
		{ title: 'Hello2', content: 'Here comes description in detail' },
		{ title: 'Hello1', content: 'Here comes description in detail' },
	];
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};
	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<section id='news' className='myScroll'>
			{Posts.map((post, idx) => {
				if (idx >= 4) return null;
				return (
					<article key={idx}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default memo(News);
