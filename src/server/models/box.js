// @flow
import BaseModel from './';
import Schema from '../schemas/box';

const Name: string = 'Box';

export const toJSON = BaseModel.toJSON;

class BoxModel extends BaseModel {}

export default new BoxModel ({Name, Schema});