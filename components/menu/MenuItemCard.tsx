import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { badgeVariant, type MenuItem } from "@/lib/menu";

const FALLBACK_TILES = ["tile--macro", "tile--pour", "tile--room"] as const;

export function MenuItemCard({ item, fallbackIndex = 0 }: { item: MenuItem; fallbackIndex?: number }) {
  return (
    <article className="item-card">
      <div className="item-card__media">
        {item.hasImage ? (
          <Image
            src={item.imagePath}
            alt={item.name}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
          />
        ) : (
          <div
            className={`imagery-tile ${FALLBACK_TILES[fallbackIndex % FALLBACK_TILES.length]}`}
            style={{ height: "100%", border: "none" }}
          >
            <span className="imagery-tile__cap">{item.name}</span>
          </div>
        )}
      </div>
      <div className="item-card__body">
        <div className="item-card__top">
          <span className="item-card__name">{item.name}</span>
          <span className="item-card__price">{item.priceLabel}</span>
        </div>
        <p className="item-card__desc">{item.description}</p>
        {item.badges.length > 0 && (
          <div className="item-card__tags tag-row">
            {item.badges.map((badge) => (
              <Tag key={badge} label={badge} variant={badgeVariant(badge)} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
