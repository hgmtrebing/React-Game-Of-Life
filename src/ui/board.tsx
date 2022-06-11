import React, {RefObject, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {GolCell} from "./app";

export type GolBoardProps = {
    width: number;
    height: number;
    cellSize: number;
    cellBorder: number;
    cellToggler: CellToggler;
    cellsToUpdate: Set<GolCell>;
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
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }

    drawCells(context) {
        this.props.cellsToUpdate.forEach((cell) => {
            this.drawCell(cell, context);
        });
    }

    drawCell(cell: GolCell, context: any) {
        let x: number = cell.x;
        let y: number = cell.y;

        let xCellStart = x * this.props.cellSize + ((1+x) * this.props.cellBorder);
        let yCellStart = y * this.props.cellSize + ((1+y) * this.props.cellBorder);


        if (cell.isLiving) {
            context.fillStyle = 'rgb(200, 0, 0)';
        } else {
            context.fillStyle = 'rgb(0, 0, 200)';
        }

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
