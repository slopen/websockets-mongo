// @flow

import * as React from 'react';

declare module 'react-draggable' {

  declare export interface DraggableBounds {
    left: number,
    right: number,
    top: number,
    bottom: number
  }

  declare export interface DraggableProps extends DraggableCoreProps {
    axis: 'both' | 'x' | 'y' | 'none',
    bounds: DraggableBounds | string | false,
    defaultClassName: string,
    defaultClassNameDragging: string,
    defaultClassNameDragged: string,
    defaultPosition: ControlPosition,
    position: ControlPosition
  }

  declare export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

  declare export interface DraggableData {
    node: HTMLElement,
    x: number, y: number,
    deltaX: number, deltaY: number,
    lastX: number, lastY: number
  }

  declare export type ControlPosition = {x: number, y: number};

  declare export interface DraggableCoreProps {
    allowAnyClick: boolean,
    cancel: string,
    disabled: boolean,
    enableUserSelectHack: boolean,
    offsetParent: HTMLElement,
    grid: [number, number],
    handle: string,
    onStart: DraggableEventHandler,
    onDrag: DraggableEventHandler,
    onStop: DraggableEventHandler,
    onMouseDown: (e: MouseEvent) => void
  }

  declare export default class Draggable extends React.Component<DraggableProps, {}> {
    static defaultProps : DraggableProps;
  }

  declare export class DraggableCore extends React.Component<DraggableCoreProps, {}> {
    static defaultProps : DraggableCoreProps;
  }
}