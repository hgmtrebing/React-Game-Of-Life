export type NoArgsVoidHandler = {
    (): void;
}

export type ColorSetter = {
    (color: Color): void;
}

export type Color = {
    r: string
    g: string,
    b: string,
    a: string
}
