import React from 'react';
import ReactDOM from 'react-dom';

type CellProps = {

}

type CellState = {
    live: boolean
}

export class GolCell extends React.Component<CellProps, CellState> {

    state: CellState = {
        live: false,
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
