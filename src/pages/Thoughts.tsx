
import Layout from "@/components/Layout";

const thoughts = [
  { title: "Another Enlightment", date: "2024.09.29" },
  { title: "Enlightment", date: "2023.07.02" },
  { title: "Good Design", date: "2022.11.05" },
  { title: "On UI Animations", date: "2020.05.27" },
  { title: "The Best Things", date: "2019.07.15" },
];

const Thoughts = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {thoughts.map((thought) => (
          <div
            key={thought.title}
            className="group flex justify-between items-center"
          >
            <a
              href="#"
              className="text-gray-900 group-hover:text-gray-600 transition-colors"
            >
              {thought.title}
            </a>
            <span className="text-gray-400 text-sm">{thought.date}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Thoughts;
