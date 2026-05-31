from pydantic import BaseModel, Field


class TemplateGenerateRequest(BaseModel):
    templateId: str = Field(default="shopping")
    siteName: str
    businessType: str
    tagline: str
    mood: str
    customMood: str = ""
    menus: list[str]
    customRequest: str = ""


class TemplateGenerateResponse(BaseModel):
    brandName: str
    heroBadge: str
    heroTitle: str
    heroDescription: str
    navItems: list[str]
    marqueeItems: list[str]
    featuredEyebrow: str
    featuredTitle: str
    primaryCtaLabel: str
    secondaryCtaLabel: str
    bannerTitle: str
    bannerDescription: str
    aboutTitle: str
    aboutDescription: str
    footerDescription: str
    visualSummary: str = ""
    moodKeywords: list[str] = Field(default_factory=list)
    productCards: list[dict]
    reviewCards: list[dict]
    theme: dict = Field(default_factory=dict)
