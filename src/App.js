import { Route, Switch } from 'react-router-dom';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
// main
import Main from './components/main/Main';
//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />

			<Route path='/community' component={Community} />

			<Route path='/gallery' component={Gallery} />

			<Route path='/youtube' component={Youtube} />

			<Route path='/contact' component={Contact} />

			<Route path='/member' component={Member} />

			<Footer />
		</>
	);
}

export default App;
