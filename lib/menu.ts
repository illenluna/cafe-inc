import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { slugify } from "./slug";

export type MenuCategory = "Cafés" | "Bebidas Frias" | "Lanches" | "Sobremesas";

export type MenuItem = {
  slug: string;
  name: string;
  category: MenuCategory;
  description: string;
  priceLabel: string;
  badges: string[];
  imagePath: string;
  hasImage: boolean;
};

export const MENU_CATEGORIES: MenuCategory[] = ["Cafés", "Bebidas Frias", "Lanches", "Sobremesas"];

type MenuCsvRow = {
  nome: string;
  categoria: string;
  descricao: string;
  preco: string;
  selos: string;
};

let cache: MenuItem[] | null = null;

export function getAllMenuItems(): MenuItem[] {
  if (cache) return cache;

  const csvPath = path.join(process.cwd(), "docs/design/menu-itens.csv");
  const rows = parse(readFileSync(csvPath, "utf-8"), {
    columns: true,
    skip_empty_lines: true,
  }) as MenuCsvRow[];

  const seenSlugs = new Set<string>();
  cache = rows.map((row) => {
    const slug = slugify(row.nome);
    if (seenSlugs.has(slug)) {
      throw new Error(`Slug de menu duplicado "${slug}" para "${row.nome}" — ajuste o nome ou a slugify().`);
    }
    seenSlugs.add(slug);

    const imagePath = `/menu/${slug}.jpg`;
    return {
      slug,
      name: row.nome,
      category: row.categoria as MenuCategory,
      description: row.descricao,
      priceLabel: row.preco,
      badges: row.selos?.trim() ? [row.selos.trim()] : [],
      imagePath,
      hasImage: existsSync(path.join(process.cwd(), "public/menu", `${slug}.jpg`)),
    };
  });

  return cache;
}

export function getMenuByCategory(): Record<MenuCategory, MenuItem[]> {
  const items = getAllMenuItems();
  return MENU_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = items.filter((item) => item.category === category);
      return acc;
    },
    {} as Record<MenuCategory, MenuItem[]>,
  );
}

export function getPopularItems(): MenuItem[] {
  return getAllMenuItems().filter((item) => item.badges.includes("Popular"));
}

const BADGE_VARIANTS: Record<string, "olive" | "rose" | "ink"> = {
  Popular: "rose",
  Novo: "olive",
  Vegano: "olive",
  Vegetariano: "olive",
  "Sem Glúten": "ink",
};

export function badgeVariant(badge: string): "olive" | "rose" | "ink" {
  return BADGE_VARIANTS[badge] ?? "ink";
}
