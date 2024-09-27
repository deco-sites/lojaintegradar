import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx";
import HeroTab from "../islands/HeroTab.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
    title?: Title;
    subTitle?: Subtitle;
    buttons?: Buttons[];
}

interface Title {
    /**
  * @format rich-text
  */
    desktop?: string;
    /**
  * @format rich-text
  */
    mobile?: string;
}

interface Subtitle {
    /**
  * @format rich-text
  */
    desktop?: string;
    /**
  * @format rich-text
  */
    mobile?: string;
}

export interface Buttons {
    highlight?: boolean;
    text?: string;
    content?: string;
    magicNumbers?: string;
    secondMagicNumbers?: string;
    magicNumbersMobile?: string;
    secondMagicNumbersMobile?: string;
    image?: ImageWidget;
    imageMobile?: ImageWidget;
}

function HeroTabs(props: Props) {
    return (
        <div class="bg-base-300 px-[10px] py-[60px] lg:pb-[124px] lg:pt-[160px]">
            <AnimateOnShow>
                <HeroTab {...props} />
            </AnimateOnShow>
        </div>
    )
}

export default HeroTabs