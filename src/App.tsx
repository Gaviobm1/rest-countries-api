import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DetailPageWrapper from "./components/DetailPageWrapper";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:alpha3Code" element={<DetailPageWrapper />} />
      </Routes>
    </Router>
  );
}
