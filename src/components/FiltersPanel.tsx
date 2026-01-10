type MonthGroup = {
  year: string;
  months: { key: string; label: string; count: number }[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filterTitle: string;
  searchTitle: string;
  searchPlaceholder: string;
  clearSearch: string;
  filterReset: string;
  selectedMonthKey: string | null;
  onSelectMonth: (key: string | null) => void;
  query: string;
  onQueryChange: (value: string) => void;
  groupedByYearMonth: MonthGroup[];
};

export function FiltersPanel({
  isOpen,
  onClose,
  filterTitle,
  searchTitle,
  searchPlaceholder,
  clearSearch,
  filterReset,
  selectedMonthKey,
  onSelectMonth,
  query,
  onQueryChange,
  groupedByYearMonth,
}: Props) {
  return (
    <aside
      aria-label={filterTitle}
      id="filters-panel"
      className={`rounded-2xl bg-white dark:bg-gray-900 p-4 space-y-4 shadow-lg z-30 transition duration-200 xl:sticky xl:top-21 xl:h-fit xl:max-h-[80vh] xl:overflow-y-auto ${
        isOpen
          ? "fixed inset-0 top-[90px] max-h-[calc(100vh-90px)] overflow-y-auto opacity-100 translate-y-0 px-4"
          : "hidden opacity-0 -translate-y-2"
      } lg:static lg:block lg:opacity-100 lg:translate-y-0 lg:border lg:border-black/10 lg:dark:border-white/10`}
    >
      <div className="flex items-center justify-between gap-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>{searchTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          {(selectedMonthKey || query) && (
            <button
              onClick={() => {
                onSelectMonth(null);
                onQueryChange("");
              }}
              className="text-xs text-sky-500 hover:underline cursor-pointer"
            >
              {filterReset}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden inline-flex items-center justify-center rounded-md bg-transparent px-2 py-1 text-sm text-slate-700 dark:text-slate-100"
            aria-label={filterTitle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <input
          id="articles-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="text-xs text-sky-500 hover:underline cursor-pointer"
          >
            {clearSearch}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold">
        <span>{filterTitle}</span>
      </div>

      <ul className="space-y-3">
        {groupedByYearMonth.map((group) => (
          <li key={group.year} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden="true" />
              {group.year}
            </p>
            <ul className="space-y-2">
              {group.months.map((month) => {
                const isActive = selectedMonthKey === month.key;
                return (
                  <li key={month.key}>
                    <button
                      onClick={() => onSelectMonth(isActive ? null : month.key)}
                      className={`w-full text-left text-xs rounded-md px-3 py-2 transition flex items-center justify-between ${
                        isActive
                          ? "bg-sky-500 text-white shadow-sm"
                          : "bg-white dark:bg-slate-900 hover:bg-sky-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-100 border border-transparent"
                      }`}
                      aria-pressed={isActive}
                    >
                      <span>{month.label}</span>
                      <span className={`text-[11px] ${isActive ? "text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
                        {month.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
