import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx";
import HeroCard from "../islands/HeroCard.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
export interface Props {
    cardBackgroundImage?: {
        desktop?: ImageWidget;
        mobile?: ImageWidget;
    };
    secondImage?: {
        desktop?: ImageWidget;
        mobile?: ImageWidget;
    };
    plan: {
        title?: string;
        discount?: string;
    };

    title?: Title;
    subTitle?: Subtitle;
    button?: {
        buttonText?: string;
    };
    extraText?: string;
    backgroundColors?: {
        color1: string;
        color2: string;
    };
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
            <AnimateOnShow animation="animate-pop-up">
                <HeroCard {...props} />
            </AnimateOnShow>
        </div>
    )
}

export default HeroCards