import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createApiUrl,
  createAuthHeaders,
  extractErrorMessage,
  parseJsonResponse,
} from "../lib/api";

function decodeTokenPayload(token) {
  if (!token) return {};

  try {
    const [, payload] = token.split(".");
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = window.atob(normalizedPayload);
    return JSON.parse(decodeURIComponent(escape(decodedPayload)));
  } catch {
    return {};
  }
}

const projectCards = [
  {
    title: "쇼핑몰 템플릿",
    description: "AI가 만든 쇼핑몰 초안을 확인하고 Puck 에디터에서 구조를 조정할 수 있습니다.",
    action: "편집하러 가기",
    to: "/ai-editor",
  },
  {
    title: "웹페이지 만들기",
    description: "업종, 분위기, 메뉴를 입력해 새로운 웹사이트 초안을 생성합니다.",
    action: "템플릿 선택",
    to: "/templates",
  },
];

export default function MyPage() {
  const { accessToken, isLoggedIn } = useAuth();
  const profile = decodeTokenPayload(accessToken);
  const username = profile.sub || "사용자";
  const [sites, setSites] = useState([]);
  const [usage, setUsage] = useState(null);
  const [isLoadingSites, setIsLoadingSites] = useState(false);
  const [renamingSiteId, setRenamingSiteId] = useState(null);
  const [deletingSiteId, setDeletingSiteId] = useState(null);
  const [siteError, setSiteError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadSites = async () => {
      setIsLoadingSites(true);
      setSiteError("");

      try {
        const response = await fetch(createApiUrl("/api/sites"), {
          headers: createAuthHeaders(accessToken),
        });
        const payload = await parseJsonResponse(response);

        if (!response.ok) {
          throw new Error(extractErrorMessage(payload, "저장된 웹페이지를 불러오지 못했습니다."));
        }

        setSites(payload.sites || []);
        setUsage(payload.usage || null);
      } catch (error) {
        setSiteError(error.message || "저장된 웹페이지를 불러오지 못했습니다.");
      } finally {
        setIsLoadingSites(false);
      }
    };

    loadSites();
  }, [accessToken, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleRenameSite = async (siteId, siteName) => {
    const nextName = window.prompt("템플릿 이름을 입력해 주세요.", siteName);
    if (!nextName || nextName.trim() === siteName) return;

    setRenamingSiteId(siteId);
    setSiteError("");

    try {
      const response = await fetch(createApiUrl(`/api/sites/${siteId}/name`), {
        method: "PATCH",
        headers: createAuthHeaders(accessToken, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ siteName: nextName.trim() }),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(payload, "템플릿 이름 변경에 실패했습니다."));
      }

      setSites((prev) =>
        prev.map((site) =>
          site.siteId === siteId ? { ...site, siteName: payload.siteName } : site
        )
      );
    } catch (error) {
      setSiteError(error.message || "템플릿 이름 변경에 실패했습니다.");
    } finally {
      setRenamingSiteId(null);
    }
  };

  const handleDeleteSite = async (siteId, siteName) => {
    const confirmed = window.confirm(`"${siteName}" 웹페이지를 삭제할까요?`);
    if (!confirmed) return;

    setDeletingSiteId(siteId);
    setSiteError("");

    try {
      const response = await fetch(createApiUrl(`/api/sites/${siteId}`), {
        method: "DELETE",
        headers: createAuthHeaders(accessToken),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(payload, "웹페이지 삭제에 실패했습니다."));
      }

      setSites((prev) => prev.filter((site) => site.siteId !== siteId));
      setUsage(payload.usage || null);
    } catch (error) {
      setSiteError(error.message || "웹페이지 삭제에 실패했습니다.");
    } finally {
      setDeletingSiteId(null);
    }
  };

  return (
    <section className="min-h-screen px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-8 rounded-[34px] bg-slate-950 p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-10">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-400">
            My Workspace
          </p>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="text-[2.6rem] font-black leading-none tracking-[-0.07em] md:text-[4.5rem]">
                {username}님의
                <br />
                웹페이지 작업실
              </h1>
              <p className="mt-5 max-w-[560px] text-base font-medium leading-7 text-slate-300">
                생성한 웹사이트 초안을 확인하고, 편집기에서 페이지 구조를 조정할 수 있는 공간입니다.
              </p>
            </div>
            <Link
              to="/templates"
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
            >
              웹페이지 만들기
            </Link>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">
              내 웹페이지 관리
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
              생성한 웹페이지를 확인하고, 필요한 경우 편집기로 이동해 화면 구성을 조정할 수 있습니다.
            </p>
            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
              <p className="text-xs font-black tracking-[0.12em] text-slate-400">
                FREE GENERATION
              </p>
              <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                {usage ? `${usage.remainingCount}회 남음` : "최대 5회"}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                {usage ? `${usage.usedCount}/${usage.freeLimit}회 사용` : "무료 생성 횟수 기준"}
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <Link
                to="/templates"
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-black text-slate-900 transition hover:border-slate-300 hover:bg-white"
              >
                웹페이지 만들기
                <span>→</span>
              </Link>
              <Link
                to="/ai-editor"
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-black text-slate-900 transition hover:border-slate-300 hover:bg-white"
              >
                Puck 편집기 열기
                <span>→</span>
              </Link>
            </div>
          </aside>

          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              {projectCards.map((card) => (
                <Link
                  key={card.title}
                  to={card.to}
                  className="group rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.1)]"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                    W
                  </div>
                  <h3 className="text-2xl font-black tracking-[-0.05em] text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 min-h-16 text-sm font-medium leading-6 text-slate-500">
                    {card.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-black text-slate-950">
                    {card.action}
                    <span className="ml-2 transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">
                    최근 생성 웹페이지
                  </h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    AI로 생성하고 저장한 웹페이지 초안을 확인할 수 있습니다.
                  </p>
                </div>
                <Link
                  to="/templates"
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                >
                  웹페이지 만들기
                </Link>
              </div>
              {siteError ? (
                <p className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600">
                  {siteError}
                </p>
              ) : null}

              {isLoadingSites ? (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
                  <p className="text-base font-black text-slate-700">저장된 웹페이지를 불러오는 중입니다.</p>
                </div>
              ) : null}

              {!isLoadingSites && sites.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
                  <p className="text-base font-black text-slate-700">
                    생성한 웹페이지가 여기에 표시됩니다.
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-400">
                    쇼핑몰 템플릿에서 AI 초안을 생성한 뒤 저장해 주세요.
                  </p>
                </div>
              ) : null}

              {!isLoadingSites && sites.length > 0 ? (
                <div className="mt-6 grid gap-3">
                  {sites.map((site) => (
                    <article
                      key={site.siteId}
                      className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          {site.templateType} · {site.status}
                        </p>
                        <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                          {site.siteName}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-400">
                          최근 수정: {site.updatedAt ? new Date(site.updatedAt).toLocaleString() : "-"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleRenameSite(site.siteId, site.siteName)}
                          disabled={renamingSiteId === site.siteId || deletingSiteId === site.siteId}
                          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-wait disabled:opacity-60"
                        >
                          {renamingSiteId === site.siteId ? "변경 중..." : "이름 변경"}
                        </button>
                        <Link
                          to={`/ai-editor/${site.siteId}`}
                          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
                        >
                          다시 열기
                        </Link>
                        <Link
                          to={`/sites/${site.siteId}`}
                          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                        >
                          미리보기
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteSite(site.siteId, site.siteName)}
                          disabled={deletingSiteId === site.siteId || renamingSiteId === site.siteId}
                          className="rounded-2xl border border-rose-200 bg-white px-5 py-3 text-sm font-black text-rose-600 transition hover:border-rose-500 hover:bg-rose-50 disabled:cursor-wait disabled:opacity-60"
                        >
                          {deletingSiteId === site.siteId ? "삭제 중..." : "삭제"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
