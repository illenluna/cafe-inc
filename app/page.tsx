import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { PopularItems } from "@/components/home/PopularItems";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ReservationForm } from "@/components/reservations/ReservationForm";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="band band--ink">
          <div className="band__inner">
            <p className="eyebrow">Café Inc. · Moema, São Paulo</p>
            <h1>Cafés especiais.
              <br />
              Origem que a gente conhece.
            </h1>
            <p className="lede mt-6">
              Grãos de origem sustentável, torra artesanal e um cardápio pensado para ser gostoso e fazer bem —
              em um ambiente acolhedor e socialmente tolerante.
            </p>
            <div className="btn-row mt-6">
              <Button href="/cardapio" variant="primary">
                Ver cardápio
              </Button>
              <Button href="#reservas" variant="secondary">
                Reservar mesa
              </Button>
            </div>
          </div>
        </section>

        <section className="band band--cream" id="populares">
          <div className="band__inner">
            <p className="eyebrow">Mais pedidos</p>
            <h2>O que a casa recomenda</h2>
            <PopularItems />
          </div>
        </section>

        <section className="band band--oxblood" id="eventos">
          <div className="band__inner">
            <p className="eyebrow">Sessões de degustação</p>
            <h2>Próximos eventos</h2>
            <p className="lede mb-7">
              Uma vez por mês reunimos um pequeno grupo para provar lotes novos e conversar sobre origem — sem
              pressa.
            </p>
            <UpcomingEvents />
          </div>
        </section>

        <section className="band band--cream" id="reservas">
          <div className="band__inner">
            <p className="eyebrow">Reservas</p>
            <h2>Guarde sua mesa</h2>
            <p className="lede mt-2 mb-7">
              Escolha o dia, o horário e quantas pessoas vêm — confirmamos na hora se houver vaga.
            </p>
            <ReservationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
