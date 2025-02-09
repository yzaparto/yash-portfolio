
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import { notes } from "@/data/notes";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Note = () => {
  const { noteId } = useParams();
  const note = notes.find((n) => n.slug === noteId);

  const { data: content, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: async () => {
      const response = await fetch(`/notes/${noteId}.md`);
      if (!response.ok) {
        throw new Error('Failed to load note content');
      }
      const text = await response.text();
      return text.split('\n').slice(2).join('\n');
    },
    enabled: !!noteId
  });

  if (!note) {
    return (
      <Layout>
        <div>Note not found</div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/notes" className="transition-colors hover:text-foreground">Notes</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link to="/notes" className="transition-colors hover:text-foreground">{note.folder}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="transition-colors hover:text-foreground">{note.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-500">{note.folder}</div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">{note.title}</h1>
            <span className="text-gray-400">{note.date}</span>
          </div>
        </div>
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown>{content || ''}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default Note;
