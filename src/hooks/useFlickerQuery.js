import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchFlickr = async ({ queryKey }) => {
	const opt = queryKey[1];
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '86fbba2c96b5252a51879bc23af1f41e';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 50;
	let url = '';
	//const myId = '194260994@N06';

	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	const response = await axios.get(url);
	return response.data.photos.photo;
};

export const useFlickrQuery = (opt) => {
	return useQuery(['flickrData', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};
