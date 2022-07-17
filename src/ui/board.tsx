import React, {RefObject, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BoardSettings, Color, GolCell} from "./types";

export type GolBoardProps = {
    cellToggler: CellToggler;
    board: Array<Array<GolCell>>;
    boardSettings: BoardSettings;
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
        context.fillStyle = `${this.props.boardSettings.borderColor}`
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

        let xCellStart = x * this.props.boardSettings.cellSize + ((1+x) * this.props.boardSettings.cellBorderSize);
        let yCellStart = y * this.props.boardSettings.cellSize + ((1+y) * this.props.boardSettings.cellBorderSize);



        if (!cell.isLiving) {
            context.fillStyle = `${this.props.boardSettings.deadCellColor}`
        } else {
            context.fillStyle = `${this.props.boardSettings.liveCellColor}`
        }

        context.fillRect(xCellStart, yCellStart, this.props.boardSettings.cellSize, this.props.boardSettings.cellSize);
    }

    onClick(event: any) {
        let xLocation = event.nativeEvent.offsetX;
        let yLocation = event.nativeEvent.offsetY;

        let cellSize = this.props.boardSettings.cellSize + this.props.boardSettings.cellBorderSize;

        let column = Math.floor(xLocation / cellSize);
        let row = Math.floor(yLocation / cellSize);

        if (xLocation % cellSize < this.props.boardSettings.cellBorderSize || yLocation % cellSize < this.props.boardSettings.cellBorderSize) {
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
        var settings: BoardSettings = this.props.boardSettings;
        var width = (settings.boardWidth * settings.cellSize) + ((1 +settings.boardWidth) * settings.cellBorderSize);
        var height = (settings.boardHeight * settings.cellSize) + ((1 +settings.boardHeight) * settings.cellBorderSize);
        return (
            <div id={"gol-board"}>
                <canvas onClick={this.onClick} ref={this.canvasRef} width={width} height={height}>

                </canvas>
            </div>
        );
    }

}
