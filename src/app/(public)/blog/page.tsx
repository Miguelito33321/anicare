import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { blogPosts } from "@/content/blogPosts";

export const metadata = buildMetadata({
  title: "Blog de cuidado y adopción",
  description: "Consejos prácticos para el bienestar de tu mascota y la adopción responsable.",
  path: "/blog"
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export default function BlogPage() {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="section-title">Consejos para el bienestar de tu mascota</h1>
      <p className="section-lead">Guías prácticas sobre cuidado, convivencia y adopción responsable.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card card-hover overflow-hidden">
            <div className="relative overflow-hidden rounded-3xl border border-brand-border/80 bg-brand-sand shadow-soft">
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <p className="text-xs text-brand-warmGray">
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h2 className="mt-2 text-lg font-extrabold">{post.title}</h2>
              <p className="mt-2 text-sm text-brand-warmGray">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-brand-ink">
                Leer artículo
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}