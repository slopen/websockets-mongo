// @flow
import React from 'react';

import Draggable from 'react-draggable';
import type {DraggableData} from 'react-draggable';

export type Coords = {
	x: number,
	y: number
};

type CallbackResult = void | Promise <void>;

type BoxProps = Coords & {
	id: string,
	x: number,
	y: number,
	z: number,
	content: string,
	onEdit: (id: string, data: Object) => CallbackResult,
	onDrag: (id: string, coords: Coords) => CallbackResult,
	onDelete: (id: string) => CallbackResult,
	onMouseDown: (id: string) => CallbackResult
};

export default ({
	id,
	x,
	y,
	z,
	content,
	onEdit,
	onDrag,
	onDelete,
	onMouseDown
}: BoxProps) =>
	<Draggable
		bounds="parent"
		handle=".controls"
		position={{x, y}}
		onDrag={(
			e: MouseEvent,
			{x, y}: DraggableData
		) => onDrag (id, {x, y})}
		onMouseDown={() => onMouseDown (id)}>

		<div
			className="box"
			style={{zIndex: z}}>

			<div className="controls">
				<a href="#" className="remove" onClick={(e: MouseEvent) => {
					onDelete (id);
					e.preventDefault ();
				}}>
					<i className="fa fa-times"/>
				</a>
			</div>

			<div className="content">
				<textarea
					value={content}
					onChange={({target}: SyntheticInputEvent<EventTarget>) =>
						onEdit (id, {
							content: target.value
						})
					}/>
			</div>
		</div>
	</Draggable>
