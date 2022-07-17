export type NoArgsVoidHandler = {
    (): void;
}

export type ColorSetter = {
    (color: Color): void;
}

export type BoardSettings = {
    borderColor: string,
    liveCellColor: string,
    deadCellColor: string,
    cellSize: number,
    cellBorderSize: number,
    boardWidth: number,
    boardHeight: number
}

export type SaveSettingsHandler = {
    (boardSettings : BoardSettings) : void;
}


export type Color = {
    r: string
    g: string,
    b: string,
    a: string
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