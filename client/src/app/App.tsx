import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "@/pages/Dashboard";
import { Finalize } from "@/pages/Finalize";
import { Results } from "@/pages/Results";

import "./App.css";

function App() {
  const a = 1;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/results/:testId" element={<Results />} />
        <Route path="/finalize/:testId" element={<Finalize />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
