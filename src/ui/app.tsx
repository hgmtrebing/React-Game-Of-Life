import React from 'react';
import {GolBoard} from "./board";

type AppProps = {

}

type AppState = {

}

class App extends React.Component<AppProps, AppState>{

    render() {
        return (
            <div id={"app"}>
                <GolBoard width={400} height={400} cellSize={10}/>
            </div>
        );
    }
}

export default App;
