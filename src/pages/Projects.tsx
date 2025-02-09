
import Layout from "@/components/Layout";

const projects = [
  { title: "Adaptive Polynomial Curve Fitting", date: "2022.08.31" },
  { title: "SSR, Streaming, and CSS-in-JS", date: "2022.04.30" },
  { title: "COBE: WebGL Globe in 5kB", date: "2021.12.28" },
  { title: "COVID, BTC, M1", date: "2021.01.09" },
  { title: "Notes on A Programmable Web", date: "2016.05.21" },
];

const Projects = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex justify-between items-center"
          >
            <a
              href="#"
              className="text-gray-900 group-hover:text-gray-600 transition-colors"
            >
              {project.title}
            </a>
            <span className="text-gray-400 text-sm">{project.date}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Projects;
