// @flow
import React from 'react';
import {render} from 'react-dom';

import 'styles/styles.less';
import App from 'components/app';

const root = document.getElementById ('root');

if (root) {
	render (<App/>, root);
} else {
	throw new Error ('app root element missing');
}
