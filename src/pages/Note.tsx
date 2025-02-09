
import React from 'react';
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { notes } from "@/data/notes";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const Note = () => {
  const { noteId } = useParams();
  const note = notes.find((n) => n.slug === noteId);

  const { data: content, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}notes/${noteId}.md`);
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

  const folderPath = note.folder?.split('/') || ['Uncategorized'];

  return (
    <Layout>
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/notes" className="transition-colors hover:text-foreground">Notes</Link>
            </BreadcrumbItem>
            {folderPath.map((folder, index) => (
              <React.Fragment key={folder}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <Link to="/notes" className="transition-colors hover:text-foreground">
                    {folder}
                  </Link>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="transition-colors hover:text-foreground">{note.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">{note.title}</h1>
            <span className="text-gray-400">{note.date}</span>
          </div>
        </div>
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const inline = className?.includes('inline');
                
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: '1.5em 0',
                      padding: '1em',
                      borderRadius: '0.5rem',
                      border: 'none'
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default Note;
