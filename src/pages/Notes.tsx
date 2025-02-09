
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { notes } from "@/data/notes";

const Notes = () => {
  const navigate = useNavigate();

  // Group notes by folder
  const notesByFolder = notes.reduce<Record<string, typeof notes>>((acc, note) => {
    const folder = note.folder || "Uncategorized";
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(note);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="space-y-4">
        {Object.entries(notesByFolder).map(([folder, folderNotes]) => (
          <Collapsible key={folder} defaultOpen={true}>
            <CollapsibleTrigger className="flex items-center w-full text-left py-2 hover:bg-gray-50 rounded-lg px-2">
              <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200 [&[data-state=open]>svg]:rotate-90" />
              <span className="font-medium text-gray-700">{folder}</span>
              <span className="ml-2 text-sm text-gray-500">({folderNotes.length})</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-1 ml-6">
                {folderNotes.map((note) => (
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
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </Layout>
  );
};

export default Notes;
