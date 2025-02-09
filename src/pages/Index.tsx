
import Layout from "@/components/Layout";
import { Github, Twitter, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-medium mb-8">Shu Ding</h1>
      <div className="space-y-6 text-gray-600">
        <p>
          I am a designer and developer based in Berlin. My interests span a broad
          spectrum of subjects, encompassing web development, creative coding, game
          design, and human-computer interaction.
        </p>
        <p>
          Since high school, I've spent years on algorithm competitions, freelance
          web design and development. In 2017, I earned my BSc degree in Computer
          Science from Fudan University in Shanghai, and joined as a software
          engineer at Microsoft. In 2018, I joined Vercel to help build the next
          generation of web development tools.
        </p>
        <div className="pt-4 flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
