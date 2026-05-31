#!/usr/bin/env python3
import argparse
import json
import sys
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
BACKEND_DIR = ROOT_DIR / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from dotenv import load_dotenv

from ai.schemas import TemplateGenerateRequest
from ai.shopping_service import generate_shopping_template


def build_payload(mood: str) -> TemplateGenerateRequest:
    return TemplateGenerateRequest(
        templateId="shopping",
        siteName="MINT RUNNER",
        businessType="러닝화 편집샵",
        tagline="가볍고 청량한 러닝 라이프를 제안하는 스토어",
        mood=mood,
        customMood="",
        menus=["신상품", "러닝화", "기록용품"],
        customRequest="무드가 첫 화면 색감, 상품명, 배지, 카드 형태에서 즉시 보이게 해줘.",
    )


def main():
    parser = argparse.ArgumentParser(description="Compare GPT template generation outputs by mood.")
    parser.add_argument(
        "--moods",
        default="minimal,luxury,warm,trendy",
        help="Comma-separated moods to test.",
    )
    args = parser.parse_args()

    load_dotenv(BACKEND_DIR / ".env")
    moods = [item.strip() for item in args.moods.split(",") if item.strip()]
    results = []

    for mood in moods:
        started_at = time.perf_counter()
        result = generate_shopping_template(build_payload(mood))
        elapsed_ms = int((time.perf_counter() - started_at) * 1000)
        results.append(
            {
                "mood": mood,
                "elapsedMs": elapsed_ms,
                "heroTitle": result.heroTitle,
                "visualSummary": result.visualSummary,
                "moodKeywords": result.moodKeywords,
                "theme": result.theme,
                "firstProduct": result.productCards[0] if result.productCards else {},
            }
        )

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
