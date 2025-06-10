"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchFilters } from "@/components/search-filters";
import { ProjectCard } from "@/components/project-card";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        const activeProjects = data.filter(
          (project: any) => project.status === "active"
        );
        setProjects(activeProjects);
        setFilteredProjects(activeProjects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters: any) => {
    let filtered = [...projects];

    if (filters.search) {
      filtered = filtered.filter(
        (project: any) =>
          project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(
        (project: any) => project.category === filters.category
      );
    }

    if (filters.priceRange && filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((project: any) => {
        if (max) {
          return project.price >= min && project.price <= max;
        } else {
          return project.price >= min;
        }
      });
    }

    if (filters.complexity && filters.complexity !== "all") {
      filtered = filtered.filter(
        (project: any) => project.complexity === filters.complexity
      );
    }

    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Projects
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our collection of professional, ready-to-deploy projects
            built with modern technologies.
          </p>
        </div>

        <SearchFilters onFilter={handleFilter} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProjects.map((project: any) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
