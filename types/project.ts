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

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string | null;
  price: number;
  runningCost: number;
  category: string;
  tech: string[];
  features: string[];
  complexity: string;
  setupTime: string;
  images: string[];
  demoUrl?: string | null;
  techSpecs?: TechSpecs | null;
  requirements?: Requirements | null;
  included: string[];
  workflow: string[];
  status: string;
  sales: number;
  revenue: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  longDescription?: string;
  price: string | number;
  runningCost: string | number;
  category: string;
  tech: string | string[];
  features: string | string[];
  complexity: string;
  setupTime: string;
  images?: string[];
  demoUrl?: string;
  techSpecs?: TechSpecs;
  requirements?: Requirements;
  included: string | string[];
  workflow: string | string[];
  status: string;
  sales?: string | number;
  revenue?: string | number;
}
