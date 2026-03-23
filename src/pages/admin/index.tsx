import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/admin/dashboard"
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Credenciales incorrectas o falta configuracion.");
      return;
    }

    router.push(result.url ?? "/admin/dashboard");
  };

  return (
    <>
      <Head>
        <title>Admin | Anicare</title>
      </Head>
      <div className="min-h-screen bg-brand-beige/30">
        <div className="container flex min-h-screen items-center justify-center py-10">
          <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="font-[var(--font-nunito)] text-2xl font-extrabold">Acceso administrador</h1>
            <p className="mt-2 text-sm text-brand-warmGray">
              Solo personal autorizado. Usa las credenciales configuradas en el servidor.
            </p>

            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
              <label className="block text-sm">
                Email
                <input
                  type="email"
                  className="mt-1 min-h-11 w-full rounded-xl border px-3"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm">
                Contrasena
                <input
                  type="password"
                  className="mt-1 min-h-11 w-full rounded-xl border px-3"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>

              {error ? (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
              ) : null}

              <button className="btn-primary w-full" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
