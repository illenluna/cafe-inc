import { MenuItemCard } from "./MenuItemCard";
import type { MenuItem } from "@/lib/menu";

export function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <div>
      <h3 className="section-title">{title}</h3>
      <div className="card-grid">
        {items.map((item, index) => (
          <MenuItemCard key={item.slug} item={item} fallbackIndex={index} />
        ))}
      </div>
    </div>
  );
}
