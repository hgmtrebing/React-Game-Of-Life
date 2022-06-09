import React, {RefObject, useEffect} from 'react';
import ReactDOM from 'react-dom';

export type GolBoardProps = {
    width: number;
    height: number;
    cellSize: number;
    cellBorder: number;
}

export type GolBoardState = {
    tick: number;
    cells: Array<Array<GolCell>>;
}

export type GolCell = {
    x: number;
    y: number;
    isLiving: boolean;
}

export class GolBoard extends React.Component<GolBoardProps, GolBoardState> {
    canvasRef : RefObject<any>;

    constructor(props: GolBoardProps) {
        super(props);
        this.canvasRef = React.createRef();
        let cells = [];
        for (var x = 0; x < this.props.width; x++) {
            cells.push([]);
            for (var y = 0; y < this.props.width; y++) {
                cells[x].push({
                    x: x,
                    y: y,
                    isLiving: false
                });
            }
        }

        this.state = {
            tick: 0,
            cells: cells
        }

        this.onClick = this.onClick.bind(this);
    }

    update() {
        var canvas = this.canvasRef.current;
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        this.drawCells();
    }

    drawCells() {
        var canvas = this.canvasRef.current;
        const context = canvas.getContext('2d')

        for (var x = 0; x < this.state.cells.length; x++) {
            for (var y = 0; y < this.state.cells[x].length; y++) {
                let xCellStart = x * this.props.cellSize + ((1+x) * this.props.cellBorder);
                let yCellStart = y * this.props.cellSize + ((1+y) * this.props.cellBorder);

                /*
                if ( (x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
                    context.fillStyle = 'rgb(200, 0, 0)';
                } else {
                    context.fillStyle = 'rgb(0, 0, 200)';
                }
                 */

                if (this.state.cells[x][y].isLiving) {
                    context.fillStyle = 'rgb(200, 0, 0)';
                } else {
                    context.fillStyle = 'rgb(0, 0, 200)';
                }

                context.fillRect(xCellStart, yCellStart, this.props.cellSize, this.props.cellSize);
            }
        }

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

        let cells = this.state.cells;
        let tick = this.state.tick;
        cells[column][row].isLiving = !cells[column][row].isLiving;
        this.setState({
            cells: cells,
            tick: tick
        })
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
