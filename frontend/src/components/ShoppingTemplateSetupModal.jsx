const moodOptions = [
  { value: "minimal", label: "미니멀" },
  { value: "luxury", label: "고급스러운" },
  { value: "warm", label: "따뜻한" },
  { value: "trendy", label: "트렌디" },
];

const menuOptions = [
  "신상품",
  "베스트셀러",
  "카테고리",
  "룩북",
  "브랜드 소개",
  "후기",
  "문의",
];

export default function ShoppingTemplateSetupModal({
  open,
  form,
  onChange,
  onToggleMenu,
  onSubmit,
  isSubmitting = false,
  errorMessage = "",
}) {
  if (!open) return null;

  return (
    <aside className="sticky top-6 mt-6 h-fit w-[420px] shrink-0 self-start border-l border-stone-200 bg-white/95 shadow-[-24px_0_60px_rgba(28,25,23,0.08)] backdrop-blur">
      <div className="flex max-h-[calc(100vh-168px)] flex-col overflow-y-auto px-5 py-6 md:px-6">
        <div className="rounded-[28px] bg-[linear-gradient(145deg,rgba(247,241,235,0.95),rgba(255,255,255,0.92))] p-5">
          <p className="text-xs font-black tracking-[0.18em] text-stone-400">
            SHOPPING TEMPLATE
          </p>
          <h2 className="mt-3 text-2xl font-black leading-[1.1] tracking-[-0.06em] text-stone-950 md:text-[2rem]">
            기본 정보를 입력하고
            <br />
            초안을 시작해 보세요
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-stone-500">
            왼쪽은 지금 템플릿 미리보기 영역입니다. 기본 정보 입력이 끝나면
            본격적으로 초안을 수정할 수 있어요.
          </p>
        </div>



        <form onSubmit={onSubmit} className="mt-6 space-y-5 pb-6">
          <div>
            <label className="mb-2 block text-sm font-black text-stone-900">
              사이트 이름
            </label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => onChange("siteName", e.target.value)}
              placeholder="예: MOOD ATELIER"
              className="h-14 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-stone-900">
              업종 / 용도
            </label>
            <input
              type="text"
              value={form.businessType}
              onChange={(e) => onChange("businessType", e.target.value)}
              placeholder="예: 여성 의류 쇼핑몰"
              className="h-14 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-stone-900">
              한 줄 소개
            </label>
            <textarea
              value={form.tagline}
              onChange={(e) => onChange("tagline", e.target.value)}
              rows={3}
              placeholder="예: 감각적인 데일리 룩을 제안하는 셀렉트샵"
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-black text-stone-900">
              분위기 선택
            </label>
            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange("mood", option.value)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    form.mood === option.value
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-black text-stone-900">
              필요한 메뉴 선택
            </label>
            <div className="flex flex-wrap gap-2.5">
              {menuOptions.map((option) => {
                const selected = form.menus.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onToggleMenu(option)}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      selected
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-stone-900">
              추가 요청
            </label>
            <textarea
              value={form.customRequest}
              onChange={(e) => onChange("customRequest", e.target.value)}
              rows={4}
              placeholder="예: 따뜻한 베이지 톤으로, 첫 화면에 베스트셀러와 리뷰를 강조해 주세요."
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400"
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-stone-950 px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "초안 생성 중..." : "적용하고 시작하기"}
          </button>
        </form>
      </div>
    </aside>
  );
}
