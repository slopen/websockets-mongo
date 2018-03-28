// @flow
import express from 'express';
import boxes from './boxes';


export default express.Router ()

	.use ('/boxes', boxes);