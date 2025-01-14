import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DetailPageWrapper from "./components/DetailPageWrapper";
import LayoutWrapper from "./components/LayoutWrapper";

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:alpha3Code" element={<DetailPageWrapper />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}
