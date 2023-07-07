import { forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});
	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobilePanel'
					initial={{ opacity: 0, x: '-100%' }}
					animate={{ opacity: 1, x: '0%', transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: '-100%', transition: { duration: 0.5 } }}
				>
					<h1>LOGO</h1>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
