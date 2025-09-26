import HeroWithTime from "../components/ui/HeroWithTimeV2.tsx";
import { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import { Props as CTAProps } from "site/components/ui/CTA.tsx";
import { ButtonProps } from "../islands/HeroTimeButtons.tsx";
import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx";
import { type Section } from "@deco/deco/blocks";
export interface IVideo {
    video?: VideoWidget;
    width?: number;
    height?: number;
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
export interface Title {
    text?: RichText;
    /** @format color-input */
    color?: string;
    font?: string;
    fontWeight?: string;
    fontSize?: string;
    letterSpacing?: string;
    lineHeight?: string;
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
        width?: number;
        height?: number;
    };
    /**
     * @default false
     */
    highlight?: boolean;
    title?: Title;
    textContent?: Title;
    tags?: Tag[];
    tabImage?: {
        image?: ImageWidget;
        alt?: string;
        width?: number;
        height?: number;
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
export interface Props {
    hideSection?: boolean;
    title?: Title;
    caption?: Title;
    tabs?: Tabs[];
    tabsInterval?: number;
    cta?: CTAProps[];
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    progressBarColor?: string;
    /** @format color-input */
    progressBarBackgroundColor?: string;
    /** @format color-input */
    disabledProgressBarBackgroundColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
    bottomSection?: Section;
    disableImageAnimations?: boolean;
    disableImageShadow?: boolean;
}
function HeroWithTimer(props: Props) {
    if (props.hideSection)
        return <></>;
    const { paddingBottom, paddingTop, title, caption, backgroundColor } = props;
    return (<div id="heroTimeSection" style={{ background: backgroundColor, paddingBottom, paddingTop }} className="px-[10px] py-[60px] lg:py-[160px]">
        <AnimateOnShow animation="animate-fade-up">

            {title?.text && <div class="text-3xl lg:text-[46px] leading-[110%] font-normal" style={{ fontFamily: title.font, fontSize: title.fontSize, lineHeight: title.lineHeight, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, color: title.color }} dangerouslySetInnerHTML={{ __html: title.text }} />}

            {caption?.text && <div class="text-lg lg:text-[22px] leading-[120%] font-medium mt-5" style={{ fontFamily: caption.font, fontSize: caption.fontSize, lineHeight: caption.lineHeight, fontWeight: caption.fontWeight, letterSpacing: caption.letterSpacing, color: caption.color }} dangerouslySetInnerHTML={{ __html: caption.text }} />}
        </AnimateOnShow>
        <HeroWithTime {...props} />
        {props.bottomSection && <props.bottomSection.Component {...props.bottomSection.props} />}
    </div>);
}
export default HeroWithTimer;
