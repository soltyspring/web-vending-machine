import { Link, useNavigate } from "react-router-dom";
import FreeStartButton from "./FreeStartButton";
import { useAuth } from "../context/useAuth";

const menu = [
  { label: "메인", to: "/" },
  { label: "템플릿", to: "/templates" },
];

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f5f5f6]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-3 px-3 sm:h-20 sm:px-5 md:px-8">
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white">
            W
          </span>
          <span className="hidden truncate text-xl font-black tracking-[0.08em] text-slate-700 min-[560px]:block lg:text-2xl">
            Web Vending Machine
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[15px] font-semibold text-slate-800 transition hover:text-slate-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/mypage"
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                마이페이지
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="whitespace-nowrap rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                로그인
              </Link>
              <FreeStartButton className="whitespace-nowrap rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm">
                무료로 시작하기
              </FreeStartButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
