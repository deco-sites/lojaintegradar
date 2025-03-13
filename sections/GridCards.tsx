import type { ImageWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Props {
  hideSection?: boolean;
}

export default function GridCards({ hideSection }: Props) {
  if (hideSection) return <></>
  return <div>
    Teste
  </div>
}