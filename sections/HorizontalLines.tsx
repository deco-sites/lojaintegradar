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
    <div class=" w-full absolute top-0 left-0 z-50 pointer-events-none">
      <div class="w-full flex justify-center relative">
        {lines?.map(line => {
          return (
            <div class={`absolute flex justify-center w-full overflow-hidden`} style={{top: line.distance}}>
              {Array.from({ length: linesSize || 1 }).map((_, index) => (
                <Image
                  key={index}
                  src={lineImage.src}
                  width={lineImage.width || 400}
                  height={lineImage.height || 1}
                />
              ))}
            </div>
        )})}
      </div>
    </div>
  </div>
}