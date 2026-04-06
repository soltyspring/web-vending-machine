import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <div className="bg-[#f5f5f6] text-slate-900">
      <Header />
      <main>
        <MainPage />
        <LoginPage />
        <SignupPage />
      </main>
    </div>
  );
}