import React, { Component } from "react";
import classes from './Quiz.scss';

class Quiz extends Component {
    state = {
      quiz: []
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <h1>quiz</h1>
            </div>
        )
    }

}

export default Quiz;