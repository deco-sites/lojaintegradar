import { useId } from "../sdk/useId.ts";
import Slider from "../components/ui/Slider.tsx";
import Icon from "../components/ui/Icon.tsx";
import { clx } from "../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import PricesButtons from "site/islands/PricesButtons.tsx";
import { Button } from "site/types/types.ts";
import FlexibleButtons from "site/islands/FlexibleButtons.tsx";
export interface Props {
    backgroundImage?: {
        firstBackground?: ImageWidget;
        secondBackground?: ImageWidget;
    };
    title?: Title;
    subTitle?: Subtitle;
    cards?: Card[];
    finalButtons?: Button[]
}

interface Card {
    highlight?: boolean;
    /**
     * @format rich-text
     */
    title?: string;
    /**
     * @format rich-text
     */
    price?: string;
    /**
     * @format rich-text
     */
    textContent?: string;
    buttonType: "createStoreForm" | "ctaForm";
    buttonText?: string;
    /**
     * @title ID do plano
     * @description seta o ID do plano no formulário
     */
    planId?: string;
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

function Prices({
    title,
    subTitle,
    cards,
    finalButtons,
    backgroundImage,
}: Props) {
    const id = useId();

    return (
        <div
            id="pricesSection"
            class="relative z-[5] bg-base-300 py-6 lg:pb-20 lg:pt-[72px]"
        >
            {backgroundImage?.firstBackground && (
                <Image
                    src={backgroundImage?.firstBackground}
                    alt={"gradient background"}
                    height={806}
                    width={1256}
                    class="absolute top-0 left-2/4 translate-x-[-50%] h-full lg:px-[10px] lg:rounded-[40px] xl:rounded-xl xl:px-0"
                />
            )}
            {backgroundImage?.secondBackground && (
                <Image
                    src={backgroundImage?.secondBackground}
                    alt={"gradient background"}
                    height={806}
                    width={1256}
                    class="absolute top-0 left-2/4 translate-x-[-50%] z-10 h-full lg:px-[10px] lg:rounded-[40px] xl:rounded-xl xl:px-0"
                />
            )}
            <div data-aos="zoom-in" className="relative z-20 placeholder:flex flex-col gap-4 mb-11 px-[10px]">
                {title?.desktop && (
                    <span
                        className="hidden lg:block mb-4"
                        dangerouslySetInnerHTML={{
                            __html: title?.desktop,
                        }}
                    ></span>
                )}
                {title?.mobile && (
                    <span
                        className="block lg:hidden mb-4"
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
                        className="lg:hidden font-instrument leading-10"
                        dangerouslySetInnerHTML={{
                            __html: subTitle?.mobile,
                        }}
                    ></span>
                )}
            </div>
            <div data-aos="zoom-in" id={id} class="relative z-20 px-[10px] 2xl:px-0">
                <Slider class="carousel sm:carousel-end gap-2 lg:gap-6 lg:justify-center w-full items-center pt-4">
                    {cards?.map((card, index) => (
                        <Slider.Item
                            index={index}
                            class={clx(`carousel-item ${card.highlight ? 'max-w-[199px]' : 'max-w-[184px]'}  w-full flex flex-col`)}
                        >
                            <div
                                class={`relative z-0 flex flex-col items-center justify-center ${card.highlight ? "bg-primary-content" : "background-df2"
                                    } rounded-xl p-[27px]`}
                            >
                                {card.highlight && (
                                    <span className="bg-[#371E55] text-xs text-primary-content rounded-[200px] text-center mb-2 px-3 mt-1 block w-max py-[6px] absolute top-[-20px] left-2/4 translate-x-[-50%]">
                                        Mais vantajoso
                                    </span>
                                )}
                                {card.title && (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: card.title,
                                        }}
                                    >
                                        {card.title}
                                    </span>
                                )}
                                {card.price && (
                                    <span
                                        class="mt-2 mb-3"
                                        dangerouslySetInnerHTML={{
                                            __html: card.price,
                                        }}
                                    ></span>
                                )}
                                {card.textContent && (
                                    <span
                                        class="min-h-24"
                                        dangerouslySetInnerHTML={{
                                            __html: card.textContent,
                                        }}
                                    ></span>
                                )}
                                <PricesButtons type={card.buttonType} planId={card.planId} highlight={card.highlight} buttonText={card.buttonText} />
                            </div>
                        </Slider.Item>
                    ))}
                </Slider>
                <div class="flex lg:hidden items-center justify-end gap-4 mt-[46px]">
                    <Slider.PrevButton
                        class={"btn btn-circle btn-sm w-9 h-9 hover:transform-none"}
                    >
                        <Icon class="" size={24} id="ChevronLeft" strokeWidth={3} />
                    </Slider.PrevButton>
                    <Slider.NextButton
                        class={"btn btn-circle btn-sm w-9 h-9 hover:transform-none"}
                    >
                        <Icon class="" size={24} id="ChevronRight" strokeWidth={3} />
                    </Slider.NextButton>
                </div>
            </div>
            <Slider.JS rootId={id} initial={0} />
            <div class="gap-5 relative z-10 w-full items-center justify-center mt-2 lg:mt-20 flex">
                <div class="flex items-center justify-center gap-4 flex-wrap">  {finalButtons?.map((button, index) => (
                    <FlexibleButtons key={index} {...button} />
                ))}</div>
            </div>
        </div>
    );
}

export default Prices;
