import { FaTrash } from "react-icons/fa";

interface NoteProps {
  note: {
    id: number;
    text: string;
    date: string;
  };
  deleteNote: (id: number) => void;
}

export default function Note({ note, deleteNote }: NoteProps) {
  return (
    <div className="bg-blue-300 h-40 rounded-lg shadow-lg p-4 flex flex-col justify-between">
      <p>{note.text}</p>
      <div className="flex justify-between">
        <p className="text-sm">{note.date}</p>
        <button className="p-2 bg-blue-500 rounded-full cursor-pointer text-white" onClick={() => deleteNote(note.id)}>
          <FaTrash size={12} />
        </button>
      </div>
    </div>
  );
}
