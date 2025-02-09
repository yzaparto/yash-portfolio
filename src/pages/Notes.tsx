
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { notes, Note as NoteType } from "@/data/notes";

type FolderStructure = {
  [key: string]: {
    notes: NoteType[];
    subfolders: FolderStructure;
  };
};

const Notes = () => {
  const navigate = useNavigate();

  // Create nested folder structure
  const createFolderStructure = (notesList: NoteType[]): FolderStructure => {
    const structure: FolderStructure = {};

    notesList.forEach((note) => {
      const folderPath = note.folder?.split('/') || ['Uncategorized'];
      let currentLevel = structure;

      folderPath.forEach((folder, index) => {
        if (!currentLevel[folder]) {
          currentLevel[folder] = {
            notes: [],
            subfolders: {},
          };
        }

        if (index === folderPath.length - 1) {
          currentLevel[folder].notes.push(note);
        }

        currentLevel = currentLevel[folder].subfolders;
      });
    });

    return structure;
  };

  const renderFolder = (
    folderName: string,
    folder: { notes: NoteType[]; subfolders: FolderStructure },
    level: number = 0
  ) => {
    return (
      <Collapsible key={folderName} defaultOpen={level < 2}>
        <CollapsibleTrigger 
          className="flex items-center w-full text-left py-2 hover:bg-gray-50 rounded-lg px-2"
          style={{ paddingLeft: `${(level * 1) + 0.5}rem` }}
        >
          <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200 [&[data-state=open]>svg]:rotate-90" />
          <span className="font-medium text-gray-700">{folderName}</span>
          <span className="ml-2 text-sm text-gray-500">({folder.notes.length})</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-1">
            {Object.entries(folder.subfolders).map(([subfolderName, subfolder]) => (
              renderFolder(subfolderName, subfolder, level + 1)
            ))}
            <div className="ml-6" style={{ marginLeft: `${(level * 1) + 1.5}rem` }}>
              {folder.notes.map((note) => (
                <div
                  key={note.slug}
                  className="group flex items-center min-w-0 cursor-pointer py-1"
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
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const folderStructure = createFolderStructure(notes);

  return (
    <Layout>
      <div className="space-y-4">
        {Object.entries(folderStructure).map(([folderName, folder]) => 
          renderFolder(folderName, folder)
        )}
      </div>
    </Layout>
  );
};

export default Notes;
