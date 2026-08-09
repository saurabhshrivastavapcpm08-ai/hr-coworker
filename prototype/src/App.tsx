import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CaseStudy } from "./pages/CaseStudy";
import { PrototypePage } from "./pages/PrototypePage";

/** Kept for Vite template compatibility; entry is main.tsx */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CaseStudy />} />
        <Route path="/prototype" element={<PrototypePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
