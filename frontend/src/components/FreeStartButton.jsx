import { useState } from "react";
import { useNavigate } from "react-router-dom";

const freePlanNotes = [
  "기본 5회까지 무료 생성이 가능합니다.",
  "무료 생성 후에는 편집기, 관리자 페이지, 호스팅 기능을 이용할 수 없습니다.",
];

export function FreePlanNotice({ className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white/90 p-5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.06)] ${className}`.trim()}
    >
      <p className="text-sm font-black tracking-[-0.03em] text-slate-950 md:text-base">
        무료 이용 안내
      </p>
      <div className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-600 md:text-[15px]">
        {freePlanNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </div>
  );
}

export function FreePlanText({ className = "" }) {
  return (
    <div className={`space-y-2 text-sm font-medium leading-6 text-slate-600 md:text-[15px] ${className}`.trim()}>
      {freePlanNotes.map((note) => (
        <p key={note}>{note}</p>
      ))}
    </div>
  );
}

export default function FreeStartButton({ className = "", children }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    navigate("/signup");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex min-h-screen items-center justify-center bg-slate-950/45 px-5 py-8">
          <div className="relative top-0 w-full max-w-[560px] rounded-[40px] bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.24)] md:p-9">
            <p className="text-sm font-black tracking-[0.08em] text-slate-400">
              FREE PLAN
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-slate-950 md:text-3xl">
              무료로 시작하기 전
              <br />
              이용 범위를 확인해 주세요
            </h2>

            <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
              <FreePlanText className="space-y-3 text-slate-700 md:text-base" />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                확인 후 시작하기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
