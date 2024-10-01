import HeroWithTime from "../islands/HeroWithTime.tsx";
import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Button } from "site/types/types.ts";
export interface Props {
    title?: Title;
    subTitle?: Subtitle;
    tabs?: Tabs[];
    finalButtons?: Button[];
    background?: Background;
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

interface Tabs {
    icon?: {
        image?: ImageWidget;
        alt?: string;
    };
    /**
     * @default false
     */
    highlight?: boolean;
    title?: TabsTitle;
    textContent?: TabsTextContent;
    tabImage?: {
        image?: ImageWidget;
        alt?: string;
        width?: number;
        height?: number;
        imageDesktop?: ImageWidget;
        altDesktop?: string;
        widthDesktop?: number;
        heightDesktop?: number;
    };
    /**
     * @default false
     * @description Deixe ativo caso queira que o botão de vídeo apareça
     */
    videoOn?: boolean;
    /**
* @title URL do vídeo
* @description É importante que a URL do vídeo seja a versão EMBED
*/
    videoUrl?: VideoWidget;
    button?: {
        buttonText?: string;
        buttonLink?: string;
    }
}

interface TabsTitle {
    /**
     * @format rich-text
     */
    desktop?: string;
    /**
     * @format rich-text
     */
    mobile?: string;
}

interface TabsTextContent {
    /**
     * @format rich-text
     */
    desktop?: string;
    /**
     * @format rich-text
     */
    mobile?: string;
}

interface Background {
    type: 'solid' | 'gradient';
    color?: string;
    gradient?: {
        type: 'linear' | 'radial';
        angle?: number;
        shape?: 'circle' | 'ellipse';
        stops?: {
            color?: string;
            position?: number;
        }[];
    };
}



function HeroWithTimer(props: Props) {

    const getBackgroundStyle = () => {
        if (!props.background) return {};

        if (props.background.type === 'solid') {
            return { backgroundColor: props.background.color };
        }

        if (props.background.type === 'gradient' && props.background.gradient) {
            const { type, stops, angle, shape } = props.background.gradient;
            const colorStops = stops?.map(stop => `${stop.color} ${stop.position}%`).join(', ');

            if (type === 'linear') {
                return {
                    backgroundImage: `linear-gradient(${angle || 0}deg, ${colorStops})`
                };
            } else if (type === 'radial') {
                return {
                    backgroundImage: `radial-gradient(${shape || 'circle'}, ${colorStops})`
                };
            }
        }

        return {};
    };

    return (
        <div style={getBackgroundStyle()} className="bg-base-300 px-[10px] py-[60px] lg:py-[160px]">
            <HeroWithTime {...props} />
        </div>
    )
}

export default HeroWithTimer