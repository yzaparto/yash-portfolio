
import Layout from "@/components/Layout";
import { Linkedin } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-6rem)]">
        <div className="flex-grow">
          <h1 className="text-3xl font-medium mb-8">Yash Gupta</h1>
          <div className="space-y-6 text-gray-600">
            <p>
              I am a software engineer based out of Palo Alto, California.
            </p>
            <div className="pt-4 flex">
              <a
                href="https://www.linkedin.com/in/yash-cmu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Yash Gupta. All rights reserved.
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
