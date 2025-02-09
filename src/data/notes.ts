
export type Note = {
  title: string;
  date: string;
  slug: string;
  folder?: string;
};

export const notes: Note[] = [
  { 
    title: "Hello World",
    date: "2025.02.09",
    slug: "hello-world",
    folder: "Getting Started"
  },
  { 
    title: "Welcome Note",
    date: "2025.02.10",
    slug: "welcome",
    folder: "Getting Started"
  },
  { 
    title: "First Project",
    date: "2025.02.11",
    slug: "first-project",
    folder: "Projects"
  }
];
