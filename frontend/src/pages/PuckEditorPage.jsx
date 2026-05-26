import { useEffect, useState } from "react";
import { Puck, Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createApiUrl,
  createAuthHeaders,
  extractErrorMessage,
  parseJsonResponse,
} from "../lib/api";
import {
  createShoppingPuckDataFromTemplate,
  initialShoppingPuckData,
  isLegacyShoppingPuckData,
  shoppingPuckConfig,
} from "../puck/shoppingPuckConfig";

export default function PuckEditorPage() {
  const { siteId } = useParams();
  const { accessToken, isLoggedIn } = useAuth();
  const [publishedData, setPublishedData] = useState(initialShoppingPuckData);
  const [previewMode, setPreviewMode] = useState(false);
  const [siteName, setSiteName] = useState("Puck JSON 편집 테스트");
  const [isLoading, setIsLoading] = useState(Boolean(siteId));
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!siteId || !isLoggedIn) return;

    const loadSite = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(createApiUrl(`/api/sites/${siteId}`), {
          headers: createAuthHeaders(accessToken),
        });
        const payload = await parseJsonResponse(response);

        if (!response.ok) {
          throw new Error(extractErrorMessage(payload, "저장된 웹페이지를 불러오지 못했습니다."));
        }

        setSiteName(payload.siteName || "저장된 웹페이지");
        const shouldRebuildFromAiResponse =
          payload.aiResponse && (!payload.puckData || isLegacyShoppingPuckData(payload.puckData));
        setPublishedData(
          shouldRebuildFromAiResponse
            ? createShoppingPuckDataFromTemplate(payload.aiResponse)
            : payload.puckData || initialShoppingPuckData
        );
      } catch (error) {
        setErrorMessage(error.message || "저장된 웹페이지를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSite();
  }, [accessToken, isLoggedIn, siteId]);

  const handlePublish = async (data) => {
    setPublishedData(data);

    if (siteId) {
      setIsSaving(true);
      setNotice("");
      setErrorMessage("");

      try {
        const response = await fetch(createApiUrl(`/api/sites/${siteId}/puck`), {
          method: "PUT",
          headers: createAuthHeaders(accessToken, {
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ puckData: data }),
        });
        const payload = await parseJsonResponse(response);

        if (!response.ok) {
          throw new Error(extractErrorMessage(payload, "Puck 편집 내용을 저장하지 못했습니다."));
        }

        setNotice("Puck 편집 내용이 DB에 저장되었습니다.");
        setLastSavedAt(new Date().toLocaleString());
      } catch (error) {
        setErrorMessage(error.message || "Puck 편집 내용을 저장하지 못했습니다.");
        return;
      } finally {
        setIsSaving(false);
      }
    }

    setPreviewMode(true);
  };

  if (siteId && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f5f5f6] px-5 pt-24">
        <div className="rounded-[28px] bg-white px-8 py-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-black text-slate-950">저장된 웹페이지를 불러오는 중입니다.</p>
          <p className="mt-2 text-xs font-semibold text-slate-400">Puck JSON을 준비하고 있습니다.</p>
        </div>
      </section>
    );
  }

  if (previewMode) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] pt-6">
        <div className="sticky top-20 z-30 border-y border-black/10 bg-white/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-black/35">PUCK PREVIEW</p>
              <p className="text-sm font-black">{siteName} 렌더링 미리보기</p>
              {notice || errorMessage ? (
                <p className={`mt-1 text-xs font-bold ${errorMessage ? "text-rose-600" : "text-emerald-600"}`}>
                  {errorMessage || notice}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className="rounded-full bg-black px-4 py-2 text-xs font-black text-white"
            >
              편집기로 돌아가기
            </button>
          </div>
        </div>
        <Render config={shoppingPuckConfig} data={publishedData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6]">
      <div className="border-b border-black/10 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-[0.18em] text-black/35">AI EDITOR MVP</p>
          <h1 className="mt-1 text-2xl font-black tracking-[-0.04em]">{siteName}</h1>
          <p className="mt-2 text-sm font-semibold text-black/55">
            Publish를 누르면 Puck JSON이 DB에 저장되고 렌더링 미리보기로 전환됩니다.
          </p>
          {errorMessage ? (
            <p className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600">
              {errorMessage}
            </p>
          ) : null}
          {notice ? (
            <p className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">
              {notice}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-4 py-2 text-xs font-black ${
                isSaving
                  ? "bg-blue-50 text-blue-600"
                  : errorMessage
                    ? "bg-rose-50 text-rose-600"
                    : lastSavedAt
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
              }`}
            >
              {isSaving
                ? "저장 중..."
                : errorMessage
                  ? "저장 실패"
                  : lastSavedAt
                    ? `마지막 저장: ${lastSavedAt}`
                    : siteId
                      ? "Publish를 누르면 DB에 저장됩니다."
                      : "미리보기 전용 에디터입니다."}
            </span>
            {siteId ? (
              <Link
                to={`/sites/${siteId}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                완성 페이지 보기
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-180px)]">
        <Puck
          config={shoppingPuckConfig}
          data={publishedData}
          onPublish={handlePublish}
          headerTitle={isSaving ? "저장 중..." : "Web Vending Machine AI Editor"}
          headerPath={siteId ? `/ai-editor/${siteId}` : "/ai-editor"}
          iframe={{ enabled: false }}
        />
      </div>
    </div>
  );
}
