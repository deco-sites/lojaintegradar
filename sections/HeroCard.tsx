import HeroCard from "../islands/HeroCard.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Button } from "site/types/types.ts";
export interface Props {
    cardBackgroundImage?: {
        desktop?: ImageWidget;
        widthDesktop?: number;
        heightDesktop?: number;
        mobile?: ImageWidget;
        widthMobile?: number;
        heightMobile?: number;
    };
    secondImage?: {
        desktop?: ImageWidget;
        widthDesktop?: number;
        heightDesktop?: number;
        mobile?: ImageWidget;
        widthMobile?: number;
        heightMobile?: number;
    };
    plan: Plan;
    title?: Title;
    subTitle?: Subtitle;
    buttons?: Button[];
    extraText?: string;
    backgroundColors?: {
        color1: string;
        color2: string;
    };
}

interface Plan {
    /**
     * @format rich-text
     */
    title?: string;
    discount?: string;
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

function HeroCards(props: Props) {
    const bgStyle = {
        background: `linear-gradient(to bottom, ${props.backgroundColors?.color1 || "#ffffff"
            } 50%, ${props.backgroundColors?.color2 || "#ffffff"} 50%)`,
    };

    return (
        <div style={bgStyle} class="bg-base-300 py-20">
            <HeroCard {...props} />
        </div>
    )
}

export default HeroCards