import React from 'react'
import NoteContext from './NoteContext';
import { useState } from 'react';
import { json } from 'react-router-dom';

const NoteState = (props) => {
    const host = 'http://localhost:4000';
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial);

    // Get all notes
    const getNote = async () => {
        // API call
        const data = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'get',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await data.json();
        setNotes(json);
    }

    // Add a new note
    const addNote = async (title, description, tag) => {
        // TODO: api call
        // API call
        const data = await fetch(`${host}/api/notes/addnotes`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await data.json();

        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        // API call
        const responce = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = responce.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);

    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const responce = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await responce.json();

        let newNote = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let i = 0; i < notes.length; i++) {
            const element = newNote[i];
            if (element._id === id) {
                newNote[i].title = title;
                newNote[i].description = description;
                newNote[i].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }

    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;