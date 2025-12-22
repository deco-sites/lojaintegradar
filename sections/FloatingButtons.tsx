import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "site/components/ui/SmartImage.tsx";

export interface IImage {
    src: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

/** @title {{image.alt}} */
export interface Button {
    href: string;
    size?: number;
    image: IImage;
}

export interface Props {
    hideSection?: boolean;
    buttons?: Button[];
    distanceFromBottom?: number;
    distanceFromRightEnd?: number;
    distanceBetweenButtons?: number;
}

export default function FloatingButtons({ hideSection, buttons = [], distanceFromBottom, distanceFromRightEnd, distanceBetweenButtons }: Props) {
    if (hideSection) return <></>
    return <div class="fixed right-16 bottom-16 z-40 flex flex-col items-center" style={{ bottom: distanceFromBottom, right: distanceFromRightEnd, gap: distanceBetweenButtons }}>
        {buttons.map((button) => <a
            href={button.href}
            target={button?.href.includes("http") ? "_blank" : ""}
            class="h-14 w-14"
            style={{ height: button.size, width: button.size }}
        >
            <Image
                width={button.image.width || 56}
                height={button.image.height || 56}
                src={button.image.src}
                alt={button.image.alt || "floating button"}
                class="object-contain  hover:scale-110 transition-transform"
                style={{ height: button.size || 57, width: button.size || 57 }}
            />
        </a>)}
    </div>
}