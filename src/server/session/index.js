// @flow
import express from 'express';
import type {$Request, $Response, NextFunction} from 'express'

const isAuthenticated = () => true;

const ensureAuthenticated = (
	req: $Request,
	res: $Response,
	next: NextFunction
) => {
	if (isAuthenticated ()) {
		next ();
	} else {
		res.status (401).json ({
			error: '401',
			message: 'authentication required'
		});
	}
}

export default express.Router ()

	.use ('*', ensureAuthenticated, (
		req: $Request,
		res: $Response,
		next: NextFunction
	) => next ());
