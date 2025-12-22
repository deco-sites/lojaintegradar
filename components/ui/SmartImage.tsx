import Image from "apps/website/components/Image.tsx";
import type { JSX } from "preact";

type ImageProps = JSX.IntrinsicElements["img"] & {
  width: number;
  height: number;
  src: string;
  fetchPriority?: "high" | "low" | "auto";
  preload?: boolean;
};

export default function SmartImage(props: ImageProps) {
  const isSvg = props.src?.toLowerCase().endsWith(".svg");
  
  if (isSvg) {
    return <img {...props} />;
  }
  
  return <Image {...props} />;
}

