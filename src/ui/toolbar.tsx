import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

type ToolbarProps = {
    currentTick: number;
    incrementTick: NoArgsVoidHandler;
    resetBoard: NoArgsVoidHandler;
}

type NoArgsVoidHandler = {
    ():void;
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
                {this.props.currentTick}
            </Container>
        );
    }
}


