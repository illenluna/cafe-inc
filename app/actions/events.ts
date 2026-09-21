"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { combineDateTimeUtc } from "@/lib/dates";

const eventSchema = z.object({
  title: z.string().trim().min(1, "Dê um título para a degustação."),
  description: z.string().trim().min(1, "Descreva do que se trata."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Escolha uma data."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Escolha um horário."),
  capacity: z.coerce.number().int().positive("Informe quantas vagas existem."),
});

export type EventFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof eventSchema>, string>>;
};

function parseEventForm(formData: FormData) {
  return eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    capacity: formData.get("capacity"),
  });
}

function toFieldErrors(error: z.ZodError<z.infer<typeof eventSchema>>): EventFormState["fieldErrors"] {
  const fieldErrors: EventFormState["fieldErrors"] = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof z.infer<typeof eventSchema>;
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export async function createEventAction(_prevState: EventFormState, formData: FormData): Promise<EventFormState> {
  await requireAdmin();

  const parsed = parseEventForm(formData);
  if (!parsed.success) {
    return { status: "error", message: "Confira os dados e tente de novo.", fieldErrors: toFieldErrors(parsed.error) };
  }

  await prisma.event.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      startsAt: combineDateTimeUtc(parsed.data.date, parsed.data.time),
      capacity: parsed.data.capacity,
    },
  });

  revalidatePath("/admin/eventos");
  revalidatePath("/");
  redirect("/admin/eventos");
}

export async function updateEventAction(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  await requireAdmin();

  const parsed = parseEventForm(formData);
  if (!parsed.success) {
    return { status: "error", message: "Confira os dados e tente de novo.", fieldErrors: toFieldErrors(parsed.error) };
  }

  await prisma.event.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      startsAt: combineDateTimeUtc(parsed.data.date, parsed.data.time),
      capacity: parsed.data.capacity,
    },
  });

  revalidatePath("/admin/eventos");
  revalidatePath("/");
  redirect("/admin/eventos");
}

export async function deleteEventAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/eventos");
  revalidatePath("/");
}
