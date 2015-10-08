import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.addNote = this.addNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.findNote = this.findNote.bind(this);

		this.state = {
			notes: [
				{
					id: uuid.v4(),
					task: 'Learn Webpack'
				},
				{
					id: uuid.v4(),
					task: 'Learn React'
				},
				{
					id: uuid.v4(),
					task: 'Do laundry'
				}
			]
		};
	}

	addNote() {
		this.setState({
			notes: [...this.state.notes, {id: uuid.v4(), task: 'New task'}]
		});
	}

	deleteNote(id) {
		const notes = this.state.notes;
		const noteIndex = this.findNote(id);

		if (noteIndex < 0) return;

		this.setState({
			notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
		});
	}

	editNote(id, task) {
		let notes = this.state.notes;
		const noteIndex = this.findNote(id);

		if (noteIndex < 0) return;

		notes[noteIndex].task = task;

		this.setState({notes});
	}

	findNote(id) {
		const notes = this.state.notes;
		const noteIndex = notes.findIndex(note => note.id === id);

		if (noteIndex < 0) {
			console.warn('Failed to find note', notes, id);
		}

		return noteIndex;
	}

	render() {
		const notes = this.state.notes;

		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes items={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
			</div>
		);
	}
}