import React from 'react';
import ReactDOM from "react-dom";
import {Modal, Row} from "react-bootstrap";
import {BoardSettings, NoArgsVoidHandler, SaveSettingsHandler} from "./types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

type SettingsModalProps = {

    /** Whether to display or hide the Settings Modal. */
    showModal: boolean,

    /** Event handler that is run whenever the user clicks on the 'Cancel' Button or the 'x' in the top right corner. */
    hideSettingsModal: NoArgsVoidHandler,

    /** Event handler whenever the user indicates that they would like to save their changes for the settings. */
    saveSettings: SaveSettingsHandler,

    /** The initial Board Settings when this Component is first constructed. */
    initialSettings: BoardSettings
}

type SettingsModalState = {
    currentSettings: BoardSettings
}

/** Component controlling the Settings Modal, which pops up and allows the user to reconfigure certain aspects of the Game of Life. */
export class SettingsModal extends React.Component<SettingsModalProps, SettingsModalState> {

    constructor(props) {
        super(props);

        this.state = {
            currentSettings: JSON.parse(JSON.stringify(this.props.initialSettings))
        }

        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setDeadCellColor = this.setDeadCellColor.bind(this);
        this.setLiveCellColor = this.setLiveCellColor.bind(this);
        this.setCellBorderSize = this.setCellBorderSize.bind(this);
        this.setCellSize = this.setCellSize.bind(this);
        this.setBoardWidth = this.setBoardWidth.bind(this);
        this.setBoardHeight = this.setBoardHeight.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let settings : BoardSettings = this.state.currentSettings;
        return (
            <Modal show={this.props.showModal} onHide={this.props.hideSettingsModal}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Game of Life Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="settings-form" onSubmit={this.handleSubmit}>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Border Color</Form.Label> </Col>
                            <Col> <Form.Control onChange={this.setBackgroundColor} value={settings.borderColor} type={"color"} title={"Choose the border color."}></Form.Control></Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Live Cell Color</Form.Label> </Col>
                            <Col> <Form.Control onChange={this.setLiveCellColor} value={settings.liveCellColor} name="live-cell-color" type={"color"} id={"live-cell-color"} title={"Choose the live cell color."}></Form.Control> </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Dead Cell Color</Form.Label> </Col>
                            <Col> <Form.Control onChange={this.setDeadCellColor} value={settings.deadCellColor} name="dead-cell-color" type={"color"} id={"dead-cell-color"} title={"Choose the dead cell color."}></Form.Control> </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Cell Border Size</Form.Label> </Col>
                            <Col> <Form.Range onChange={this.setCellBorderSize} value={settings.cellBorderSize} min={0} max={10} step={1}/> </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Cell Size</Form.Label> </Col>
                            <Col> <Form.Range onChange={this.setCellSize} value={settings.cellSize} min={10} max={50} step={1}/> </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Board Width</Form.Label> </Col>
                            <Col> <Form.Range onChange={this.setBoardWidth} value={settings.boardWidth} min={5} max={500} step={5}/> </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col> <Form.Label>Board Height</Form.Label> </Col>
                            <Col> <Form.Range onChange={this.setBoardHeight} value={settings.boardHeight} min={5} max={500} step={5}/> </Col>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={this.props.hideSettingsModal}>Close</Button>
                    <Button form="settings-form" variant={"primary"} type={"submit"}>Save</Button>
                </Modal.Footer>

            </Modal>
        );
    }

    setBackgroundColor(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.borderColor = event.target.value;
        this.setState(newState);
    }

    setLiveCellColor(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.liveCellColor = event.target.value;
        this.setState(newState);
    }

    setDeadCellColor(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.deadCellColor = event.target.value;
        this.setState(newState);
    }

    setCellBorderSize(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.cellBorderSize = parseInt(event.target.value);
        this.setState(newState);
    }

    setCellSize(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.cellSize = parseInt(event.target.value);
        this.setState(newState);
    }

    setBoardWidth(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.boardWidth = parseInt(event.target.value);
        this.setState(newState);
    }

    setBoardHeight(event) {
        let newState: SettingsModalState = this.state;
        newState.currentSettings.boardHeight = parseInt(event.target.value);
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.saveSettings(this.state.currentSettings);
    }
}
