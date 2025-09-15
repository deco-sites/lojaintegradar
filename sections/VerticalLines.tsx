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
  from?: "left" | "center" | "right";
}

export interface Props {
  lineImage: IImage;
  /** @description The number of time the image repeats */
  linesSize?: number;
  lines?: Line[];
}

export default function VerticalLines({lineImage, linesSize, lines}:Props) {
  return <div class="w-full relative">
    <div class=" w-full absolute top-0 left-0 z-50 pointer-events-none">
      <div class="w-full relative">
        {lines?.map(line => {
          let styleClass;
          if (line.from == "left" || line.from == "right") styleClass = {[line.from || "left"]: line.distance};
          if (line.from == "center") styleClass = {left: `calc(50% + ${line.distance || "0px"} - ${lineImage.width ? `${lineImage.width / 2}px` : "0.5px"})`};
          return (
            <div class={`absolute top-0`} style={styleClass}>
              {Array.from({ length: linesSize || 1 }).map((_, index) => (
                <Image
                  key={index}
                  src={lineImage.src}
                  width={lineImage.width || 1}
                  height={lineImage.height || 474}
                />
              ))}
            </div>
        )})}
      </div>
    </div>
  </div>
}