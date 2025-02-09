
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

type Note = {
  title: string;
  date: string;
  slug: string;
};

const notes: Note[] = [
  { 
    title: "Hello World",
    date: "2025.02.09",
    slug: "hello-world"
  }
];

const Notes = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.title}
            className="group flex items-center min-w-0 cursor-pointer"
            onClick={() => navigate(`/notes/${note.slug}`)}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-gray-900 group-hover:text-gray-800 transition-colors truncate"
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
    </Layout>
  );
};

export default Notes;
