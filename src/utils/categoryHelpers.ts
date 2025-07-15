export interface CategoryObject {
  category_name: string;
  [key: string]: any;
}

export const getCategoryName = (
  category: string | CategoryObject | null | undefined
): string => {
  if (!category) return "Uncategorized";

  if (typeof category === "string") {
    return category;
  }

  if (typeof category === "object" && category !== null) {
    if (
      "category_name" in category &&
      typeof category.category_name === "string"
    ) {
      return category.category_name;
    }
    // Fallback for other object structures
    if ("name" in category && typeof (category as any).name === "string") {
      return (category as any).name;
    }
  }

  return "Uncategorized";
};
