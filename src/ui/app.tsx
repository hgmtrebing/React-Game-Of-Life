import React from 'react';
import {Toolbar} from "./toolbar";
import {GolBoard} from "./board";

type AppProps = {

}

type AppState = {
    tick: number;
    cellSize: number;
    cellBorder: number;
    widthInCells: number;
    heightInCells: number;
    board: Array<Array<GolCell>>;
    cellsToUpdate: Set<GolCell>;
}

export type GolCell = {
    x: number;
    y: number;
    isLiving: boolean;
}

class App extends React.Component<AppProps, AppState>{
    constructor(props: AppProps) {
        super(props);

        this.state = {
            tick: 0,
            cellSize: 10,
            cellBorder: 2,
            widthInCells: 25,
            heightInCells: 25,
            board: new Array<Array<GolCell>>(),
            cellsToUpdate: new Set<GolCell>()
        };

        this.tickIncrementer = this.tickIncrementer.bind(this);
        this.initializeBoard = this.initializeBoard.bind(this);
        this.toggleCell = this.toggleCell.bind(this);

        this.initializeBoard(false);
    }

    render() {
        return (
            <div id={"app"}>

                <Toolbar currentTick={this.state.tick} incrementTick={this.tickIncrementer}/>

                <GolBoard width={this.state.widthInCells}
                          height={this.state.heightInCells}
                          cellSize={this.state.cellSize}
                          cellBorder={this.state.cellBorder}
                          cellToggler={this.toggleCell}
                          cellsToUpdate={this.state.cellsToUpdate}
                />

            </div>
        );
    }

    tickIncrementer() {
        let newState: AppState;
        newState = this.state;
        newState.tick++;
        this.setState(newState);
    }

    initializeBoard(componentMounted: boolean) {
        let newState: AppState = this.state;

        for (var x = 0; x < newState.widthInCells; x++) {
            newState.board.push([]);
            for (var y = 0; y < newState.heightInCells; y++) {

                // Create a new Cell and add it to the board
                newState.board[x].push({
                    x: x,
                    y: y,
                    isLiving: false
                });

                newState.cellsToUpdate.add(newState.board[x][y]);
            }
        }

        if (componentMounted) {
            this.setState(newState);
        } else {
            this.state = newState;
        }
    }

    toggleCell(x: number, y: number) {
        let newState: AppState = this.state
        if (x < newState.board.length && y < newState.board[x].length) {
            newState.board[x][y].isLiving = !this.state.board[x][y].isLiving;
            newState.cellsToUpdate.add(newState.board[x][y]);

            this.setState(newState);
        }

    }
}


export default App;
