
import Layout from "@/components/Layout";

const notes = [
  { title: "Another Enlightment", date: "2024.09.29" },
  { title: "Enlightment", date: "2023.07.02" },
  { title: "Good Design", date: "2022.11.05" },
  { title: "On UI Animations", date: "2020.05.27" },
  { title: "The Best Things", date: "2019.07.15" },
];

const Notes = () => {
  return (
    <Layout>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.title}
            className="group flex items-center"
          >
            <a
              href="#"
              className="text-gray-900 group-hover:text-gray-600 transition-colors"
            >
              {note.title}
            </a>
            <div className="flex-1 mx-4 border-b border-dotted border-gray-300" />
            <span className="text-gray-400 text-sm">{note.date}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Notes;
