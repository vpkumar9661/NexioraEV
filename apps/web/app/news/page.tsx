import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
};

interface PlaceholderPageProps {
  title: string;
  description: string;
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

export default function NewsPage() {
  return (
    <PlaceholderPage
      title="EV News"
      description="Latest electric vehicle news and industry updates for India."
    />
  );
}
