import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Server, Clock } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    price: number;
    runningCost: number;
    category: string;
    tech: string[];
    features: string[];
    complexity: string;
    setupTime: string;
    images?: string[];
  };
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <Card
      className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden ${className}`}
    >
      <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 relative overflow-hidden">
        <img
          src={
            project.images
              ? project.images[0]
              : "/placeholder.svg?height=200&width=300"
          }
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-purple-600/80 text-white">
            {project.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-600/80 text-white">
            ${project.price.toLocaleString()}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-white text-xl group-hover:text-purple-300 transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-white/70">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <div>
              <p className="text-white/60">Running Cost</p>
              <p className="text-white font-semibold">
                ${project.runningCost}/mo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-blue-400" />
            <div>
              <p className="text-white/60">Complexity</p>
              <p className="text-white font-semibold">{project.complexity}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            <div>
              <p className="text-white/60">Setup Time</p>
              <p className="text-white font-semibold">{project.setupTime}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-white/60 mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {project.features.slice(0, 3).map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="border-white/20 text-white/80 text-xs"
              >
                {feature}
              </Badge>
            ))}
            {project.features.length > 3 && (
              <Badge
                variant="outline"
                className="border-white/20 text-white/80 text-xs"
              >
                +{project.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-white/60 mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                className="bg-purple-600/20 text-purple-300 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <Link href={`/projects/${project.id}`}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
