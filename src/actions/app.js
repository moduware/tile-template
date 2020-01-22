/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';

export const navigate = (path) => (dispatch) => {
	const page = path === '/' ? 'home-page' : path.slice(1);
	dispatch(loadPage(page));
};

const loadPage = (page) => (dispatch) => {
	switch (page) {
		case 'home-page':
			import('../components/home-page.js').then((module) => {
				// Put code in here that you want to run every time when
				// navigating to view1 after my-view1.js is loaded.
			});
			break;
		case 'page-one':
			import('../components/page-one.js');
			break;
		case 'page-two':
			import('../components/page-two.js');
			break;
		default:
			page = 'error-page';
			import('../components/error-page.js');
	}

	dispatch(updatePage(page));
};

const updatePage = (page) => {
	return {
		type: UPDATE_PAGE,
		page
	};
};

export const headerBackButtonClicked = () => (dispatch, getState) => {
	console.log('Webview header back button clicked!');
	if (Moduware) {
		if (getState().app.page === 'page-one' || getState().app.page === 'page-two' || getState().app.page === 'error-page') {
			dispatch(navigate('/home-page'))
		} else {
			Moduware.API.Exit();
		}
	}
};
