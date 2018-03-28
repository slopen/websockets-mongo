// @flow
import express from 'express';
import Box, {toJSON} from '../models/box';

import type {
    $Request,
    $Response
} from 'express';

import type {
	JsonDoc
} from '../models';

type RequestWithBody = {body: JsonDoc} & $Request;


export default express.Router ()

	.post ('/', async ({body}: RequestWithBody, res: $Response) =>
		res.json (toJSON (
			await Box.create (body)
		))
	)

	.get ('/', async (req: $Request, res: $Response) =>
		res.json (toJSON (
			await Box.find ()
		))
	)

	.get ('/:id', async ({params}: $Request, res: $Response) =>
		res.json (toJSON (
			await Box.findById (params.id)
		))
	)

	.put ('/:id', async ({params, body}: RequestWithBody, res: $Response) =>
		res.json (toJSON (
			await Box.update (params.id, body)
		))
	)

	.delete ('/:id', async ({params}: $Request, res: $Response) =>
		res.json (toJSON (
			await Box.delete ({_id: params.id})
		))
	);