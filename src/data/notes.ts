
export type Note = {
  title: string;
  date: string;
  slug: string;
  folder?: string;
};

export const notes: Note[] = [
  { 
    title: "Design Hashset",
    date: "2025.02.09",
    slug: "design-hashset",
    folder: "Data Structures and Algorithms"
  },
  { 
    title: "Design Min Stack",
    date: "2025.02.09",
    slug: "design-minstack",
    folder: "Data Structures and Algorithms"
  },
  { 
    title: "Implement Queue using Stacks",
    date: "2025.02.09",
    slug: "queue-using-stack",
    folder: "Data Structures and Algorithms"
  },
  { 
    title: "Design Hashmap",
    date: "2025.02.09",
    slug: "design-hashmap",
    folder: "Data Structures and Algorithms"
  }
];
