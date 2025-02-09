
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";

type Note = {
  title: string;
  date: string;
  slug: string;
};

const Notes = () => {
  const navigate = useNavigate();
  
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes-list'],
    queryFn: async () => {
      const response = await fetch('/notes/index.json');
      if (!response.ok) {
        const files = await fetch('/notes/');
        const text = await files.text();
        // Parse the directory listing HTML to extract .md files
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
          .filter(a => a.href.endsWith('.md'))
          .map(a => a.href);
        
        // For each .md file, fetch its contents to get the title and date
        const notes = await Promise.all(
          links.map(async (link) => {
            const filename = link.split('/').pop() || '';
            const slug = filename.replace('.md', '');
            const response = await fetch(`/notes/${filename}`);
            const content = await response.text();
            const lines = content.split('\n');
            const title = lines[0].replace('# ', '');
            const date = lines[1].trim();
            return { title, date, slug };
          })
        );
        return notes;
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.slug}
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
