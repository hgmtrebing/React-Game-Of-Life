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
