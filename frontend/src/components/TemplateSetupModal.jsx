export default function TemplateSetupModal({
  open,
  eyebrow,
  title,
  description,
  fields,
  values,
  onChange,
  onToggle,
  onSubmit,
  onClose,
  isSubmitting = false,
  errorMessage = "",
  submitLabel = "옵션 적용하고 시작하기",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] flex min-h-screen items-center justify-center bg-slate-950/55 px-5 py-8 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="flex max-h-[calc(100vh-56px)] w-full max-w-[560px] flex-col overflow-y-auto rounded-[32px] bg-white p-6 text-slate-950 shadow-[0_28px_90px_rgba(15,23,42,0.32)] md:p-7"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.05em] md:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="닫기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-500 transition hover:bg-slate-200 disabled:cursor-wait disabled:opacity-60"
          >
            x
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {fields.map((field) => {
            if (field.type === "chips") {
              const selectedValues = values[field.name] || [];

              return (
                <div key={field.name}>
                  <label className="mb-3 block text-sm font-black text-slate-900">
                    {field.label}
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {field.options.map((option) => {
                      const selected = selectedValues.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onToggle(field.name, option)}
                          className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
                            selected
                              ? "bg-slate-950 text-white"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-black text-slate-900">
                    {field.label}
                  </span>
                  <select
                    value={values[field.name]}
                    onChange={(event) => onChange(field.name, event.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-slate-400"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            if (field.type === "textarea") {
              return (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-black text-slate-900">
                    {field.label}
                  </span>
                  <textarea
                    value={values[field.name]}
                    onChange={(event) => onChange(field.name, event.target.value)}
                    rows={field.rows || 3}
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-400"
                  />
                </label>
              );
            }

            return (
              <label key={field.name} className="block">
                <span className="mb-2 block text-sm font-black text-slate-900">
                  {field.label}
                </span>
                <input
                  type="text"
                  value={values[field.name]}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-slate-400"
                />
              </label>
            );
          })}
        </div>

        {errorMessage ? (
          <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "저장 중..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
