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
                <GolBoard width={25} height={25} cellSize={20} cellBorder={5}/>
            </div>
        );
    }
}

export default App;
