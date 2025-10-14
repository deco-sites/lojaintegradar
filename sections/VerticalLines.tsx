import type { ImageWidget } from "apps/admin/widgets.ts";
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
  maxHeight?: string;
}

export default function VerticalLines({
  lineImage,
  linesSize = 1,
  lines = [],
  maxHeight
}: Props) {
  // Define dimensões padrão para evitar CLS
  const imageWidth = lineImage.width || 1;
  const imageHeight = lineImage.height || 474;
  
  return (
    <div class="w-full relative">
      <div class="w-full absolute top-0 left-0 z-[1000] pointer-events-none">
        <div class="w-full relative">
          {lines.map((line, lineIndex) => {
            let styleClass;
            
            if (line.from === "left" || line.from === "right") {
              styleClass = { [line.from || "left"]: line.distance || "0px" };
            }
            
            if (line.from === "center") {
              styleClass = {
                left: `calc(50% + ${line.distance || "0px"} - ${imageWidth / 2}px)`
              };
            }
            
            return (
              <div
                key={`line-${lineIndex}`}
                class="absolute top-0 overflow-hidden"
                style={{ maxHeight, ...styleClass }}
              >
                {Array.from({ length: linesSize }).map((_, index) => (
                  <Image
                    key={`img-${lineIndex}-${index}`}
                    src={lineImage.src}
                    alt={lineImage.alt || ""} // Alt text para acessibilidade
                    width={imageWidth}
                    height={imageHeight}
                    loading="lazy" // Lazy loading para imagens decorativas
                    decoding="async" // Decode assíncrono para não bloquear parser
                    fetchPriority="low" // Baixa prioridade para elementos decorativos
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
