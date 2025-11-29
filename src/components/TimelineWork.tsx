"use client";

import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { experience } from "@/data/profile";
import type { BulletKey } from "@/data/profile";
import { formatPeriod } from "@/utils/helpers/helpers";

export default function TimelineWork() {
  const t = useTranslations();
  const locale = "es-ES";

  return (
    <div className="w-full px-2 px-md-8 pb-8 mx-auto">
      <div className="flex flex-col justify-center">
        <div className="w-full">
          {experience.map((item) => {
            const company = t.profile.companies[item.companyId];
            const role = t.profile.roles[item.roleId];
            const period = formatPeriod(item.start, item.end, locale, t.profile.ui.present);

            const bullets =
              item.bulletsKey
                ? (t.profile.bullets[item.bulletsKey as BulletKey] ?? [])
                : [];

            return (
              <div key={`${item.companyId}-${item.start}`} className="relative pl-8 pb-8">
                <div className="flex flex-col sm:flex-row items-start mb-1
                                group-last:before:hidden
                                before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gray-300 before:self-start before:-translate-x-1/2 before:translate-y-3
                                after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-black after:border-4 after:box-content after:border-gray-300 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="flex flex-col mb-3">
                    <div className="font-semibold text-base">{company}</div>
                    <div className="text-sm text-gray-600">{role}</div>
                    <div className="text-sm font-semibold text-gray-500">{period}</div>
                  </div>
                </div>

                {bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                    {bullets.map((b, i) => (
                      <li key={`${item.companyId}-${i}`}>{b}</li>
                    ))}
                  </ul>
                )}

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm underline"
                  >
                    {t.profile.ui.view_site}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
