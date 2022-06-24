import React from 'react';
import {Toolbar} from "./toolbar";
import {GolBoard} from "./board";
import Container from 'react-bootstrap/Container';
import {SettingsModal} from "./settings-modal";
import {ColorPicker} from "./settings/color-picker";
import {Color} from "./types";

type AppProps = {

}

type AppState = {
    tick: number;
    cellSize: number;
    cellBorder: number;
    widthInCells: number;
    heightInCells: number;
    board: Array<Array<GolCell>>;
    showSettingsModal: boolean;
    backgroundColor: Color;
    liveCellColor: Color;
    deadCellColor: Color;
}

export type GolCell = {
    coord: GolCellCoordinates;
    livingNeighbors: number;
    isLiving: boolean;
}

export type GolCellCoordinates = {
    x: number;
    y: number;
}

class App extends React.Component<AppProps, AppState>{
    constructor(props: AppProps) {
        super(props);

        this.state = {
            tick: 0,
            cellSize: 20,
            cellBorder: 2,
            widthInCells: 25,
            heightInCells: 25,
            board: new Array<Array<GolCell>>(),
            showSettingsModal: false,

            backgroundColor: {
                r: "0",
                g: "0",
                b: "0",
                a: "1"
            },

            liveCellColor: {
                r: "255",
                g: "0",
                b: "0",
                a: "1"
            },

            deadCellColor: {
                r: "0",
                g: "0",
                b: "255",
                a: "1"
            }
        };

        this.tickIncrementer = this.tickIncrementer.bind(this);
        this.initializeBoard = this.initializeBoard.bind(this);
        this.toggleCell = this.toggleCell.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.showSettingsModal = this.showSettingsModal.bind(this);
        this.hideSettingsModal = this.hideSettingsModal.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setDeadCellColor = this.setDeadCellColor.bind(this);
        this.setLiveCellColor = this.setLiveCellColor.bind(this);

        this.initializeBoard(false);
    }

    render() {
        return (
            <Container id={"app"}>

                <ColorPicker colorSetter={this.setBackgroundColor}/>
                <ColorPicker colorSetter={this.setLiveCellColor}/>
                <ColorPicker colorSetter={this.setDeadCellColor}/>
                <Toolbar currentTick={this.state.tick}
                         incrementTick={this.tickIncrementer}
                         resetBoard={this.resetBoard}
                         showSettingsModal={this.showSettingsModal}
                />

                <GolBoard width={this.state.widthInCells}
                          height={this.state.heightInCells}
                          cellSize={this.state.cellSize}
                          cellBorder={this.state.cellBorder}
                          cellToggler={this.toggleCell}
                          board={this.state.board}
                          backgroundColor={this.state.backgroundColor}
                          liveCellColor={this.state.liveCellColor}
                          deadCellColor={this.state.deadCellColor}
                />

                <SettingsModal showModal={this.state.showSettingsModal} hideSettingsModal={this.hideSettingsModal}/>

            </Container>
        );
    }

    tickIncrementer() {
        let newState: AppState = this.state;
        newState.tick++;

        let oldBoard: Array<Array<GolCell>> = this.state.board;
        newState.board = this.createBoard(newState.widthInCells, newState.heightInCells);

        oldBoard.forEach((row : Array<GolCell>) => {
            row.forEach((cell: GolCell) => {
                if (cell.isLiving && (cell.livingNeighbors === 2 || cell.livingNeighbors === 3)) {
                    newState = this.setLiveStateOnAbstractCell(cell.coord, true, newState);
                } else if (!cell.isLiving && cell.livingNeighbors === 3) {
                    newState = this.setLiveStateOnAbstractCell(cell.coord, true, newState);
                } else {
                    newState = this.setLiveStateOnAbstractCell(cell.coord, false, newState);
                }
            });
        });

        this.setState(newState);
    }

    resetBoard() {
        this.initializeBoard(true);
    }


    initializeBoard(componentMounted: boolean) {
        let newState: AppState = this.state;

        newState.board = this.createBoard(newState.widthInCells, newState.heightInCells);

        if (componentMounted) {
            this.setState(newState);
        } else {
            this.state = newState;
        }
    }

    createBoard(width: number, height: number) : Array<Array<GolCell>> {
        let board : Array<Array<GolCell>> = new Array<Array<GolCell>>();

        for (var x = 0; x < width; x++) {
            board.push([]);
            for (var y = 0; y < height; y++) {

                // Create a new Cell and add it to the board
                board[x].push({
                    coord: {x: x, y: y},
                    livingNeighbors: 0,
                    isLiving: false
                });

            }
        }

        return board;
    }

    toggleCell(x: number, y: number) {
        this.setState(this.toggleAbstractCell(x, y, this.state));
    }

    toggleAbstractCell(x: number, y: number, oldAppState: AppState) : AppState {
        let appState = oldAppState;
        if (x < appState.board.length && y < appState.board[x].length) {
            appState.board[x][y].isLiving = !appState.board[x][y].isLiving;

            let neighborChangeAmount = (appState.board[x][y].isLiving) ? 1 : -1;

            this.getNeighbors({x: x, y: y}).forEach((neighbor: GolCellCoordinates) => {
                appState.board[neighbor.x][neighbor.y].livingNeighbors += neighborChangeAmount;
            });

            return appState;
        }
    }

    setLiveStateOnAbstractCell(location: GolCellCoordinates, isLiving: boolean, appState: AppState): AppState {
        let wasLiving: boolean = appState.board[location.x][location.y].isLiving;
        appState.board[location.x][location.y].isLiving = isLiving;

        let neighborChangeAmount : number = 0;

        if (isLiving && !wasLiving) {
            neighborChangeAmount = 1;
        } else if (!isLiving && wasLiving) {
            neighborChangeAmount = -1;
        }

        this.getNeighbors(location).forEach((neighbor: GolCellCoordinates) => {
            appState.board[neighbor.x][neighbor.y].livingNeighbors += neighborChangeAmount;
        });

        return appState;
    }

    getNeighbors(location: GolCellCoordinates): Set<GolCellCoordinates> {
        let neighbors : Set<GolCellCoordinates> = new Set<GolCellCoordinates>();

        if (location.x >= 0 &&
            location.x < this.state.widthInCells &&
            location.y >= 0 &&
            location.y < this.state.heightInCells) {

            let rowsToUpdate: Array<number> = [location.y];
            let colsToUpdate: Array<number> = [location.x];

            if (location.x > 0) {
                colsToUpdate.push(location.x-1);
            }

            if (location.x < this.state.widthInCells-1) {
                colsToUpdate.push(location.x+1);
            }

            if (location.y > 0) {
                rowsToUpdate.push(location.y-1);
            }

            if (location.y < this.state.heightInCells-1) {
                rowsToUpdate.push(location.y+1);
            }

            rowsToUpdate.forEach((row: number) => {
                colsToUpdate.forEach((col: number) => {
                    if (!(location.x === col && location.y === row)) {
                        neighbors.add({
                            x: col,
                            y: row
                        });
                    }
                });
            });

        }


        return neighbors;
    }

    showSettingsModal() {
        let newState: AppState = this.state;
        newState.showSettingsModal = true;
        this.setState(newState);
    }

    hideSettingsModal() {
        let newState: AppState = this.state;
        newState.showSettingsModal = false;
        this.setState(newState);
    }

    setBackgroundColor(color: Color) {
        let newState: AppState = this.state;
        newState.backgroundColor = color;
        this.setState(newState);
    }

    setLiveCellColor(color: Color) {
        let newState: AppState = this.state;
        newState.liveCellColor = color;
        this.setState(newState);
    }

    setDeadCellColor(color: Color) {
        let newState: AppState = this.state;
        newState.deadCellColor = color;
        this.setState(newState);
    }
}


export default App;
