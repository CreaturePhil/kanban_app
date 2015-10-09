import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import connect from '../decorators/connect';

@connect(NoteStore)
export default class App extends React.Component {
	addNote() {
		NoteActions.create({task: 'New task'});
	}

	deleteNote(id) {
		NoteActions.delete(id);
	}

	editNote(id, task) {
		NoteActions.update({id, task});
	}

	render() {
		const notes = this.props.notes;

		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes items={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
			</div>
		);
	}
}