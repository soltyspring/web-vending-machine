const toneStyles = {
  dark: {
    button: "bg-slate-950 text-white shadow-slate-950/25 hover:bg-slate-800",
    icon: "bg-white text-slate-950",
  },
  warm: {
    button: "bg-slate-950 text-white shadow-slate-950/25 hover:bg-slate-800",
    icon: "bg-white text-slate-950",
  },
};

export default function TemplateStartButton({
  onClick,
  disabled = false,
  isLoading = false,
  label = "이 템플릿으로 시작하기",
  loadingLabel = "편집기 준비 중...",
  iconLabel = "T",
  tone = "dark",
  className = "",
}) {
  const styles = toneStyles[tone] || toneStyles.dark;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={[
        "inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-black",
        "shadow-2xl transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
        styles.button,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${styles.icon}`}
      >
        {iconLabel}
      </span>
      <span className="whitespace-nowrap">{isLoading ? loadingLabel : label}</span>
    </button>
  );
}
