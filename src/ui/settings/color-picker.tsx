import React from "react";
import reactCSS from 'reactcss';
import SketchPicker from 'react-color';
import {Color, ColorSetter} from "../types";

export type ColorPickerProps = {
    colorSetter: ColorSetter
}

export type ColorPickerState = {
    color: Color
    displayColorPicker: boolean
}

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

    constructor(props: ColorPickerProps) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            },
        }
    }

    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.color.r}, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }

            </div>
        )
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
        this.props.colorSetter({r: this.state.color.r, g: this.state.color.g, b: this.state.color.b, a: this.state.color.a});
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };
}
