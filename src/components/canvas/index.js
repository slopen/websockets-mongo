// @flow
import React, {Component} from 'react';

import Box from './box';
import type {Coords} from './box';
import type {Box as BoxType} from './list/adapter';

import List from './list';
import Adapter from './list/adapter/websockets';

type Props = {};
type State = {data?: BoxType[]};

const AddButton = ({onClick}) =>
	<a href="#"
		className="action add"
		onClick={(e: MouseEvent) => {
			onClick ();
			e.preventDefault ();
		}}>
		<i className="fa fa-plus"/>
	</a>


export default class CanvasComponent extends Component<Props, State> {

	_list: List;

	constructor (props: Props) {
		super (props);

		this.state = {};
		this._list = new List (new Adapter (),
			(data) => this.setState ({data})
		);

		(this: any).onBoxAdd = this.onBoxAdd.bind (this);
		(this: any).onBoxDrag = this.onBoxDrag.bind (this);
		(this: any).onBoxUpdate = this.onBoxUpdate.bind (this);
		(this: any).onBoxDelete = this.onBoxDelete.bind (this);
		(this: any).onBoxMouseDown = this.onBoxMouseDown.bind (this);
	}

	async componentDidMount () {
		await this._list.sync ();

		const data = this._list.items ();

		this.setState ({data});
	}

	async onBoxAdd () {
		const data = await this._list.createItem ();

		this.setState ({data});
	}

	async onBoxUpdate (id: string, itemData: Object) {
		const data = await this._list.updateItem (id, itemData);

		this.setState ({data});
	}

	onBoxDrag (id: string, {x, y}: Coords) {
		this.onBoxUpdate (id, {x, y});
	}

	async onBoxDelete (id: string) {
		const data = await this._list.removeItem (id);

		this.setState ({data});
	}

	onBoxMouseDown (id: string) {
		const data = this._list.setMaxIndex (id);

		this.setState ({data});
	}

	render () {
		const {data} = this.state;

		return (
			<div className="canvas">
				<div className="actions">
					<AddButton onClick={this.onBoxAdd}/>
				</div>

				{data && data.map ((item: BoxType) =>
					<Box
						key={item.id} {...item}
						onDrag={this.onBoxDrag}
						onEdit={this.onBoxUpdate}
						onDelete={this.onBoxDelete}
						onMouseDown={this.onBoxMouseDown}/>
				)}
			</div>
		);
	}
}