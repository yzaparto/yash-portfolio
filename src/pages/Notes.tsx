
import { useState } from "react";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";

type Note = {
  title: string;
  date: string;
  content: string;
};

const notes: Note[] = [
  { 
    title: "Another Enlightment",
    date: "2024.09.29",
    content: `# Another Enlightment
    
In the vast expanse of technology, we often find ourselves at crossroads...`
  },
  { 
    title: "Enlightment",
    date: "2023.07.02",
    content: `# Enlightment

Sometimes the simplest solutions are the most elegant...`
  },
  { 
    title: "Good Design",
    date: "2022.11.05",
    content: `# Good Design

The principles of good design transcend mediums...`
  },
  { 
    title: "On UI Animations",
    date: "2020.05.27",
    content: `# On UI Animations

Subtle animations can greatly enhance user experience...`
  },
  { 
    title: "The Best Things",
    date: "2019.07.15",
    content: `# The Best Things

When building products, it's important to remember...`
  },
];

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <Layout>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.title}
            className="group flex items-center min-w-0 cursor-pointer"
            onClick={() => setSelectedNote(note === selectedNote ? null : note)}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-gray-900 group-hover:text-gray-500 transition-colors truncate"
            >
              {note.title}
            </a>
            <div className="flex-1 mx-4 border-b border-dotted border-gray-300 group-hover:border-gray-500 transition-colors" />
            <span className="text-gray-400 text-sm whitespace-nowrap group-hover:text-gray-500 transition-colors">
              {note.date}
            </span>
          </div>
        ))}
      </div>
      {selectedNote && (
        <div className="mt-8 prose prose-gray max-w-none">
          <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
        </div>
      )}
    </Layout>
  );
};

export default Notes;
