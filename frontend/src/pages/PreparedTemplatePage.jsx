import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredModal from "../components/LoginRequiredModal";
import TemplateStartButton from "../components/TemplateStartButton";
import TemplateSetupModal from "../components/TemplateSetupModal";
import { useAuth } from "../context/useAuth";
import {
  createApiUrl,
  createAuthHeaders,
  extractErrorMessage,
  parseJsonResponse,
} from "../lib/api";
import { createPreparedPuckDataFromTemplate } from "../puck/preparedPuckConfig";
import {
  buildPreparedTemplateContent,
  getPreparedTemplateContent,
} from "../puck/preparedTemplateContent";

function makeSetupFields(content) {
  return [
    { name: "siteName", label: content.siteNameLabel, placeholder: content.siteNamePlaceholder },
    {
      name: "templateStyle",
      label: content.typeLabel,
      type: "select",
      options: content.typeOptions,
    },
    {
      name: "goals",
      label: content.goalsLabel,
      type: "chips",
      options: content.goals,
    },
    {
      name: "targetAudience",
      label: content.audienceLabel,
      placeholder: content.audiencePlaceholder,
    },
    {
      name: "mainOffer",
      label: content.scheduleLabel,
      placeholder: content.schedulePlaceholder,
    },
    {
      name: "mood",
      label: content.moodLabel,
      type: "select",
      options: content.moodOptions,
    },
    {
      name: "customRequest",
      label: "추가 요청",
      type: "textarea",
      placeholder: "예: 첫 화면에 전환 버튼을 더 강하게 보여주세요.",
    },
  ];
}

function makeInitialForm(content) {
  return {
    siteName: content.brandName,
    templateStyle: content.typeOptions[0]?.value || "",
    goals: content.goals.slice(0, 3),
    targetAudience: content.audiencePlaceholder.replace("예: ", ""),
    mainOffer: content.schedulePlaceholder.replace("예: ", ""),
    mood: content.moodOptions[0]?.value || "",
    customRequest: "",
  };
}

export default function PreparedTemplatePage({ templateType }) {
  const navigate = useNavigate();
  const { accessToken, isLoggedIn } = useAuth();
  const baseContent = useMemo(() => getPreparedTemplateContent(templateType), [templateType]);
  const [setupForm, setSetupForm] = useState(() => makeInitialForm(baseContent));
  const [activePage, setActivePage] = useState(baseContent.navItems[0]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewNotice, setPreviewNotice] = useState("");

  const content = useMemo(
    () => buildPreparedTemplateContent(templateType, setupForm),
    [setupForm, templateType]
  );
  const setupFields = useMemo(() => makeSetupFields(baseContent), [baseContent]);
  const colors = content.colors;
  const activeSubpage = content.subpages[activePage] || content.subpages[content.navItems[0]];

  const showPreviewNotice = (label) => {
    setPreviewNotice(`${label} 기능은 템플릿 미리보기용입니다.`);
    window.setTimeout(() => setPreviewNotice(""), 2200);
  };

  const handleFormChange = (key, value) => {
    setSetupForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleOption = (key, value) => {
    setSetupForm((prev) => {
      const current = prev[key] || [];

      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleStart = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setErrorMessage("");
    setShowSetupModal(true);
  };

  const handleSetupSubmit = async (event) => {
    event.preventDefault();
    setIsSavingSite(true);
    setErrorMessage("");

    try {
      const generatedContent = buildPreparedTemplateContent(templateType, setupForm);
      const response = await fetch(createApiUrl("/api/sites"), {
        method: "POST",
        headers: createAuthHeaders(accessToken, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          templateType,
          siteName: generatedContent.brandName,
          aiRequest: {
            templateId: templateType,
            source: `${templateType}-start-options`,
            ...setupForm,
          },
          aiResponse: generatedContent,
          puckData: createPreparedPuckDataFromTemplate(generatedContent),
        }),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(payload, `${content.category} 템플릿 저장에 실패했습니다.`));
      }

      setShowSetupModal(false);
      navigate(`/ai-editor/${payload.siteId}`);
    } catch (error) {
      setErrorMessage(error.message || `${content.category} 템플릿 저장에 실패했습니다.`);
    } finally {
      setIsSavingSite(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setShowCTA(window.scrollY > 320);

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSetupForm(makeInitialForm(baseContent));
    setActivePage(baseContent.navItems[0]);
  }, [baseContent]);

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: colors.background, color: colors.ink }}>
      <div className="sticky top-20 z-50 border-b border-black/10 bg-white/85 px-4 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 text-xs font-bold text-slate-500">
            <span className="truncate">{content.category} 템플릿 미리보기</span>
            <span className="text-slate-300">|</span>
            <Link to="/templates" className="shrink-0 text-slate-900 underline underline-offset-4">
              목록으로
            </Link>
          </div>
          <button
            type="button"
            onClick={handleStart}
            disabled={isSavingSite}
            className="rounded-lg px-4 py-2 text-xs font-black transition hover:-translate-y-0.5 disabled:opacity-60"
            style={{ backgroundColor: colors.primary, color: colors.ink }}
          >
            {isSavingSite ? "준비 중..." : "시작하기"}
          </button>
        </div>
      </div>

      <header className="px-5 py-4 md:px-8" style={{ backgroundColor: colors.surface }}>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={() => showPreviewNotice("브랜드 메뉴")} className="text-xl font-black">
            {content.brandName}
          </button>
          <nav className="flex flex-wrap gap-2">
            {content.navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActivePage(item)}
                className="rounded-lg px-4 py-2 text-sm font-black transition"
                style={{
                  backgroundColor: activePage === item ? colors.secondary : "transparent",
                  color: activePage === item ? "#ffffff" : colors.muted,
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: colors.muted }}>
              {content.previewLabel}
            </p>
            <h1 className="mt-5 max-w-4xl break-keep text-5xl font-black leading-[1.02] md:text-7xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl break-keep text-base font-semibold leading-7 md:text-lg" style={{ color: colors.muted }}>
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleStart}
                className="rounded-lg px-6 py-3 text-sm font-black transition hover:-translate-y-0.5"
                style={{ backgroundColor: colors.primary, color: colors.ink }}
              >
                {content.primaryCta}
              </button>
              <button
                type="button"
                onClick={() => showPreviewNotice(content.secondaryCta)}
                className="rounded-lg border px-6 py-3 text-sm font-black"
                style={{ borderColor: colors.ink, color: colors.ink }}
              >
                {content.secondaryCta}
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 p-4 shadow-xl shadow-black/10" style={{ backgroundColor: colors.surface }}>
            <div className="grid gap-3 sm:grid-cols-3">
              {content.stats.map((item) => (
                <article key={item.label} className="rounded-lg border border-black/10 p-4">
                  <p className="text-xs font-black uppercase" style={{ color: colors.muted }}>{item.label}</p>
                  <p className="mt-3 break-keep text-2xl font-black">{item.value}</p>
                </article>
              ))}
            </div>
            <div className="mt-4 rounded-lg p-6" style={{ backgroundColor: colors.accent }}>
              <p className="text-xs font-black uppercase opacity-55">현재 서브페이지</p>
              <h2 className="mt-4 break-keep text-3xl font-black leading-tight text-black md:text-4xl">
                {activeSubpage.title}
              </h2>
              <p className="mt-4 break-keep text-sm font-bold leading-6 text-black/65">
                {activeSubpage.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8" style={{ backgroundColor: colors.surface }}>
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: colors.muted }}>
                Detail Pages
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-6xl">서브페이지 구성</h2>
            </div>
            <p className="max-w-xl text-sm font-semibold leading-6" style={{ color: colors.muted }}>
              상단 탭을 누르면 실제 템플릿 내부 페이지 흐름이 바뀝니다. 저장 후 편집기에서는 각 섹션을 블록 단위로 수정할 수 있습니다.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {Object.entries(content.subpages).map(([label, page]) => (
              <button
                key={label}
                type="button"
                onClick={() => setActivePage(label)}
                className="rounded-lg border border-black/10 p-5 text-left transition hover:-translate-y-0.5"
                style={{ backgroundColor: activePage === label ? colors.background : "#ffffff" }}
              >
                <p className="text-sm font-black" style={{ color: colors.primary }}>{label}</p>
                <h3 className="mt-4 break-keep text-xl font-black">{page.title}</h3>
                <p className="mt-3 break-keep text-sm font-semibold leading-6" style={{ color: colors.muted }}>
                  {page.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="text-4xl font-black md:text-6xl">핵심 기능</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.features.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-black/10 p-6" style={{ backgroundColor: colors.surface }}>
                <p className="text-xs font-black" style={{ color: colors.muted }}>0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 break-keep text-sm font-semibold leading-6" style={{ color: colors.muted }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8" style={{ backgroundColor: colors.secondary, color: "#ffffff" }}>
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] opacity-45">Selectable Sections</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">선택 가능한 구성</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.packages.map((item) => (
              <article key={item.title} className="rounded-lg bg-white p-6 text-black">
                <p className="text-sm font-black opacity-45">{item.title}</p>
                <p className="mt-5 text-3xl font-black">{item.price}</p>
                <p className="mt-5 break-keep text-sm font-semibold leading-6 opacity-65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8" style={{ backgroundColor: colors.surface }}>
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: colors.muted }}>
              Process
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">사용자가 따라가는 흐름</h2>
          </div>
          <div className="grid gap-3">
            {content.process.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-4 rounded-lg border border-black/10 bg-white p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black" style={{ backgroundColor: colors.primary }}>
                  {index + 1}
                </span>
                <p className="text-lg font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-5 py-14 md:px-8" style={{ backgroundColor: colors.ink, color: "#ffffff" }}>
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-3xl font-black">{content.brandName}</p>
            <p className="mt-4 max-w-xl break-keep text-sm font-semibold leading-7 text-white/60">{content.heroDescription}</p>
          </div>
          <TemplateStartButton
            onClick={handleStart}
            isLoading={isSavingSite}
            iconLabel={content.brandName.slice(0, 1)}
            label="이 템플릿으로 시작하기"
          />
        </div>
      </footer>

      <div
        className={`fixed inset-x-0 bottom-8 z-50 flex justify-center px-5 transition-all duration-500 ${
          showCTA ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <TemplateStartButton
          onClick={handleStart}
          isLoading={isSavingSite}
          iconLabel={content.brandName.slice(0, 1)}
          label="이 템플릿으로 시작하기"
        />
      </div>

      {errorMessage ? (
        <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-5">
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 shadow-lg">
            {errorMessage}
          </p>
        </div>
      ) : null}

      {previewNotice ? (
        <div className="fixed inset-x-0 bottom-28 z-[70] flex justify-center px-5">
          <p className="rounded-lg bg-slate-950 px-5 py-3 text-xs font-black text-white shadow-2xl shadow-black/25">
            {previewNotice}
          </p>
        </div>
      ) : null}

      <LoginRequiredModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={() => {
          setShowLoginPrompt(false);
          navigate("/login");
        }}
      />
      <TemplateSetupModal
        open={showSetupModal}
        eyebrow={content.setupEyebrow}
        title={content.setupTitle}
        description={content.setupDescription}
        fields={setupFields}
        values={setupForm}
        onChange={handleFormChange}
        onToggle={handleToggleOption}
        onSubmit={handleSetupSubmit}
        onClose={() => setShowSetupModal(false)}
        isSubmitting={isSavingSite}
        errorMessage={errorMessage}
        submitLabel={content.setupSubmitLabel}
      />
    </div>
  );
}
