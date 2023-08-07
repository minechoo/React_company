import { useRef, useState } from 'react';

export const useDebounce = (value) => {
	const [DebounceVal, setDebounceVal] = useState(value);
	const eventBlocker = useRef(null);

	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		setDebounceVal(value);
	}, 400);

	return DebounceVal;
};
