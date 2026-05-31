import { Render } from "@puckeditor/core";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import {
  createApiUrl,
  createAuthHeaders,
  extractErrorMessage,
  parseJsonResponse,
} from "../lib/api";
import { getPuckTemplate } from "../puck/templatePuckRegistry";

export default function SiteViewPage() {
  const { siteId } = useParams();
  const { accessToken, isLoggedIn } = useAuth();
  const defaultTemplate = getPuckTemplate();
  const [siteName, setSiteName] = useState("웹페이지");
  const [templateType, setTemplateType] = useState("shopping");
  const [puckData, setPuckData] = useState(defaultTemplate.initialData);
  const [isLoading, setIsLoading] = useState(true);
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
          throw new Error(extractErrorMessage(payload, "웹페이지를 불러오지 못했습니다."));
        }

        const nextTemplateType = payload.templateType || "shopping";
        const template = getPuckTemplate(nextTemplateType);
        const shouldRebuildFromAiResponse =
          payload.aiResponse && (!payload.puckData || template.isLegacyData(payload.puckData));

        setSiteName(payload.siteName || "웹페이지");
        setTemplateType(nextTemplateType);
        setPuckData(
          shouldRebuildFromAiResponse
            ? template.createData(payload.aiResponse)
            : payload.puckData || template.initialData
        );
      } catch (error) {
        setErrorMessage(error.message || "웹페이지를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSite();
  }, [accessToken, isLoggedIn, siteId]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f5f5f6] px-5 pt-24">
        <div className="rounded-[28px] bg-white px-8 py-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-black text-slate-950">웹페이지를 불러오는 중입니다.</p>
          <p className="mt-2 text-xs font-semibold text-slate-400">저장된 편집 데이터를 렌더링하고 있어요.</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f5f5f6] px-5 pt-24">
        <div className="max-w-md rounded-[28px] bg-white px-8 py-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-black text-rose-600">{errorMessage}</p>
          <Link
            to="/mypage"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-xs font-black text-white"
          >
            마이페이지로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  const template = getPuckTemplate(templateType);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="sticky top-20 z-30 border-b border-black/10 bg-white/90 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-black/35">SITE VIEW</p>
            <p className="text-sm font-black text-slate-950">{siteName}</p>
          </div>
          <Link
            to={`/ai-editor/${siteId}`}
            className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5"
          >
            편집하기
          </Link>
        </div>
      </div>
      <Render config={template.config} data={puckData} />
    </div>
  );
}
