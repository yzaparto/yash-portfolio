
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
    folder: "Getting Started/Introduction"
  },
  { 
    title: "Welcome Note",
    date: "2025.02.10",
    slug: "welcome",
    folder: "Getting Started/Introduction"
  },
  { 
    title: "First Project",
    date: "2025.02.11",
    slug: "first-project",
    folder: "Projects/Web Development"
  },
  { 
    title: "Check",
    date: "2025.02.11",
    slug: "check"
  },
  { 
    title: "Static Arrays",
    date: "2025.02.12",
    slug: "Python/Static Arrays"
  }
];
