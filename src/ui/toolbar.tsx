import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {NoArgsVoidHandler} from "./types";

type ToolbarProps = {
    currentTick: number;
    incrementTick: NoArgsVoidHandler;
    resetBoard: NoArgsVoidHandler;
    showSettingsModal: NoArgsVoidHandler;
}

export class Toolbar extends React.Component<ToolbarProps, any> {

    constructor(props: ToolbarProps) {
        super(props);
    }

    render() {
        return (
            <Container id={"gol-toolbar"}>
                <Button onClick={this.props.incrementTick} id={"increment-tick"} variant={"success"}>Increment 1 Tick</Button>
                <Button onClick={this.props.resetBoard} id={"reset-board"} variant={"danger"}>Reset Board</Button>
                <Button onClick={this.props.showSettingsModal} id={"settings"}>Settings</Button>
                {this.props.currentTick}
            </Container>
        );
    }
}


