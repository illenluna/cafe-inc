import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { loadEnvLocal } from "../lib/load-env-local";

loadEnvLocal();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set — copy .env.example to .env.local and fill it in.");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const events = [
    {
      title: "Degustação: cafés naturais da Mantiqueira",
      description: "Três lotes naturais lado a lado, com bate-papo sobre o produtor e a origem.",
      startsAt: new Date(Date.UTC(2026, 9, 4, 19, 0)),
      capacity: 12,
    },
    {
      title: "Extração comparada: V60 x prensa francesa",
      description: "O mesmo grão, dois métodos — para sentir como a extração muda o copo.",
      startsAt: new Date(Date.UTC(2026, 9, 18, 19, 0)),
      capacity: 10,
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }

  console.log(`Seed concluído: ${events.length} eventos criados.`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
