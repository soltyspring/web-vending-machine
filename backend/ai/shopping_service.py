import json
import os
from urllib import error, request

from fastapi import HTTPException

from ai.schemas import TemplateGenerateRequest, TemplateGenerateResponse
from ai.shopping_prompt import build_shopping_prompt


SHOPPING_TEMPLATE_SCHEMA = {
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
            "productCards": {
                "type": "array",
                "minItems": 4,
                "maxItems": 4,
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
    request_body = {
        "model": "gpt-4.1-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": SHOPPING_TEMPLATE_SCHEMA,
        },
    }

    req = request.Request(
        "https://api.openai.com/v1/chat/completions",
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
        content = raw["choices"][0]["message"]["content"]
        parsed = json.loads(content)
        return TemplateGenerateResponse(**parsed)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to parse OpenAI response: {exc}")
