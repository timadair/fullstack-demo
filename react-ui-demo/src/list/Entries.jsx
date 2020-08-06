import * as React from "react";

export class Entries extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            entries: [
              'Initial Entry',
            ],
        }
    }

  componentDidMount() {
    console.log('Beginning call for entries');
    fetch("http://localhost:8080/entries/1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Inside response processing');

          this.setState({

              entries: this.state.entries.concat(result.entries),
            }
          )
        },
        (error) => {
          console.error(error);
        }
      );
  }

    render() {
        return <ol>
            {this.state.entries.map(text =>
              <li key={text}>{text}</li>)
            }
        </ol>;
    }
}
