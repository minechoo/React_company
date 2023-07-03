import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Member() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		interest: false,
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		// 현재 입력하고 있는 input요소의 name,value값을 비구조할당으오 뽑아서 출력
		const { name, value } = e.target;
		//console.log(name, value);
		//기존 초기 Val state 값을 deep copy에서 현재 입력하고 있는 항목의 name 값과 value값으로 기존 state를 덮어쓰기해서 변경(불변성유지)
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
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

	const check = (value) => {
		//인수로 현재 state 값을 전달 받아서 항목별로 에러메시지를 객체로 반환하는 함수
		//반환되는 에러메시지가 있으면 인증실패
		//반환되는 에러메시지가 없으면 인증성공
		const errs = [];
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const psc = /[!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !psc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자이상, 영문, 숫자, 특수문자를 포함하세요';
		}

		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}

		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '8자글자이상 @를 포함하세요';
		}
		if (!value.gender) {
			errs.gender = '성별을 체크해주세요';
		}
		if (!value.interest) {
			errs.interest = '취미를 고르세요';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재스테이트값', Val);
		//check가 반환되는 인증메시지가 있으면 해당 메시지를 화면에 출력하고 전송중지
		//그렇지 않으면 인증성공
		console.log(check(Val));
		setErr(check(Val));
		setSubmit(true);
	};

	useEffect(() => {
		console.log(Val);
		//객체의 키값을 배열로 반환한다음 해당배열의 객수를 저장
		const len = Object.keys(Err).length;
		console.log(len);
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다');
		}
	}, [Err]);

	return (
		<Layout name={'Member'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USERID</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요'
										value={Val.userid}
										onChange={handleChange}
									/>
									<br />
									<p>{Err.userid && <p>{Err.userid}</p>}</p>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										value={Val.pwd1}
										onChange={handleChange}
									/>
									<br />
									<p>{Err.pwd1 && <p>{Err.pwd1}</p>}</p>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										value={Val.pwd2}
										onChange={handleChange}
									/>
									<br />
									<p>{Err.pwd2 && <p>{Err.pwd2}</p>}</p>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일주소를 입력하세요'
										value={Val.email}
										onChange={handleChange}
									/>
									<br />
									<p>{Err.email && <p>{Err.email}</p>}</p>
								</td>
							</tr>
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' id='male' value='male' onChange={handleRadio} />
									<label htmlFor='female'>Female</label>
									<input type='radio' name='gender' id='female' value='female' onChange={handleRadio} />
									<br />
									<p>{Err.gender && <p>{Err.gender}</p>}</p>
								</td>
							</tr>
							<tr>
								<th scope='row'>INTEREST</th>
								<td>
									<label htmlFor='music'>music</label>
									<input type='checkbox' name='interest' id='music' value='music' onChange={handleCheck} />
									<label htmlFor='dance'>dance</label>
									<input type='checkbox' name='interest' id='dance' value='dance' onChange={handleCheck} />
									<label htmlFor='book'>book</label>
									<input type='checkbox' name='interest' id='book' value='book' onChange={handleCheck} />
									<br />
									<p>{Err.interest && <p>{Err.interest}</p>}</p>
								</td>
							</tr>
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
