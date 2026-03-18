import Link from "next/link";
import { notFound } from "next/navigation";
import { getBorgWarnerTurboBySlug, BORG_WARNER_NAVN } from "@/data/borgwarner-turbo";
import { getGarrettTurboBySlug, GARRETT_NAVN } from "@/data/garrett-turbo";
import { getHolsethTurboBySlug, HOLSETH_NAVN } from "@/data/holseth-turbo";
import { getSchwitzerTurboBySlug, SCHWITZER_NAVN } from "@/data/schwitzer-turbo";
import { getIhiTurboBySlug, IHI_NAVN } from "@/data/ihi-turbo";
import { getMitsubishiTurboBySlug, MITSUBISHI_NAVN } from "@/data/mitsubishi-turbo";
import { getAndreTurboBySlug, ANDRE_TURBOER_NAVN } from "@/data/andre-turbo";
import ModellHero from "@/components/ModellHero";
import { BASE_URL } from "@/lib/site";

const TURBO_IMAGE = "/blueprint.png";

type Props = {
  params: Promise<{ leverandor: string; slug: string }>;
};

type TurboData = { serie: string; delnummer: string; leverandorNavn: string };

function getTurboData(leverandor: string, slug: string): TurboData | null {
  if (leverandor === "borgwarner") {
    const turbo = getBorgWarnerTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: BORG_WARNER_NAVN } : null;
  }
  if (leverandor === "garrett") {
    const turbo = getGarrettTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: GARRETT_NAVN } : null;
  }
  if (leverandor === "holseth") {
    const turbo = getHolsethTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: HOLSETH_NAVN } : null;
  }
  if (leverandor === "schwitzer") {
    const turbo = getSchwitzerTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: SCHWITZER_NAVN } : null;
  }
  if (leverandor === "ihi") {
    const turbo = getIhiTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: IHI_NAVN } : null;
  }
  if (leverandor === "mitsubishi") {
    const turbo = getMitsubishiTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: MITSUBISHI_NAVN } : null;
  }
  if (leverandor === "andre-turboer") {
    const turbo = getAndreTurboBySlug(slug);
    return turbo ? { ...turbo, leverandorNavn: ANDRE_TURBOER_NAVN } : null;
  }
  return null;
}

/** ISR: ingen pre-render ved build – sidene genereres on-demand og caches. Holder bygg lite og raskt. */
export const dynamicParams = true;
export const revalidate = 86400; // 24 timer

export async function generateMetadata({ params }: Props) {
  const { leverandor, slug } = await params;
  const turbo = getTurboData(leverandor, slug);
  if (!turbo) return { title: "Ikke funnet" };
  const isAndre = leverandor === "andre-turboer";
  const title = isAndre ? `${turbo.serie} ${turbo.delnummer}` : `${turbo.leverandorNavn} turbo ${turbo.serie} ${turbo.delnummer}`;
  const description = isAndre
    ? `Forespørsel på turbo ${turbo.serie} ${turbo.delnummer}. Send oss en forespørsel for uforpliktende tilbud.`
    : `Forespørsel på ${turbo.leverandorNavn} turbo ${turbo.serie} ${turbo.delnummer}. Send oss en forespørsel for uforpliktende tilbud.`;
  const url = `${BASE_URL}/turboer/${leverandor}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function TurboSlugPage({ params }: Props) {
  const { leverandor, slug } = await params;

  const turbo = getTurboData(leverandor, slug);
  if (!turbo) notFound();

  const isAndre = leverandor === "andre-turboer";
  const title = isAndre ? `${turbo.serie} ${turbo.delnummer}` : `${turbo.leverandorNavn} turbo ${turbo.serie} ${turbo.delnummer}`;
  const description = isAndre
    ? `Trenger du turbo med serienummer ${turbo.serie} og delnummer ${turbo.delnummer}? Send oss en forespørsel, så gir vi deg et uforpliktende tilbud.`
    : `Trenger du ${turbo.leverandorNavn} turbo med serienummer ${turbo.serie} og delnummer ${turbo.delnummer}? Send oss en forespørsel, så gir vi deg et uforpliktende tilbud.`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="pt-4 pb-[50px] flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Forside
          </Link>
          <span aria-hidden>/</span>
          <Link href="/turboer" className="hover:text-slate-900">
            Turboer
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/turboer/${leverandor}`} className="hover:text-slate-900">
            {turbo.leverandorNavn}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-slate-900">
            {turbo.serie} {turbo.delnummer}
          </span>
        </nav>
      </div>

      <ModellHero
        title={title}
        description={description}
        imageSrc={TURBO_IMAGE}
        imageAlt={isAndre ? `${turbo.serie} ${turbo.delnummer}` : `${turbo.leverandorNavn} turbo ${turbo.serie} ${turbo.delnummer}`}
        merkeNavn={title}
      />
    </div>
  );
}
