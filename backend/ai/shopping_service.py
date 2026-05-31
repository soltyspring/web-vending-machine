import json
import os
from urllib import error, request

from fastapi import HTTPException

from ai.schemas import TemplateGenerateRequest, TemplateGenerateResponse
from ai.shopping_prompt import build_shopping_prompt


SHOPPING_TEMPLATE_SCHEMA = {
    "type": "json_schema",
    "name": "shopping_template_content",
    "strict": True,
    "schema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "brandName": {"type": "string"},
            "heroBadge": {"type": "string"},
            "heroTitle": {"type": "string"},
            "heroDescription": {"type": "string"},
            "navItems": {
                "type": "array",
                "items": {"type": "string"},
                "minItems": 1,
                "maxItems": 4,
            },
            "marqueeItems": {
                "type": "array",
                "items": {"type": "string"},
                "minItems": 4,
                "maxItems": 4,
            },
            "featuredEyebrow": {"type": "string"},
            "featuredTitle": {"type": "string"},
            "primaryCtaLabel": {"type": "string"},
            "secondaryCtaLabel": {"type": "string"},
            "bannerTitle": {"type": "string"},
            "bannerDescription": {"type": "string"},
            "aboutTitle": {"type": "string"},
            "aboutDescription": {"type": "string"},
            "footerDescription": {"type": "string"},
            "visualSummary": {"type": "string"},
            "moodKeywords": {
                "type": "array",
                "items": {"type": "string"},
                "minItems": 3,
                "maxItems": 5,
            },
            "productCards": {
                "type": "array",
                "minItems": 6,
                "maxItems": 6,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "category": {"type": "string"},
                        "name": {"type": "string"},
                        "priceLabel": {"type": "string"},
                        "badge": {"type": "string"},
                    },
                    "required": ["category", "name", "priceLabel", "badge"],
                },
            },
            "reviewCards": {
                "type": "array",
                "minItems": 3,
                "maxItems": 3,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "name": {"type": "string"},
                        "role": {"type": "string"},
                        "text": {"type": "string"},
                    },
                    "required": ["name", "role", "text"],
                },
            },
            "theme": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "primaryColor": {"type": "string"},
                    "secondaryColor": {"type": "string"},
                    "accentColor": {"type": "string"},
                    "backgroundColor": {"type": "string"},
                    "surfaceColor": {"type": "string"},
                    "textColor": {"type": "string"},
                    "heroPattern": {
                        "type": "string",
                        "enum": ["soft-gradient", "editorial-spotlight", "neon-grid", "paper-cut", "mono-luxury", "pop-block"],
                    },
                    "shapeStyle": {
                        "type": "string",
                        "enum": ["sharp", "soft", "pill", "organic"],
                    },
                    "contrastLevel": {
                        "type": "string",
                        "enum": ["low", "medium", "high"],
                    },
                    "productImageScale": {
                        "type": "string",
                        "enum": ["small", "medium", "large"],
                    },
                    "density": {
                        "type": "string",
                        "enum": ["compact", "balanced", "airy"],
                    },
                },
                "required": [
                    "primaryColor",
                    "secondaryColor",
                    "accentColor",
                    "backgroundColor",
                    "surfaceColor",
                    "textColor",
                    "heroPattern",
                    "shapeStyle",
                    "contrastLevel",
                    "productImageScale",
                    "density",
                ],
            },
        },
        "required": [
            "brandName",
            "heroBadge",
            "heroTitle",
            "heroDescription",
            "navItems",
            "marqueeItems",
            "featuredEyebrow",
            "featuredTitle",
            "primaryCtaLabel",
            "secondaryCtaLabel",
            "bannerTitle",
            "bannerDescription",
            "aboutTitle",
            "aboutDescription",
            "footerDescription",
            "visualSummary",
            "moodKeywords",
            "productCards",
            "reviewCards",
            "theme",
        ],
    },
}


def generate_shopping_template(payload: TemplateGenerateRequest) -> TemplateGenerateResponse:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured.")

    system_prompt, user_prompt = build_shopping_prompt(payload)
    model = os.getenv("OPENAI_TEMPLATE_MODEL", "gpt-5.4-mini")
    request_body = {
        "model": model,
        "input": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "text": {
            "format": SHOPPING_TEMPLATE_SCHEMA,
            "verbosity": "low",
        },
        "max_output_tokens": 1800,
    }
    if model.startswith("gpt-5"):
        request_body["reasoning"] = {"effort": os.getenv("OPENAI_TEMPLATE_REASONING", "none")}

    req = request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(request_body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=60) as response:
            raw = json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="ignore")
        raise HTTPException(status_code=502, detail=f"OpenAI request failed: {detail}")
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"OpenAI request failed: {exc}")

    try:
        content = extract_response_text(raw)
        parsed = json.loads(content)
        return TemplateGenerateResponse(**parsed)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to parse OpenAI response: {exc}")


def extract_response_text(raw: dict) -> str:
    if raw.get("output_text"):
        return raw["output_text"]

    for item in raw.get("output", []):
        if item.get("type") != "message":
            continue
        for content in item.get("content", []):
            if content.get("type") == "output_text" and content.get("text"):
                return content["text"]

    raise ValueError("OpenAI response did not include output text.")
