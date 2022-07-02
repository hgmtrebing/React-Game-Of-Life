import React from 'react';
import {Toolbar} from "./toolbar";
import {GolBoard} from "./board";
import Container from 'react-bootstrap/Container';
import {SettingsModal} from "./settings-modal";
import {ColorPicker} from "./settings/color-picker";
import {Color, BoardSettings} from "./types";

type AppProps = {

}

type AppState = {
    tick: number;
    board: Array<Array<GolCell>>;
    showSettingsModal: boolean;
    boardSettings: BoardSettings;
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
            boardSettings: {
                cellSize: 20,
                cellBorderSize: 2,
                boardWidth: 25,
                boardHeight: 25,
                borderColor: "#000000",
                liveCellColor: "#FF0000",
                deadCellColor: "#0000FF"
            },
            board: new Array<Array<GolCell>>(),
            showSettingsModal: false,
        }

        this.tickIncrementer = this.tickIncrementer.bind(this);
        this.initializeBoard = this.initializeBoard.bind(this);
        this.toggleCell = this.toggleCell.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.showSettingsModal = this.showSettingsModal.bind(this);
        this.hideSettingsModal = this.hideSettingsModal.bind(this);
        this.saveSettings = this.saveSettings.bind(this);

        this.initializeBoard(false);
    }

    render() {
        return (
            <Container id={"app"}>

                <Toolbar currentTick={this.state.tick}
                         incrementTick={this.tickIncrementer}
                         resetBoard={this.resetBoard}
                         showSettingsModal={this.showSettingsModal}
                />

                <GolBoard cellToggler={this.toggleCell}
                          board={this.state.board}
                          boardSettings={this.state.boardSettings}
                />

                <SettingsModal showModal={this.state.showSettingsModal}
                               hideSettingsModal={this.hideSettingsModal}
                               saveSettings={this.saveSettings}
                               initialSettings={this.state.boardSettings}/>

            </Container>
        );
    }

    tickIncrementer() {
        let newState: AppState = this.state;
        newState.tick++;

        let oldBoard: Array<Array<GolCell>> = this.state.board;
        newState.board = this.createBoard(newState.boardSettings.boardWidth, newState.boardSettings.boardHeight);

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

        newState.board = this.createBoard(newState.boardSettings.boardWidth, newState.boardSettings.boardHeight);

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
            location.x < this.state.boardSettings.boardWidth &&
            location.y >= 0 &&
            location.y < this.state.boardSettings.boardHeight) {

            let rowsToUpdate: Array<number> = [location.y];
            let colsToUpdate: Array<number> = [location.x];

            if (location.x > 0) {
                colsToUpdate.push(location.x-1);
            }

            if (location.x < this.state.boardSettings.boardWidth-1) {
                colsToUpdate.push(location.x+1);
            }

            if (location.y > 0) {
                rowsToUpdate.push(location.y-1);
            }

            if (location.y < this.state.boardSettings.boardHeight-1) {
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

    saveSettings(boardSettings: BoardSettings) {
        let newState: AppState = this.state;
        let oldBoard : BoardSettings = JSON.parse(JSON.stringify(this.state.boardSettings));
        newState.boardSettings = boardSettings;
        this.setState(newState);
        if (oldBoard.boardHeight !== boardSettings.boardHeight ||
            oldBoard.boardWidth !== boardSettings.boardWidth) {
            this.resetBoard();
        }
    }
}


export default App;
