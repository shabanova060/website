import config from "@payload-config";
import { importMap } from "@payload-importmap";
import { generatePageMetadata, NotFoundPage } from "@payloadcms/next/views";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
  searchParams,
}: {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
}): Promise<Metadata> => generatePageMetadata({ config, params, searchParams });

export default async function NotFound({
  params,
  searchParams,
}: {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
}) {
  return NotFoundPage({ config, params, searchParams, importMap });
}
