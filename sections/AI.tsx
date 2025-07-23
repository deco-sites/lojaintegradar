import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Props {
    Title?: RichText;
    TitleTextProps?: TextProps;
}

export default function AI() {
    return <>
    </>
}