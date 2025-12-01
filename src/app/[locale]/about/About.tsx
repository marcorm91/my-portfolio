"use client";

import ProfileCard from "@/components/ProfileCard";
import TimelineStudies from "@/components/TimelineStudies";
import TimelineWork from "@/components/TimelineWork";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";

const About: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2]);
  const t = useTranslations();

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isOpen = (i: number) => openIndexes.includes(i);

  const ids = {
    workBtn: "accordion-work-btn",
    workPanel: "accordion-work-panel",
    studiesBtn: "accordion-studies-btn",
    studiesPanel: "accordion-studies-panel",
    otherBtn: "accordion-other-btn",
    otherPanel: "accordion-other-panel",
  };

  return (
    <>
      <section className="relative z-1">
        <ProfileCard />
      </section>

      <section className="relative z-1">
        
        {/* Work */}
        <article className="mb-4">
          <div className="box-custom overflow-hidden">
            <button
              id={ids.workBtn}
              className="w-full text-left px-4 py-3 font-semibold transition flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(0)}
              aria-expanded={isOpen(0)}
              aria-controls={ids.workPanel}
              type="button"
            >
              <span className="uppercase">{t.profile.work_experience}</span>
              <Image
                src="/assets/images/chevron.svg"
                alt=""
                width={30}
                height={30}
                aria-hidden="true"
                className={`transition-transform duration-300 ${isOpen(0) ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={ids.workPanel}
              role="region"
              aria-labelledby={ids.workBtn}
              aria-hidden={!isOpen(0)}
              {...(!isOpen(0) ? { inert: "" as unknown as boolean } : {})}
              className={`transition-all duration-300 ease-in-out ${
                isOpen(0) ? "max-h-max opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-4 py-3 bg-white">
                <TimelineWork />
              </div>
            </div>
          </div>
        </article>

        {/* Studies */}
        <article className="mb-4">
          <div className="box-custom overflow-hidden">
            <button
              id={ids.studiesBtn}
              className="w-full text-left px-4 py-3 font-semibold transition flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(1)}
              aria-expanded={isOpen(1)}
              aria-controls={ids.studiesPanel}
              type="button"
            >
              <span className="uppercase">{t.profile.studies}</span>
              <Image
                src="/assets/images/chevron.svg"
                alt=""
                width={30}
                height={30}
                aria-hidden="true"
                className={`transition-transform duration-300 ${isOpen(1) ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={ids.studiesPanel}
              role="region"
              aria-labelledby={ids.studiesBtn}
              aria-hidden={!isOpen(1)}
              {...(!isOpen(1) ? { inert: "" as unknown as boolean } : {})}
              className={`transition-all duration-300 ease-in-out ${
                isOpen(1) ? "max-h-max opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-4 py-3 bg-white">
                <TimelineStudies />
              </div>
            </div>
          </div>
        </article>

        {/* Other studies */}
        <article className="mb-4">
          <div className="box-custom overflow-hidden">
            <button
              id={ids.otherBtn}
              className="w-full text-left px-4 py-3 font-semibold transition flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(2)}
              aria-expanded={isOpen(2)}
              aria-controls={ids.otherPanel}
              type="button"
            >
              <span className="uppercase">{t.about.other_studies.title}</span>
              <Image
                src="/assets/images/chevron.svg"
                alt=""
                width={30}
                height={30}
                aria-hidden="true"
                className={`transition-transform duration-300 ${isOpen(2) ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={ids.otherPanel}
              role="region"
              aria-labelledby={ids.otherBtn}
              aria-hidden={!isOpen(2)}
              {...(!isOpen(2) ? { inert: "" as unknown as boolean } : {})}
              className={`transition-all duration-300 ease-in-out ${
                isOpen(2) ? "max-h-max opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-4 pt-3 pb-6 bg-white text-sm text-gray-800 space-y-2">
                <p className="font-semibold">{t.about.other_studies.english_b1.title}</p>
                <p>{t.about.other_studies.english_b1.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {t.about.other_studies.english_b1.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </section>
      <div className="hidden md:block" aria-hidden="true">
        <div className="w-50 h-50 fixed left-16 bottom-32 rounded-full bg-gradient-to-tl from-orange-500 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
        <div className="w-80 h-80 fixed right-16 bottom-32 rounded-full bg-gradient-to-br from-gray-500 to-green-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
        <div className="w-25 h-25 fixed top-16 left-0 right-128 m-auto rounded-full bg-gradient-to-r from-blue-800 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
      </div>
    </>
  );
};

export default About;
