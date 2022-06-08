import React, {RefObject, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {GolCell} from "./cell";

export type GolBoardProps = {
    width: number;
    height: number;
    cellSize: number;
}

export type GolBoardState = {
    tick: number;
    cells: Array<GolCell>;
}

export class GolBoard extends React.Component<GolBoardProps, GolBoardState> {
    canvasRef : RefObject<any>;

    constructor(props: GolBoardProps) {
        super(props);
        this.canvasRef = React.createRef();
    }

    update() {
        var canvas = this.canvasRef.current;
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }

    componentDidMount() {
        this.update();
    }

    render() {
        return (
            <div id={"gol-board"}>
                <canvas ref={this.canvasRef}>

                </canvas>
            </div>
        );
    }

}
