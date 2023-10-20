import React, { useState } from "react";
import answers from "./answers";
import { choice } from "./random";
import "./MagicBall.css";

/** EightBall: shows random answer and, on click, changes answer,
 *
 * Props:
 * - answers: array of {msg, color} objects
 *
 * State:
 * - answer: {msg, color} of current answer
 */

const MagicBall = () => {
    const [answer, setAnswer] = useState({
        msg: "think of a message",
        color: "black"
    });

    const handleClick = (e) => {
        setAnswer(choice(answers));
    };
    return (
        <div className="MagicBall"
            onClick={handleClick}
            style={{ backgroundColor: answer.color }}>
            <b>{answer.msg}</b>
        </div>
    )
}

export default MagicBall;