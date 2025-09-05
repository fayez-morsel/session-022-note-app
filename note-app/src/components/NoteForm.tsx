import React from "react";

interface NoteFormProps {
    noteText: string,
    setNoteText : (note: string) => void,
    characterCount: number,
    setCharacterCount : (count : number) => void,
    addNote: () => void,
}

export default function NoteForm({noteText,setNoteText,characterCount,setCharacterCount,addNote} : NoteFormProps) {
  
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

         if(text.length <= 100){
            setNoteText(text);
            setCharacterCount(text.length)
         }
    }
  
    return (
    <div className="bg-blue-200 h-40 rounded-lg shadow-lg p-4 flex flex-col justify-between">
      <input
        type="text"
        placeholder="Add Note..."
        className="outline-none placeholder-gray-500"
        value={noteText}
        onChange={handleInput}
      />
      <div className="flex justify-between">
        <p className="text-sm">{100 - characterCount} remaining</p>
        <button className="px-2 py-0.5 bg-blue-500 rounded-full cursor-pointer text-white text-s m" onClick={() => addNote()}>
          Save
        </button>
      </div>
    </div>
  );
}
