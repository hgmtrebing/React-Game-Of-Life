import React from 'react';
import ReactDOM from "react-dom";
import {Modal} from "react-bootstrap";
import {NoArgsVoidHandler} from "./types";
import Compact from 'react-color';

type SettingsModalProps = {
    showModal: boolean,
    hideSettingsModal: NoArgsVoidHandler
}

type SettingsModalState = {
}

export class SettingsModal extends React.Component<SettingsModalProps, SettingsModalState> {

    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.hideSettingsModal}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Game of Life Settings</Modal.Title>
                </Modal.Header>
                <Compact/>

            </Modal>
        );
    }
}
