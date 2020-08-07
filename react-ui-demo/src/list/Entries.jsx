import * as React from "react";

export class Entries extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entries: [
        {
          id: -1,
          entryText: 'Example Entry'
        },
      ],
    }
  }

  componentDidMount() {
    console.log('Beginning call for entries');
    fetch("http://localhost:8080/entries/1")
        .then(res => {
          return res.ok ? res.json() : undefined;
        })
        .then(
            (result) => {
              console.log('Inside response processing:' + result);
              if (result) {
                this.setState({
                  entries: this.state.entries.concat(result),
                });
              }
            },
            (error) => {
              console.error(error);
            }
        );
  }

  render() {
    return <ol>
      {
        this.state.entries.map(entry =>
            <li key={entry.id}>{entry.entryText}</li>
        )
      }
    </ol>;
  }
}
