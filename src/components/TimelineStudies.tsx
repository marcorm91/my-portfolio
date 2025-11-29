"use client";

import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { studies } from "@/data/profile";
import type { StudyId, CenterId } from "@/data/profile";
import { formatPeriod } from "@/utils/helpers/helpers";

const TimelineStudies: React.FC = () => {
  const t = useTranslations();   
  const locale = "es-ES";      

  const studiesLabels = t.profile.studiesLabels as Record<StudyId, string>;
  const centersMap   = t.profile.centers       as Record<CenterId, string>;
  const studiesDesc =
    (t.profile as { studiesDescriptions?: Record<StudyId, string> }).studiesDescriptions;

  return (
    <div className="w-full px-2 px-md-8 pb-8 mx-auto">
      <div className="flex flex-col justify-center">
        <div className="w-full">
          {studies.map((s) => {
            const label  = studiesLabels[s.studyId];
            const center = centersMap[s.center]; 
            const period = formatPeriod(s.start, s.end, locale, t.profile.ui.present);
            const desc   = studiesDesc?.[s.studyId];

            return (
              <div key={s.studyId} className="relative pl-8 pb-8">
                <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gray-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-black after:border-4 after:box-content after:border-gray-300 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="flex flex-col mb-3">
                    <div className="font-semibold text-base">
                      {label}
                    </div>
                    <div className="text-sm text-gray-600">{center}</div>
                    <div className="text-sm font-semibold text-gray-500">{period}</div>
                  </div>
                </div>

                {desc && (
                  <div className="text-sm space-y-3">
                    <p>{desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineStudies;
