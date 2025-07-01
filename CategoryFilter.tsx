'use client'

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategories, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category)
        return (
          <label
            key={category}
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onCategoryChange(category)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              data-testid="category-checkbox"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
              {category}
            </span>
          </label>
        )
      })}
    </div>
  )
} 