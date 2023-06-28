import React from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';

import { useRef, useEffect } from 'react';
import Btns from './Btns';

function Main() {
	return (
		<main>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Banner />
			<Btns />
		</main>
	);
}

export default Main;
