import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <h1 className="text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
          개인정보 수집 · 이용 동의
        </h1>
        <p className="mt-4 text-sm text-slate-400">최종 수정일: 2026년 4월 6일</p>

        <div className="mt-10 space-y-8 text-base leading-[1.8] text-slate-700">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">1. 수집하는 개인정보 항목</h2>
            <p>
              서비스는 회원가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.
            </p>
            <p className="mt-2">
              ① 필수 항목: 이메일 주소, 닉네임, 비밀번호(암호화 저장)
            </p>
            <p className="mt-2">
              ② 서비스 이용 과정에서 자동 수집되는 항목: 접속 IP, 접속 시간, 브라우저 종류,
              서비스 이용 기록
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">2. 개인정보의 수집 및 이용 목적</h2>
            <p>수집된 개인정보는 다음의 목적을 위해 이용됩니다.</p>
            <p className="mt-2">
              ① 회원 식별 및 가입 의사 확인, 본인 인증
            </p>
            <p className="mt-2">
              ② AI 기반 웹페이지 생성, 템플릿 제공, 서브도메인 배포 등 서비스 제공
            </p>
            <p className="mt-2">
              ③ 서비스 개선을 위한 통계 분석 및 이용 패턴 파악
            </p>
            <p className="mt-2">
              ④ 서비스 관련 공지사항 및 고객 지원
            </p>
            <p className="mt-2">
              ⑤ 부정 이용 방지 및 서비스 안정성 확보
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              ① 회원의 개인정보는 서비스 탈퇴 시까지 보유하며, 탈퇴 요청 시 지체 없이 파기합니다.
            </p>
            <p className="mt-2">
              ② 다만, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
            </p>
            <p className="mt-2">
              ③ 전자상거래 등에서의 소비자 보호에 관한 법률에 따른 보관: 계약 또는 청약 철회에
              관한 기록 5년, 접속 기록 3개월
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">4. 개인정보의 파기 절차 및 방법</h2>
            <p>
              ① 파기 절차: 보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 별도의 DB로
              옮겨져 내부 방침 및 관련 법령에 따라 일정 기간 저장 후 파기됩니다.
            </p>
            <p className="mt-2">
              ② 파기 방법: 전자적 파일 형태의 정보는 복구 불가능한 방법으로 영구 삭제하며,
              종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각합니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">5. 개인정보의 제3자 제공</h2>
            <p>
              ① 서비스는 원칙적으로 회원의 개인정보를 제3자에게 제공하지 않습니다.
            </p>
            <p className="mt-2">
              ② 다만, 회원의 동의가 있거나 법령에 의한 요청이 있는 경우에는 예외로 합니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">6. 개인정보의 안전성 확보 조치</h2>
            <p>서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취합니다.</p>
            <p className="mt-2">① 비밀번호의 암호화 저장 및 전송</p>
            <p className="mt-2">② 해킹 등에 대비한 기술적 대책 수립</p>
            <p className="mt-2">③ 개인정보 접근 권한 제한 및 관리</p>
            <p className="mt-2">④ 개인정보 취급 직원의 최소화 및 교육</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">7. 이용자의 권리와 행사 방법</h2>
            <p>
              ① 회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다.
            </p>
            <p className="mt-2">
              ② 회원은 개인정보의 처리 정지, 삭제를 요청할 수 있으며, 서비스는 지체 없이
              조치합니다.
            </p>
            <p className="mt-2">
              ③ 회원 탈퇴를 통해 개인정보 수집 및 이용에 대한 동의를 철회할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">8. 개인정보 보호 책임자</h2>
            <p>
              서비스는 개인정보 처리에 관한 업무를 총괄하고, 회원의 불만 처리 및 피해 구제를
              위해 아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.
            </p>
            <p className="mt-2">
              담당: Web Vending Machine 운영팀
            </p>
            <p className="mt-2">
              문의: 서비스 내 고객센터 또는 이메일을 통해 연락해 주시기 바랍니다.
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
