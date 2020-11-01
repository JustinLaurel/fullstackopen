import React, { useState, useEffect } from 'react'
import Note from './note.js'
import noteService from '../services/notes.js'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return(
        <div className="error">
            {message}
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    useEffect(() => {
        noteService.getAll()
            .then(returnedNote => {
                console.log(`returnedNote=${JSON.stringify(returnedNote)}`)
                setNotes(notes.concat(returnedNote))
        })
    }, [])

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const toggleImportanceOf = id => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(url, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(note => note.id !== id))
            })
    }
    
    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => 
                    <Note 
                        key={note.id} 
                        note={note} 
                        toggleImportance = {() => toggleImportanceOf(note.id)}
                    />)}
            </ul>
            <form onSubmit={addNote}>
                <input type='text' value={newNote} onChange={handleChange}/> 
                <button type="submit">save</button>
            </form>
        </div>
        )
}

export default App