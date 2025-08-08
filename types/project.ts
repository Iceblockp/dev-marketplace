export interface TechSpecs {
  frontend: string;
  backend: string;
  database: string;
  authentication: string;
  payments: string;
  deployment: string;
}

export interface Requirements {
  server: string;
  database: string;
  storage: string;
  bandwidth: string;
}

export type ProjectStatus = "ready" | "idea";

export type Customizable = "yes" | "no" | "partial";

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  status: ProjectStatus;
  customizable: Customizable;
  price?: number | null;
  estimatedCustomPrice?: number | null;
  estimatedDuration?: string | null;
  businessAdvantages: string[];
  useCases: string[];
  tags: string[];
  targetAudience: string[];
  businessTypes: string[];
  coverImage?: string | null;
  galleryImages: string[];
  videoDemoUrl?: string | null;
  availability: boolean;
  viewsCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateProjectData {
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  status?: ProjectStatus;
  customizable?: Customizable;
  price?: string | number | null;
  estimatedCustomPrice?: string | number | null;
  estimatedDuration?: string | null;
  businessAdvantages: string | string[];
  useCases: string | string[];
  tags: string | string[];
  targetAudience: string | string[];
  businessTypes: string | string[];
  coverImage?: string | null;
  galleryImages?: string[];
  videoDemoUrl?: string | null;
  availability?: boolean;
}
