"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Field } from "@/components/ui/Field";

const initialState: LoginFormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="form-narrow">
      <Field label="Senha" htmlFor="password">
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" />
      </Field>
      <div className="mt-6">
        <SubmitButton pendingLabel="Entrando…">Entrar</SubmitButton>
      </div>
      {state.status === "error" && state.message && (
        <p className="form-message form-message--error">{state.message}</p>
      )}
    </form>
  );
}
