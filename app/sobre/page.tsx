import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sobre — Café Inc.",
  description:
    "A história da Café Inc. em Moema: cafés especiais de origem sustentável, um ambiente acolhedor e socialmente tolerante, e sessões de degustação.",
};

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="band band--ink">
          <div className="band__inner">
            <p className="eyebrow">Sobre a Café Inc.</p>
            <h1>Um café para ficar</h1>
            <p className="lede mt-4">
              Ficamos em Moema, em São Paulo, e existimos para um propósito simples: servir café especial de
              origem sustentável em um lugar onde qualquer pessoa se sinta bem-vinda para ficar.
            </p>
          </div>
        </section>

        <section className="band band--cream">
          <div className="band__inner">
            <p className="eyebrow">O que nos guia</p>
            <h2>Quatro coisas que não abrimos mão</h2>
            <div className="principles">
              <div className="principle">
                <span className="principle__num">01</span>
                <h3>Origem rastreável</h3>
                <p>
                  Trabalhamos direto com produtores que pagam justo e cuidam da terra — cada lote no cardápio
                  tem uma origem que conseguimos explicar.
                </p>
              </div>
              <div className="principle">
                <span className="principle__num">02</span>
                <h3>Todo mundo é bem-vindo</h3>
                <p>
                  Um ambiente acolhedor e socialmente tolerante não é um slogan aqui — é como tratamos quem
                  entra pela porta, todos os dias.
                </p>
              </div>
              <div className="principle">
                <span className="principle__num">03</span>
                <h3>Gostoso e de bem com o corpo</h3>
                <p>
                  Cardápio pensado para ter opções saudáveis sem abrir mão do sabor — e vice-versa.
                </p>
              </div>
              <div className="principle">
                <span className="principle__num">04</span>
                <h3>Tempo para provar</h3>
                <p>
                  Nossas sessões de degustação existem para desacelerar: entender um café antes de simplesmente
                  bebê-lo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="band band--ink">
          <div className="band__inner">
            <p className="eyebrow">O ambiente</p>
            <h2>Como é estar aqui</h2>
            <p className="lede">
              Luz natural pela manhã, mesas para ficar com um livro ou uma conversa longa, e uma equipe que
              lembra do seu pedido. É esse o clima que buscamos todos os dias.
            </p>
            <div className="imagery-grid mt-8">
              <div className="imagery-tile tile--macro">
                <span className="imagery-tile__cap">Textura — grãos, crosta, vapor</span>
              </div>
              <div className="imagery-tile tile--pour">
                <span className="imagery-tile__cap">O ritual — extração lenta, luz baixa</span>
              </div>
              <div className="imagery-tile tile--room">
                <span className="imagery-tile__cap">O salão — mesas, mãos, espera</span>
              </div>
            </div>
          </div>
        </section>

        <section className="band band--oxblood">
          <div className="band__inner">
            <p className="eyebrow">Degustações</p>
            <h2>Prove antes de decidir o favorito</h2>
            <p className="lede">
              Uma vez por mês reunimos um pequeno grupo para provar lotes novos, comparar métodos de extração e
              conversar sobre origem — sem pressa e sem prova de sommelier. Confira as próximas datas na página
              inicial.
            </p>
            <div className="btn-row mt-6">
              <Button href="/#eventos" variant="secondary">
                Ver próximas degustações
              </Button>
              <Button href="/#reservas" variant="ghost">
                Reservar uma mesa
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
