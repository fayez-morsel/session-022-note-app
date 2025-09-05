import SearchBar from "./SearchBar";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { useEffect, useRef, useState } from "react";

interface NoteInterface {
  id: number;
  text: string;
  date: string;
}

export default function NotesContainer() {
  const [noteText, setNoteText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<NoteInterface[]>([]);
  const isFirstRender = useRef(true);

  const addNote = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: noteText,
      date: new Date().toLocaleString(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCharacterCount(0);
    setNoteText("");
  };

  const deleteNote = (id: number) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const searchNotes = (
    notes: NoteInterface[],
    query: string
  ): NoteInterface[] => {
    if (query.trim() === "") {
      return notes;
    }

    const filteredNotes = notes.filter((note) =>
      note.text.toLowerCase().includes(query.toLowerCase())
    );
    return filteredNotes;
  };

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const results = searchNotes(notes, searchQuery);
    setFilteredNotes(results);
  }, [searchQuery, notes]);


  return (
    <div className="md:w-[80%] w-[100%]  mx-auto p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Notes App</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => {
          return <Note key={note.id} note={note} deleteNote={deleteNote} />;
        })}

        <NoteForm
          noteText={noteText}
          setNoteText={setNoteText}
          characterCount={characterCount}
          setCharacterCount={setCharacterCount}
          addNote={addNote}
        />
      </div>
    </div>
  );
}
