import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import moment from "moment";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
      const updatedNotes = notes.map((note, index) => {
        return { ...note, formattedTimestamp: moment(note.timestamp).format("YYYY-MM-DD HH:mm:ss") };
      });
  
      setNotes(updatedNotes);
    }
  }

  function addNote(newNote) {
    const date = new Date();
    
    if (!newNote.title || !newNote.content) {
      alert("Please enter a title and content for the note.");
      return;
    }

    setNotes((prevNotes) => {
      const updatedNotes = [ { ...newNote, timestamp: date, formattedTimestamp: moment(date).format("YYYY-MM-DD HH:mm:ss") }, ...prevNotes];   
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((noteItem, index) => index !== id);
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          timestamp={noteItem.formattedTimestamp}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;