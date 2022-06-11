import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

type ToolbarProps = {
    currentTick: number;
    incrementTick: TickIncrementer;
}

type TickIncrementer = {
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
                <Button id={"decrement-tick"} variant={"danger"}>Decrement 1 Tick</Button>
                {this.props.currentTick}
            </Container>
        );
    }
}


