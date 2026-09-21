"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, SESSION_MAX_AGE_SECONDS, createSessionToken, verifyAdminPassword } from "@/lib/auth";

export type LoginFormState = {
  status: "idle" | "error";
  message?: string;
};

export async function loginAction(_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return { status: "error", message: "Senha incorreta — tente de novo." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin/eventos");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
