import * as React from "react";

export class Entries extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            entries: [
              'First Entry',
              'Second Entry'
            ],
        }
    }

    render() {
        return <ol>
            {this.state.entries.map(text => <li>{text}</li>)}
        </ol>;
    }
}
