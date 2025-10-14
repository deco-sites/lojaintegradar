import type { ImageWidget} from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface IImage {
  src: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Line {
  distance?: string;
}

export interface Props {
  lineImage: IImage;
  /** @description The number of time the image repeats */
  linesSize?: number;
  lines?: Line[];
}

export default function HorizontalLines({lineImage, linesSize, lines}:Props) {
  return <div class="w-full relative">
    <div class="absolute top-0 left-0 w-full z-40">
          {lines?.map(line => {
            return (
              <div class={`flex justify-center gap-0 min-h-[1px]`} style={{marginTop: line.distance, height: lineImage.height || 1}}>
                {Array.from({ length: linesSize || 1 }).map((_, index) => (
                  <Image
                    key={index}
                    src={lineImage.src}
                    width={lineImage.width || 400}
                    height={lineImage.height || 1}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"                    
                    class='object-cover'
                  />
                ))}
              </div>
          )})}
    </div>
  </div>
}