"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { bookReservation } from "@/lib/reservations";
import { MAX_PARTY_SIZE } from "@/lib/availability";

const reservationSchema = z.object({
  customerName: z.string().trim().min(2, "Conte seu nome completo."),
  phone: z.string().trim().min(8, "Informe um telefone com DDD."),
  partySize: z.coerce
    .number()
    .int()
    .min(1, "Pelo menos 1 pessoa.")
    .max(MAX_PARTY_SIZE, `Para mais de ${MAX_PARTY_SIZE} pessoas, fale direto com a gente.`),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Escolha uma data."),
  slot: z.string().regex(/^\d{2}:\d{2}$/, "Escolha um horário."),
  notes: z.string().trim().max(280).optional(),
});

type ReservationInput = z.infer<typeof reservationSchema>;

export type ReservationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ReservationInput, string>>;
};

export async function createReservationAction(
  _prevState: ReservationFormState,
  formData: FormData,
): Promise<ReservationFormState> {
  const rawNotes = formData.get("notes");
  const parsed = reservationSchema.safeParse({
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    partySize: formData.get("partySize"),
    date: formData.get("date"),
    slot: formData.get("slot"),
    notes: typeof rawNotes === "string" && rawNotes.trim() ? rawNotes : undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ReservationFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ReservationInput;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Confira os dados e tente de novo.", fieldErrors };
  }

  const result = await bookReservation(parsed.data);
  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  revalidatePath("/");
  return { status: "success", message: "Reserva confirmada — te esperamos por lá." };
}
