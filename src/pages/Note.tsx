
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";

const Note = () => {
  const { noteId } = useParams();

  const { data: note, isLoading: isLoadingNote } = useQuery({
    queryKey: ['note-metadata', noteId],
    queryFn: async () => {
      const response = await fetch(`/notes/${noteId}.md`);
      if (!response.ok) {
        throw new Error('Failed to load note');
      }
      const content = await response.text();
      const lines = content.split('\n');
      return {
        title: lines[0].replace('# ', ''),
        date: lines[1].trim(),
        slug: noteId
      };
    },
    enabled: !!noteId
  });

  const { data: content, isLoading: isLoadingContent } = useQuery({
    queryKey: ['note-content', noteId],
    queryFn: async () => {
      const response = await fetch(`/notes/${noteId}.md`);
      if (!response.ok) {
        throw new Error('Failed to load note content');
      }
      const text = await response.text();
      // Remove the first two lines (title and date) from the markdown content
      return text.split('\n').slice(2).join('\n');
    },
    enabled: !!noteId
  });

  if (isLoadingNote || isLoadingContent) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

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
          <ReactMarkdown>{content || ''}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default Note;
