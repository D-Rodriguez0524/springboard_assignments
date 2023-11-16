import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import ColorList from "./ColorList";
import Color from "./Color";
import NewColorForm from "./NewColorForm";

const Routes = () => {

    const INTIAL_COLORS = {
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF"
    }
    const [colors, updateColors] = useState(INTIAL_COLORS);

    const handleAdd = (newColor) => {
        updateColors(prevColors => ({ ...prevColors, ...newColor }));
    }

    const renderCurrentColor = (props) => {
        const { color } = props.match.params;
        const hex = colors[color];
        return <Color {...props} hex={hex} color={color} />
    }


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/colors">
                    <ColorList colors={colors} />
                </Route>
                <Route exact path="/colors/new">
                    <NewColorForm addColor={handleAdd} />
                </Route>
                <Route path="/colors/:color" render={renderCurrentColor} />
                <Redirect to="/colors" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;