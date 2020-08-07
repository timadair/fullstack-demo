import * as React from "react";
import TextField from "@material-ui/core/TextField";
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import IconButton from "@material-ui/core/IconButton";

const ENTRIES_URI = 'http://localhost:8080/entries/';

export class Entries extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      entries: [
        {
          id: -1,
          entryText: 'Example Entry'
        },
      ],
      latestInputText: ""
    }
  }

  componentDidMount() {
    console.log('Beginning call for entries');
    fetch(ENTRIES_URI)
        .then(res => res.json())
        .then((result) => {
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
    return <div>
      {this.renderInputForm()}
      {this.renderList()}
    </div>;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addNewEntry(this.state.latestInputText);
    this.setState({
      latestInputText: ""
    });
  }

  addNewEntry(newEntryText) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryText: newEntryText })
    };
    fetch(ENTRIES_URI, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({
              entries: this.state.entries.concat(data)
            }
        ));
  }

  deleteEntry(entryId) {
    console.log("Attempting to delete " + entryId);
    fetch(ENTRIES_URI + '/' + entryId, {method: 'DELETE'})
        .then(response => {
          this.setState({
            entries: this.state.entries.filter((entry) => {
              let b = entry.id !== +entryId;
              console.log(entry + ", " + b);
              return b;
            })
          })
        });

  }

  handleChange(event) {
    this.setState({
      latestInputText: event.target.value
    })
  }

  handleClick(event) {
    this.deleteEntry(event.currentTarget.parentElement.getAttribute('entry-id'));
  }

  renderInputForm() {
    return <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
      <TextField id="new-entry-inputs"
                 label="New List Entries"
                 variant="filled"
                 value={this.state.latestInputText}
                 onChange={this.handleChange}/>
    </form>
  }

  renderList() {
    return <ul>
      {
        this.state.entries.map((entry) => this.renderEntry(entry))
      }
    </ul>;
  }

  renderEntry(entry) {
    return <li className="listEntry" key={entry.id} entry-id={entry.id}>
      <IconButton onClick={this.handleClick}>
        <RemoveCircleTwoToneIcon className="deleteIcon"/>
      </IconButton>
      <div className="entryText">{entry.entryText}</div>
    </li>;
  }
}
