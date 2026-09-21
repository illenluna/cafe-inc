import type { Event } from "@prisma/client";
import { prisma } from "./prisma";

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  return prisma.event.findMany({
    where: { startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: limit,
  });
}

export async function getAllEvents(): Promise<Event[]> {
  return prisma.event.findMany({ orderBy: { startsAt: "asc" } });
}

export async function getEventById(id: string): Promise<Event | null> {
  return prisma.event.findUnique({ where: { id } });
}
