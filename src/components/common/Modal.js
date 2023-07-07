import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		//컴포넌트 언마운트시 모션효과가 끝날때까지 언마운트를 자동 지연시켜줌
		<AnimatePresence>
			{Open && (
				//모션은 걸고 싶은 컴포넌트에 motion 지정, initial(모션시작), animate(모션완료), exit(사라지는 모션) 속성 지정
				//x(가로축), y(세로축), rotate(회전), scale(확대축소)
				<motion.aside
					className='modal'
					ref={ref}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, transition: { duration: 4 } }}
				>
					<div className='con'>{props.children}</div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;

/*
useRef의 참조객체연결은 JSX는 가능하나 사용자가 직접 만든 컴포넌트는 불가
-해결방법은 참조하려고 하는 컴포넌트 내부에서 forwardRef를 이용하여 
-자기자신을 참조객체를 연결해서 부모에게 역으로전달처리

forwardRef
-자식 컴포넌트의 요소를 호출하는 부모컴포넌트에 역으로 참조해서 전달

useImperaltiveHandle
-자식 컴포넌트가 아닌 특정 커스텀 객체를 부모로 전달
-forwardRef안쪽에서만 활용가능
*/
