import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { blogPostMap, blogPosts } from "@/content/blogPosts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPostMap[params.slug];

  return buildMetadata({
    title: post?.title ?? "Artículo",
    description: post?.excerpt ?? "Artículo del blog de Anicare",
    path: `/blog/${params.slug}`
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostMap[slug];

  if (!post) {
    return (
      <section className="container py-12">
        <h1 className="section-title">Artículo no encontrado</h1>
        <Link href="/blog" className="btn-secondary btn-sm mt-6">
          Volver al blog
        </Link>
      </section>
    );
  }

  return (
    <article className="container py-12 md:py-16">
      <Link href="/blog" className="inline-flex text-sm font-semibold text-brand-ink">
        ← Volver al blog
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-brand-warmGray md:text-base">{post.excerpt}</p>
      <p className="mt-2 text-xs text-brand-warmGray">
        {formatDate(post.date)} · {post.readingTime}
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl border border-brand-border/80 bg-brand-sand shadow-soft">
        <img src={post.coverImage} alt={post.coverAlt} className="h-64 w-full object-cover" loading="lazy" />
      </div>

      <div className="mt-8 space-y-6">
        {post.content.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl font-extrabold">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-brand-warmGray md:text-base">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}