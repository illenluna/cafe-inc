import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MenuSection } from "@/components/menu/MenuSection";
import { getMenuByCategory, MENU_CATEGORIES } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Cardápio — Café Inc.",
  description: "Cardápio completo da Café Inc.: cafés especiais, bebidas frias, lanches e sobremesas.",
};

export default function CardapioPage() {
  const byCategory = getMenuByCategory();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="band band--ink">
          <div className="band__inner">
            <p className="eyebrow">Cardápio</p>
            <h1>Tudo o que servimos</h1>
            <p className="lede mt-4">
              Cafés especiais de origem sustentável, bebidas frias, lanches e sobremesas — feitos para serem
              gostosos e para fazer bem.
            </p>
          </div>
        </section>

        <section className="band band--cream">
          <div className="band__inner">
            <div className="menu-sections">
              {MENU_CATEGORIES.map((category) => (
                <MenuSection key={category} title={category} items={byCategory[category]} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
