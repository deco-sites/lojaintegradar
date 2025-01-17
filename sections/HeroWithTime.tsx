import HeroWithTime from "../components/ui/HeroWithTime.tsx";
import { Section } from "deco/blocks/section.ts";
import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Button } from "site/types/types.ts";
import { ButtonProps } from "../islands/HeroTimeButtons.tsx";
import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx"

export interface Props {
    title?: Title;
    subTitle?: Subtitle;
    tabs?: Tabs[];
    tabsInterval?: number;
    finalButtons?: Button[];
    background?: Background;
    paddingTop?: string;
    paddingBottom?: string;
    bottomSection?: Section;
}

export interface IVideo {
    video?: VideoWidget;
    width?: number;
    height?: number;
    videoDesktop?: VideoWidget;
    widthDesktop?: number;
    heightDesktop?: number;
}

/** @title {{text}} */
export interface Tag {
    text?: string;
    fontFamily?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    borderColor?: string;
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
    tags?: Tag[];
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
    tabVideo?: IVideo;
    useTab?: "image" | "video";
    /**
     * @default false
     * @description Deixe ativo caso queira que o botão de vídeo apareça
     */
    videoOn?: boolean;
    /**
* @title Texto botão de vídeo
* @description Insira o texto desejado par o botão de vídeo
*/
    videoText?: string;
    /**
* @title URL do vídeo
* @description É importante que a URL do vídeo seja a versão EMBED
*/
    videoUrl?: VideoWidget;
    buttons?: ButtonProps[];
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
    const { paddingBottom, paddingTop, title, subTitle } = props;
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
        <div id="heroTimeSection" style={{ ...getBackgroundStyle(), paddingBottom, paddingTop }} className="bg-base-300 px-[10px] py-[60px] lg:py-[160px]">
            <AnimateOnShow animation="animate-pop-up" divClass="flex flex-col gap-4 mb-[60px]">

                {title?.desktop && (
                    <span
                        className={`hidden lg:block`}
                        dangerouslySetInnerHTML={{
                            __html: title?.desktop,
                        }}
                    ></span>
                )}
                {title?.mobile && (
                    <span
                        className="lg:hidden"
                        dangerouslySetInnerHTML={{
                            __html: title?.mobile,
                        }}
                    ></span>
                )}

                {subTitle?.desktop && (
                    <span
                        className="hidden lg:block font-instrument leading-[68.5px]"
                        dangerouslySetInnerHTML={{
                            __html: subTitle?.desktop,
                        }}
                    ></span>
                )}
                {subTitle?.mobile && (
                    <span
                        className="lg:hidden font-instrument"
                        dangerouslySetInnerHTML={{
                            __html: subTitle?.mobile,
                        }}
                    ></span>
                )}
            </AnimateOnShow>
            <HeroWithTime {...props} />
            {props.bottomSection && <props.bottomSection.Component {...props.bottomSection.props} />}
        </div>
    )
}

export default HeroWithTimer