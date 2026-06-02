import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredModal from "../components/LoginRequiredModal";
import TemplateStartButton from "../components/TemplateStartButton";
import { useAuth } from "../context/useAuth";
import {
  createApiUrl,
  createAuthHeaders,
  extractErrorMessage,
  parseJsonResponse,
} from "../lib/api";
import {
  createNeonPuckDataFromTemplate,
  neonTemplateContent,
} from "../puck/neonPuckConfig";

const orbitItems = ["DROP", "SIGNAL", "HYPE", "BOOST"];

export default function NeonTemplate() {
  const navigate = useNavigate();
  const { accessToken, isLoggedIn } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewNotice, setPreviewNotice] = useState("");

  const handlePreviewOnlyAction = (label) => {
    setPreviewNotice(`${label} 기능은 템플릿 미리보기용입니다.`);
    window.setTimeout(() => setPreviewNotice(""), 2200);
  };

  const handleStart = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSavingSite(true);
    setErrorMessage("");

    try {
      const response = await fetch(createApiUrl("/api/sites"), {
        method: "POST",
        headers: createAuthHeaders(accessToken, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          templateType: "neon",
          siteName: neonTemplateContent.brandName,
          aiRequest: {
            templateId: "neon",
            source: "default-neon-template",
          },
          aiResponse: neonTemplateContent,
          puckData: createNeonPuckDataFromTemplate(neonTemplateContent),
        }),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(payload, "네온 템플릿 저장에 실패했습니다."));
      }

      navigate(`/ai-editor/${payload.siteId}`);
    } catch (error) {
      setErrorMessage(error.message || "네온 템플릿 저장에 실패했습니다.");
    } finally {
      setIsSavingSite(false);
    }
  };

  const handleLoginPromptLogin = () => {
    setShowLoginPrompt(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setShowCTA(window.scrollY > 280);

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060a] pt-20 text-white">
      <div className="sticky top-20 z-50 border-b border-white/10 bg-black/80 px-4 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 text-xs font-bold text-white/55">
            <span className="truncate">네온 런칭 템플릿 미리보기</span>
            <span className="text-white/20">|</span>
            <Link to="/templates" className="shrink-0 text-white underline underline-offset-4">
              목록으로
            </Link>
          </div>
          <button
            type="button"
            onClick={handleStart}
            disabled={isSavingSite}
            className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-black transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {isSavingSite ? "준비 중..." : "시작하기"}
          </button>
        </div>
      </div>

      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden px-5 py-12 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.28),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(236,72,153,0.25),transparent_30%),radial-gradient(circle_at_48%_88%,rgba(163,230,53,0.18),transparent_32%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-180px)] max-w-[1280px] flex-col justify-between">
          <header className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => handlePreviewOnlyAction("브랜드 메뉴")}
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-300/10 text-xs font-black text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                ND
              </span>
              <span className="text-sm font-black tracking-[0.24em] text-white/80">
                {neonTemplateContent.brandName}
              </span>
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => handlePreviewOnlyAction("미리보기 로그인")}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/70 transition hover:border-white/35 hover:text-white"
              >
                미리보기 로그인
              </button>
              <button
                type="button"
                onClick={() => handlePreviewOnlyAction("미리보기 등록")}
                className="rounded-full bg-white px-4 py-2 text-xs font-black text-black transition hover:-translate-y-0.5"
              >
                미리보기 등록
              </button>
            </div>
          </header>

          <div className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.32em] text-cyan-200">
                {neonTemplateContent.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                새로운 브랜드를
                <br />
                가장 크게 터뜨리는
                <br />
                첫 화면
              </h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-white/62 md:text-lg">
                {neonTemplateContent.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handlePreviewOnlyAction("런칭 시작하기")}
                  className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-black shadow-[0_0_36px_rgba(34,211,238,0.45)] transition hover:-translate-y-0.5"
                >
                  {neonTemplateContent.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => handlePreviewOnlyAction("하이라이트 보기")}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:border-white/50"
                >
                  {neonTemplateContent.secondaryCta}
                </button>
              </div>
            </div>

            <div className="relative min-h-[420px] rounded-[34px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-400/30 blur-3xl" />
              <div className="absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="relative flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-black/35 p-6">
                <div className="grid grid-cols-3 gap-3">
                  {neonTemplateContent.stats.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                        {item.label}
                      </p>
                      <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 aspect-[1.15] rounded-[30px] border border-cyan-200/25 bg-[conic-gradient(from_140deg,#22d3ee,#ec4899,#a3e635,#22d3ee)] p-[1px]">
                  <div className="flex h-full flex-col justify-between rounded-[29px] bg-[#070911] p-6">
                    <div className="flex items-center justify-between">
                      <span className="h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_22px_rgba(190,242,100,0.9)]" />
                      <span className="text-xs font-black tracking-[0.2em] text-white/40">DROP CARD</span>
                    </div>
                    <div>
                      <p className="text-6xl font-black tracking-[-0.08em] text-white">01</p>
                      <p className="mt-2 text-sm font-bold leading-6 text-white/55">
                        움직이는 듯한 네온 패널로 런칭의 에너지를 보여줍니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  {orbitItems.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePreviewOnlyAction(item)}
                      className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-black text-white/65 transition hover:border-cyan-200/40 hover:text-cyan-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lime-300 px-5 py-20 text-black md:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
            한 화면에서 보이는 런칭 포인트
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {neonTemplateContent.highlights.map((item, index) => (
              <article key={item} className="rounded-[26px] border-2 border-black bg-white px-5 py-6 shadow-[8px_8px_0_#000]">
                <p className="text-xs font-black text-black/45">POINT {index + 1}</p>
                <p className="mt-3 text-2xl font-black tracking-[-0.04em]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#05060a] px-5 py-20 text-white md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="max-w-3xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            왜 이 템플릿이 튀는가
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {neonTemplateContent.features.map((item, index) => (
              <article key={item.title} className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-black text-cyan-200">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-white/55">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-x-0 bottom-8 z-50 flex justify-center px-5 transition-all duration-500 ${
          showCTA ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <TemplateStartButton
          onClick={handleStart}
          isLoading={isSavingSite}
          iconLabel="N"
          label="이 템플릿으로 시작하기"
        />
      </div>

      {errorMessage ? (
        <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-5">
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 shadow-lg">
            {errorMessage}
          </p>
        </div>
      ) : null}

      {previewNotice ? (
        <div className="fixed inset-x-0 bottom-28 z-[70] flex justify-center px-5">
          <p className="rounded-full border border-white/20 bg-slate-950 px-5 py-3 text-xs font-black text-white shadow-2xl shadow-black/25">
            {previewNotice}
          </p>
        </div>
      ) : null}

      <LoginRequiredModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={handleLoginPromptLogin}
      />
    </div>
  );
}
