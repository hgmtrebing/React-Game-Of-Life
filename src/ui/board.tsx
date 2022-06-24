import React, {RefObject, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {GolCell} from "./app";
import {Color} from "./types";

export type GolBoardProps = {
    width: number;
    height: number;
    cellSize: number;
    cellBorder: number;
    cellToggler: CellToggler;
    board: Array<Array<GolCell>>;
    backgroundColor: Color;
    liveCellColor: Color;
    deadCellColor: Color;
}

export type GolBoardState = {
}

type CellToggler = {
    (x: number, y: number): void;
}


export class GolBoard extends React.Component<GolBoardProps, GolBoardState> {
    canvasRef : RefObject<any>;

    constructor(props: GolBoardProps) {
        super(props);
        this.canvasRef = React.createRef();

        this.onClick = this.onClick.bind(this);
    }

    update() {
        const context = this.getContext();
        this.drawBackground(context);
        this.drawCells(context);
    }

    getContext() {
        const canvas = this.canvasRef.current;
        return canvas.getContext('2d');
    }

    drawBackground(context) {
        let r = this.props.backgroundColor.r;
        let g = this.props.backgroundColor.g;
        let b = this.props.backgroundColor.b;
        let a = this.props.backgroundColor.a;
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }

    drawCells(context) {
        this.props.board.forEach((row: Array<GolCell>) => {
            row.forEach((cell: GolCell) => {
                this.drawCell(cell, context);
            });
        });
    }

    drawCell(cell: GolCell, context: any) {
        let x: number = cell.coord.x;
        let y: number = cell.coord.y;

        let xCellStart = x * this.props.cellSize + ((1+x) * this.props.cellBorder);
        let yCellStart = y * this.props.cellSize + ((1+y) * this.props.cellBorder);


        let r = this.props.liveCellColor.r;
        let g = this.props.liveCellColor.g;
        let b = this.props.liveCellColor.b;
        let a = this.props.liveCellColor.a;

        if (!cell.isLiving) {
            r = this.props.deadCellColor.r;
            g = this.props.deadCellColor.g;
            b = this.props.deadCellColor.b;
            a = this.props.deadCellColor.a;
        }

        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
        context.fillRect(xCellStart, yCellStart, this.props.cellSize, this.props.cellSize);
    }

    onClick(event: any) {
        let xLocation = event.nativeEvent.offsetX;
        let yLocation = event.nativeEvent.offsetY;

        let cellSize = this.props.cellSize + this.props.cellBorder;

        let column = Math.floor(xLocation / cellSize);
        let row = Math.floor(yLocation / cellSize);

        if (xLocation % cellSize < this.props.cellBorder || yLocation % cellSize < this.props.cellBorder) {
            return;
        }

        this.props.cellToggler(column, row);
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps: Readonly<GolBoardProps>, prevState: Readonly<GolBoardState>, snapshot?: any) {
        this.update();
    }

    render() {
        var width = (this.props.width * this.props.cellSize) + ((1 +this.props.width) * this.props.cellBorder);
        var height = (this.props.height * this.props.cellSize) + ((1 +this.props.height) * this.props.cellBorder);
        return (
            <div id={"gol-board"}>
                <canvas onClick={this.onClick} ref={this.canvasRef} width={width} height={height}>

                </canvas>
            </div>
        );
    }

}
