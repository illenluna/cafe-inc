import { getPopularItems } from "@/lib/menu";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export function PopularItems() {
  const items = getPopularItems();

  return (
    <div className="card-grid">
      {items.map((item, index) => (
        <MenuItemCard key={item.slug} item={item} fallbackIndex={index} />
      ))}
    </div>
  );
}
