export interface ExperienceLink {
  label: string;
  url: string;
  iconUrl?: string;
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  skills: string[];
  date: string;
  links?: ExperienceLink[];
}
