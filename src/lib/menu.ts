import { supabase } from "./supabase";

export type MenuFile = {
  id: string;
  file_path: string;
  position: number;
};

export type MenuCategory = {
  id: string;
  name: string;
  position: number;
  files: MenuFile[];
};

export async function getMenuData(): Promise<MenuCategory[]> {
  const restaurantId = process.env.REACT_APP_RESTAURANT_ID!;

  const { data: categories } = await supabase
    .from("menu_categories")
    .select("id, name, position")
    .eq("restaurant_id", restaurantId)
    .order("position");

  if (!categories || categories.length === 0) return [];

  const { data: files } = await supabase
    .from("menu_files")
    .select("id, category_id, file_path, position")
    .eq("restaurant_id", restaurantId)
    .order("position");

  return categories.map((cat) => ({
    ...cat,
    files: ((files ?? []) as (MenuFile & { category_id: string })[])
      .filter((f) => f.category_id === cat.id)
      .sort((a, b) => a.position - b.position),
  }));
}

export function getMenuFileUrl(filePath: string): string {
  return `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/menus/${filePath}`;
}

export type Formule = {
  id: string;
  nom: string;
  prix: number;
  description: string | null;
  elements: string[];
  active: boolean;
};

export async function getFormules(): Promise<Formule[]> {
  const restaurantId = process.env.REACT_APP_RESTAURANT_ID!;

  const { data } = await supabase
    .from("formules")
    .select("id, nom, prix, description, elements, active")
    .eq("restaurant_id", restaurantId)
    .eq("active", true)
    .order("created_at");

  return (data ?? []) as Formule[];
}
