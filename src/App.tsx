
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import * as React from "react";

import Index from "./pages/Index";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:noteId" element={<Note />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
