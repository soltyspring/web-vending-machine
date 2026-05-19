import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import TemplatesPage from "./pages/TemplatesPage";
import ShoppingTemplateStore from "./pages/ShoppingTemplateStore";
import WeddingTemplate from "./pages/WeddingTemplate";
import PuckEditorPage from "./pages/PuckEditorPage";
import MyPage from "./pages/MyPage";

export default function App() {
  return (
    <div className="bg-[#f5f5f6] text-slate-900">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/shopping" element={<ShoppingTemplateStore />} />
          <Route path="/templates/wedding" element={<WeddingTemplate />} />
          <Route path="/ai-editor" element={<PuckEditorPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
    </div>
  );
}
