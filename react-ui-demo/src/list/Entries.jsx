import * as React from "react";
import TextField from "@material-ui/core/TextField";
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import IconButton from "@material-ui/core/IconButton";
import './Entries.scss'

const ENTRIES_URI = 'http://localhost:8080/entries/';

export class Entries extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      entries: [
        {
          id: -1,
          entryText: '[Example Entry]'
        },
      ],
      latestInputText: ""
    }
  }

  componentDidMount() {
    fetch(ENTRIES_URI)
        .then(res => res.json())
        .then((result) => {
              console.log('Populating initial list:' + result);
              if (result && result.length > 0) {
                this.setState({
                  entries: result
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
              entries: this.state.entries.filter(entry => entry.id > 0).concat(data)
            }
        ));
  }

  deleteEntry(entryId) {
    console.log("Attempting to delete " + entryId);
    fetch(ENTRIES_URI + '/' + entryId, {method: 'DELETE'})
        .then(() => {
          this.setState({
            entries: this.state.entries.filter((entry) => entry.id !== +entryId)
          })
        });

  }

  handleInputChange(event) {
    this.setState({
      latestInputText: event.target.value
    })
  }

  handleFilterChange(event) {
    const queryString = event.target.value;
    this.setState({
      entries: this.state.entries.map(entry => {
        entry["style"] = !entry.entryText.includes(queryString) ? { display: "none" } : undefined;
        // if (entry.style && entry.style.display === "none") {
        //   console.log("hiding " + entry.id);
        // } else {
        //   console.log("not hiding " + entry.id)
        // }
        return entry;
      })
    })
  }

  handleClick(event) {
    this.deleteEntry(event.currentTarget.parentElement.getAttribute('entry-id'));
  }

  renderInputForm() {
    return <div className="listControls">
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField id="new-entry-inputs"
                   label="Add to your list"
                   variant="filled"
                   value={this.state.latestInputText}
                   onChange={this.handleInputChange}/>
      </form>
      <form noValidate autoComplete="off" onSubmit={event => event.preventDefault()}>
        <TextField id="entry-filter"
                   label="Filter your list"
                   variant="filled"
                   onChange={this.handleFilterChange}/>
      </form>
    </div>
  }

  renderList() {
    return <ul>
      {
        this.state.entries.map((entry) => this.renderEntry(entry))
      }
    </ul>;
  }

  renderEntry(entry) {
    return <li className="listEntry" key={entry.id} entry-id={entry.id} style={entry.style}>
      <IconButton onClick={this.handleClick}>
        <RemoveCircleTwoToneIcon className="deleteIcon"/>
      </IconButton>
      <div className="entryText">{entry.entryText}</div>
    </li>;
  }
}
