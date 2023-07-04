import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('내용을 입력하세요');
		}
		setPosts([...Posts, { title: input.current.value, content: textarea.current.value }]);
		resetForm();
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<button onClick={resetForm}>cancel</button>
				<button onClick={createPost}>write</button>
			</div>
		</Layout>
	);
}

export default Community;

/*
Create - 데이터 저장(게시글 저장)
Read - 데이터 호출 (기시글 보기)
Update - 데이터 수정( 게시글 수정)
Delete - 데이터 삭제(게시글 삭제)

Restful api 
localStorage : 모든 브라우저마다 가지고 있는 경량의 데이터 베이스(문자열 저장)
*/
