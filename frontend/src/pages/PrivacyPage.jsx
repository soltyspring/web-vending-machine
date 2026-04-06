import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <h1 className="text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
          개인정보 수집 · 이용 동의
        </h1>
        <p className="mt-4 text-sm text-slate-400">최종 수정일: 2026년 00월 00일</p>

        <div className="mt-10 space-y-8 text-base leading-[1.8] text-slate-700">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">1. 수집하는 개인정보 항목</h2>
            <p>
              서비스는 회원가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.
            </p>
            <p className="mt-2">
              TODO: 수집 항목(이메일, 닉네임, 비밀번호 등)을 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">2. 개인정보의 수집 및 이용 목적</h2>
            <p>
              TODO: 회원 식별, 서비스 제공, 고객 지원 등 이용 목적을 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              TODO: 보유 기간 및 파기 절차를 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">4. 개인정보의 제3자 제공</h2>
            <p>
              TODO: 제3자 제공 여부 및 관련 내용을 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">5. 이용자의 권리</h2>
            <p>
              TODO: 열람, 수정, 삭제 등 이용자 권리를 작성해 주세요.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/signup"
            className="rounded-2xl bg-slate-950 px-6 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
          >
            회원가입으로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  );
}
