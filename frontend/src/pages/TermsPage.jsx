import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <h1 className="text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
          이용약관
        </h1>
        <p className="mt-4 text-sm text-slate-400">최종 수정일: 2026년 4월 6일</p>

        <div className="mt-10 space-y-8 text-base leading-[1.8] text-slate-700">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제1조 (목적)</h2>
            <p>
              이 약관은 Web Vending Machine(이하 "서비스")이 제공하는 AI 기반 웹사이트 자동 생성
              서비스의 이용 조건 및 절차, 서비스와 회원 간의 권리·의무 및 책임사항을 규정함을
              목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제2조 (정의)</h2>
            <p>
              ① "서비스"란 Web Vending Machine이 제공하는 AI 기반 웹페이지 자동 생성, 템플릿 선택,
              드래그 앤 드롭 편집, 서브도메인 배포 등 관련 제반 서비스를 의미합니다.
            </p>
            <p className="mt-2">
              ② "회원"이란 서비스에 가입하여 이메일 인증을 완료하고, 이 약관에 따라 서비스를
              이용하는 자를 의미합니다.
            </p>
            <p className="mt-2">
              ③ "템플릿"이란 서비스가 제공하는 웹페이지 디자인 틀로, 회원이 선택하여 자신의
              웹사이트를 생성하는 데 사용할 수 있는 것을 의미합니다.
            </p>
            <p className="mt-2">
              ④ "AI 생성 콘텐츠"란 회원의 프롬프트 입력을 기반으로 AI가 자동 생성한 HTML 웹페이지
              및 관련 코드를 의미합니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제3조 (약관의 효력 및 변경)</h2>
            <p>
              ① 이 약관은 회원이 서비스에 가입함과 동시에 효력이 발생합니다.
            </p>
            <p className="mt-2">
              ② 서비스는 관련 법령에 위배되지 않는 범위 내에서 약관을 변경할 수 있으며, 변경 시
              적용일 7일 전부터 서비스 내 공지합니다.
            </p>
            <p className="mt-2">
              ③ 변경된 약관에 동의하지 않을 경우 회원은 탈퇴할 수 있으며, 공지 후 7일 이내에
              거부 의사를 표시하지 않으면 동의한 것으로 간주합니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제4조 (회원가입 및 계정)</h2>
            <p>
              ① 회원가입은 이메일 주소와 비밀번호를 입력하고, 이메일 인증을 완료한 후 이 약관에
              동의함으로써 완료됩니다.
            </p>
            <p className="mt-2">
              ② 회원은 정확하고 최신의 정보를 제공해야 하며, 타인의 정보를 도용하여 가입할 수
              없습니다.
            </p>
            <p className="mt-2">
              ③ 하나의 이메일 주소로 하나의 계정만 생성할 수 있습니다.
            </p>
            <p className="mt-2">
              ④ 회원은 자신의 계정 정보를 안전하게 관리할 책임이 있으며, 이를 제3자에게 양도하거나
              대여할 수 없습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제5조 (서비스의 제공)</h2>
            <p>서비스는 회원에게 다음의 기능을 제공합니다.</p>
            <p className="mt-2">① AI 기반 웹페이지 자동 생성 (프롬프트 입력 방식)</p>
            <p className="mt-2">② 다양한 카테고리별 템플릿 선택 및 미리보기</p>
            <p className="mt-2">③ 드래그 앤 드롭 방식의 웹페이지 편집</p>
            <p className="mt-2">④ 생성된 웹페이지의 서브도메인 배포</p>
            <p className="mt-2">⑤ 기타 서비스가 정하는 부가 기능</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제6조 (서비스 이용 제한)</h2>
            <p>서비스는 다음 각 호에 해당하는 경우 사전 통보 없이 서비스 이용을 제한하거나 회원
              자격을 정지할 수 있습니다.</p>
            <p className="mt-2">① 타인의 정보를 도용하거나 허위 정보를 입력한 경우</p>
            <p className="mt-2">② 서비스를 이용하여 불법적인 콘텐츠를 생성하거나 배포한 경우</p>
            <p className="mt-2">③ 서비스의 정상적인 운영을 방해하는 행위를 한 경우</p>
            <p className="mt-2">④ 기타 관련 법령 또는 이 약관을 위반한 경우</p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제7조 (생성 콘텐츠의 권리)</h2>
            <p>
              ① 회원이 서비스를 통해 생성한 웹페이지의 콘텐츠에 대한 권리는 회원에게 귀속됩니다.
            </p>
            <p className="mt-2">
              ② 서비스가 제공하는 템플릿 디자인의 저작권은 서비스에 귀속되며, 회원은 서비스 내에서
              사용하는 범위에 한하여 이용할 수 있습니다.
            </p>
            <p className="mt-2">
              ③ AI가 생성한 코드는 회원이 자유롭게 수정 및 활용할 수 있으나, 이로 인해 발생하는
              법적 책임은 회원에게 있습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제8조 (서비스의 변경 및 중단)</h2>
            <p>
              ① 서비스는 운영상 필요한 경우 서비스의 전부 또는 일부를 변경하거나 중단할 수
              있습니다.
            </p>
            <p className="mt-2">
              ② 서비스 변경 또는 중단 시 회원에게 사전에 공지합니다. 다만, 불가피한 사유가 있는
              경우 사후에 공지할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제9조 (면책)</h2>
            <p>
              ① 서비스는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적 사유로 인한
              서비스 제공 불가에 대해 책임을 지지 않습니다.
            </p>
            <p className="mt-2">
              ② 서비스는 AI가 생성한 콘텐츠의 정확성, 완전성, 적법성을 보장하지 않으며, 이를
              활용하여 발생하는 문제에 대해 책임을 지지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제10조 (회원 탈퇴)</h2>
            <p>
              ① 회원은 언제든지 서비스 내 설정을 통해 탈퇴를 요청할 수 있습니다.
            </p>
            <p className="mt-2">
              ② 탈퇴 시 회원의 개인정보 및 생성 콘텐츠는 관련 법령에 따라 일정 기간 보관 후
              파기됩니다.
            </p>
            <p className="mt-2">
              ③ 배포된 웹페이지는 탈퇴 후 즉시 비활성화됩니다.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">제11조 (분쟁 해결)</h2>
            <p>
              ① 서비스와 회원 간에 발생한 분쟁은 상호 협의하여 해결합니다.
            </p>
            <p className="mt-2">
              ② 협의가 이루어지지 않을 경우 관할 법원에 소를 제기할 수 있습니다.
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
