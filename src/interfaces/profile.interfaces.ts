export type Profile_Status = "active" | "inActive";

export interface ProfileExperience extends DefaultExperience {
  title: string;
  company: string;
  location: string;
}

export interface EducationExperience extends DefaultExperience {
  school: string;
  degree: string;
  fieldofstudy: string;
}

export interface DefaultExperience {
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
}

export interface Social {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}
