import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';
import { useHistory } from 'react-router-dom';

function Member() {
	const selectEl = useRef(null);
	const radioGroup = useRef(null);
	const checkGroup = useRef(null);
	const history = useHistory();
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		interests: false,
		edu: null,
		comments: '',
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		//현재 입력하고 있는 input요소의 name,value값을 비구조화할당으로 뽑아서 출력
		const { name, value } = e.target;
		//기존 초기 Val State값을 deep copy해서 현재 입력하고 있는 항목의 name값과 value값으로 기존 State를 덮어쓰기 해서 변경 (불변성 유지)
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		console.log(e.target.value);
		setVal({ ...Val, [name]: checked });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		//모든 체크박스를 반복돌면서 하나라도 체크되어 있는게 있으면 true값 반환
		inputs.forEach((el) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	const handleSelect = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재 스테이트값', Val);
		//check가 반환하는 인증 메세지가 있으면 해당 메세지를 화면에 출력하고 전송중지
		//그렇지 않으면 인증 성공
		console.log(check(Val));
		setErr(check(Val));
		setSubmit(true);
	};

	const check = (value) => {
		//인수로 현재 State값을 전달받아서 항목별로 에러메세지를 객체로 반환하는 함수
		//반환되는 에러메세지가 있으면 인증 실패
		//반환되는 에러메세지가 없으면 인증 성공
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일주소는 8글자 이상 @를 포함하세요.';
		}
		if (!value.gender) {
			errs.gender = '성별을 체크해주세요.';
		}
		if (!value.interests) {
			errs.interests = '관심사를 하나 이상 체크하세요.';
		}
		if (value.edu === '') {
			errs.edu = '최종학력을 선택하세요.';
		}
		if (value.comments.length < 10) {
			errs.comments = '남기는 말을 최소 10글자 이상 입력하세요.';
		}
		return errs;
	};

	const resetForm = () => {
		const select = selectEl.current.options[0];
		const checks = checkGroup.current.querySelectorAll('input');
		const radios = radioGroup.current.querySelectorAll('input');
		select.selected = true;
		checks.forEach((el) => (el.checked = false));
		radios.forEach((el) => (el.checked = false));
		setVal(initVal);
	};

	useEffect(() => {
		//객체의 키값을 배열로 반환한다음 해당 배열의 갯수를 저장
		//len값이 0이면 Err객체에 에러메시지가 하나도 없어서 인증통과 처리
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
			//history.push('/');
			resetForm();
		}
	}, [Err]);

	return (
		<Layout name={'Member'}>
			<button onClick={() => history.goBack()}>뒤로 가기</button>

			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							{/* user id */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요'
										onChange={handleChange}
										value={Val.userid}
									/>
									<br />
									{Err.userid && <p>{Err.userid}</p>}
								</td>
							</tr>

							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>

								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
										value={Val.pwd1}
									/>
									<br />
									{Err.pwd1 && <p>{Err.pwd1}</p>}
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
										value={Val.pwd2}
									/>
									<br />
									{Err.pwd2 && <p>{Err.pwd2}</p>}
								</td>
							</tr>

							{/* e-mail */}
							<tr>
								<th>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일주소를 입력하세요'
										onChange={handleChange}
										value={Val.email}
									/>
									<br />
									{Err.email && <p>{Err.email}</p>}
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th>GENDER</th>
								<td ref={radioGroup}>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' value='male' id='mail' onChange={handleRadio} />

									<label htmlFor='female'>FeMale</label>
									<input type='radio' name='gender' value='female' id='female' onChange={handleRadio} />
									<br />
									{Err.gender && <p>{Err.gender}</p>}
								</td>
							</tr>

							{/* interest */}
							<tr>
								<th>INTERESTS</th>
								<td ref={checkGroup}>
									<label htmlFor='music'>Music</label>
									<input type='checkbox' name='interests' value='music' id='music' onChange={handleCheck} />

									<label htmlFor='reading'>Reading</label>
									<input type='checkbox' name='interests' value='reading' id='reading' onChange={handleCheck} />

									<label htmlFor='game'>Game</label>
									<input type='checkbox' name='interests' value='game' id='game' onChange={handleCheck} />
									<br />
									{Err.interests && <p>{Err.interests}</p>}
								</td>
							</tr>

							{/* education */}
							<tr>
								<th>
									<label htmlFor='edu'>EDUCATION</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect} ref={selectEl}>
										<option value=''>최종학력을 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									{Err.edu && <p>{Err.edu}</p>}
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th>
									<label htmlFor='comments'>Leave Message</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='3'
										value={Val.comments}
										onChange={handleChange}
									></textarea>
									<br />
									{Err.comments && <p>{Err.comments}</p>}
								</td>
							</tr>

							{/* btn set */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' onClick={() => setVal(initVal)} />
									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Member;
