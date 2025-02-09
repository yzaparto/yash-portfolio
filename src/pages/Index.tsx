
import Layout from "@/components/Layout";
import { Linkedin } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-medium mb-8">Yash Gupta</h1>
      <div className="space-y-6 text-gray-600">
        <p>
          I am a software engineer based out of Palo Alto, California. My interests span a broad
          spectrum of subjects, encompassing web development, creative coding, and
          human-computer interaction.
        </p>
        <div className="pt-4 flex">
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
