import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const RichTextToJsx = ({ data }: { data: SerializedEditorState }) => {
  return <RichText data={data} />;
};
