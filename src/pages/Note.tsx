
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";

type Note = {
  title: string;
  date: string;
  content: string;
};

const notes: Note[] = [
  { 
    title: "Hello World",
    date: "2024.03.21",
    content: `# Hello World

Welcome to my first note.`
  }
];

const Note = () => {
  const { noteId } = useParams();
  const note = notes.find(
    (n) => n.title.toLowerCase().replace(/ /g, '-') === noteId
  );

  if (!note) {
    return (
      <Layout>
        <div>Note not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">{note.title}</h1>
          <span className="text-gray-400">{note.date}</span>
        </div>
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default Note;
