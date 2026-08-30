import config from "@payload-config";
import { cacheTag } from "next/cache";
import Link from "next/link";
import { getPayload } from "payload";
import css from "~/modules/Header.module.css";

export const Header: React.FC = async (): Promise<React.ReactNode> => {
  "use cache";
  cacheTag("global_header");

  const payload = await getPayload({
    config,
  });

  const result = await payload.findGlobal({
    slug: "header",
    select: {
      links: true,
    },
  });

  return (
    <header className={css.Header}>
      <nav>
        <ul className={css.NavList}>
          {result.links?.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
