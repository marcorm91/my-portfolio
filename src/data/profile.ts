// src/data/profile.ts
export type CompanyId =
  | "knowmadmood"
  | "digitalwolves"
  | "atsistemas"
  | "hospitaluniversitario"
  | "pymesadip";

export type RoleId =
  | "ui_senior_specialist"
  | "ui_mid_integration"
  | "ui_junior_integration"
  | "it_tech_support";

export type StudyId = "fp_wad" | "fp_sar" | "fp_smr";
export type CenterId = "ies_mar_de_cadiz";

export type BulletKey = "knowmadmood_bullets" | "digitalwolves_bullets" | "atsistemas_bullets" | "hospitaluniversitario_bullets" | "pymesadip_bullets";

export type Experience = {
  companyId: CompanyId;
  roleId: RoleId;
  start: string;
  end?: string | null;
  bulletsKey?: BulletKey;
  link?: string;
};

export type Study = {
  studyId: StudyId;
  center: CenterId;
  start: string;
  end: string;
};

export const experience: Experience[] = [
  {
    companyId: "knowmadmood",
    roleId: "ui_senior_specialist",
    start: "2023-05",
    end: null,
    bulletsKey: "knowmadmood_bullets",
  },
  {
    companyId: "digitalwolves",
    roleId: "ui_mid_integration",
    start: "2019-01",
    end: "2023-05",
    bulletsKey: "digitalwolves_bullets",
  },
  {
    companyId: "atsistemas",
    roleId: "ui_junior_integration",
    start: "2017-03",
    end: "2019-01",
    bulletsKey: "atsistemas_bullets",
  },
  {
    companyId: "hospitaluniversitario",
    roleId: "it_tech_support",
    start: "2013-03",
    end: "2013-07",
    bulletsKey: "hospitaluniversitario_bullets",
  },
  {
    companyId: "pymesadip",
    roleId: "it_tech_support",
    start: "2010-03",
    end: "2010-07",
    bulletsKey: "pymesadip_bullets",
  },
];

export const studies: Study[] = [
  { studyId: "fp_wad", center: "ies_mar_de_cadiz", start: "2015-09", end: "2017-06" },
  { studyId: "fp_sar", center: "ies_mar_de_cadiz", start: "2011-09", end: "2013-06" },
  { studyId: "fp_smr", center: "ies_mar_de_cadiz", start: "2008-09", end: "2010-06" },
];
