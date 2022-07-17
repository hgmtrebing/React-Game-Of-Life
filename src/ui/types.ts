/** An Event Handler type that takes no arguments and returns no value. */
export type NoArgsVoidHandler = {
    (): void;
}

/** A type encapsulating the settings of the Game of Live board that can be modified by the user. */
export type BoardSettings = {
    borderColor: string,
    liveCellColor: string,
    deadCellColor: string,
    cellSize: number,
    cellBorderSize: number,
    boardWidth: number,
    boardHeight: number
}

/** An Event Handler type that consumes a BoardSettings object and returns no value. */
export type SaveSettingsHandler = {
    (boardSettings : BoardSettings) : void;
}

/** Datatype that encapsulates a single Game of Life Cell, including its coordinates and its live/dead state. */
export type GolCell = {
    coord: GolCellCoordinates;
    livingNeighbors: number;
    isLiving: boolean;
}

/** Datatype that encapsulates the x-y coordinates of a single Game of Life Cell */
export type GolCellCoordinates = {
    x: number;
    y: number;
}