import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Entrar — Admin · Café Inc.",
};

export default function AdminLoginPage() {
  return (
    <div className="band band--ink admin-login">
      <div className="band__inner">
        <p className="eyebrow">Admin</p>
        <h2>Entrar</h2>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
