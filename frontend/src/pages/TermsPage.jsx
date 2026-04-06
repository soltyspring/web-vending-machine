import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <h1 className="text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
          이용약관
        </h1>
        <p className="mt-4 text-sm text-slate-400">최종 수정일: 2026년 00월 00일</p>

        <div className="mt-10 space-y-8 text-base leading-[1.8] text-slate-700">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제1조 (목적)</h2>
            <p>
              이 약관은 Web Vending Machine(이하 "서비스")이 제공하는 웹사이트 자동 생성 서비스의
              이용 조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제2조 (정의)</h2>
            <p>
              TODO: 서비스 내 용어 정의를 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제3조 (약관의 효력)</h2>
            <p>
              TODO: 약관 효력 및 변경에 관한 내용을 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제4조 (서비스의 제공)</h2>
            <p>
              TODO: 서비스 제공 범위 및 내용을 작성해 주세요.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제5조 (회원의 의무)</h2>
            <p>
              TODO: 회원의 의무사항을 작성해 주세요.
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
