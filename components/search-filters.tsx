"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface SearchFiltersProps {
  onFilter: (filters: {
    search: string
    category: string
    priceRange: string
    complexity: string
  }) => void
}

export function SearchFilters({ onFilter }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [complexityFilter, setComplexityFilter] = useState("all")

  const handleFilterChange = () => {
    onFilter({
      search: searchTerm,
      category: categoryFilter,
      priceRange: priceFilter,
      complexity: complexityFilter,
    })
  }

  // Apply filters whenever any filter changes
  React.useEffect(() => {
    handleFilterChange()
  }, [searchTerm, categoryFilter, priceFilter, complexityFilter])

  const categories = ["E-Commerce", "Dashboard", "Backend", "CRM", "Education", "Social"]

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
            <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
            <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
            <SelectItem value="5000">$5,000+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={complexityFilter} onValueChange={setComplexityFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SearchFilters
