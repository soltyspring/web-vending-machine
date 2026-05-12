import { useState } from "react";
import { Puck, Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { initialShoppingPuckData, shoppingPuckConfig } from "../puck/shoppingPuckConfig";

export default function PuckEditorPage() {
  const [publishedData, setPublishedData] = useState(initialShoppingPuckData);
  const [previewMode, setPreviewMode] = useState(false);

  const handlePublish = (data) => {
    setPublishedData(data);
    setPreviewMode(true);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] pt-6">
        <div className="sticky top-20 z-30 border-y border-black/10 bg-white/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-black/35">PUCK PREVIEW</p>
              <p className="text-sm font-black">저장된 Puck JSON 렌더링 미리보기</p>
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
          <h1 className="mt-1 text-2xl font-black tracking-[-0.04em]">Puck JSON 편집 테스트</h1>
          <p className="mt-2 text-sm font-semibold text-black/55">
            AI 연동 전 단계입니다. 하드코딩된 쇼핑몰 Puck JSON을 편집하고 Publish로 렌더링 결과를 확인합니다.
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh-180px)]">
        <Puck
          config={shoppingPuckConfig}
          data={publishedData}
          onPublish={handlePublish}
          headerTitle="Web Vending Machine AI Editor"
          headerPath="/ai-editor"
          iframe={{ enabled: false }}
        />
      </div>
    </div>
  );
}
