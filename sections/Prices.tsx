import { useId } from "../sdk/useId.ts";
import Slider from "../components/ui/Slider.tsx";
import Icon from "../components/ui/Icon.tsx";
import { clx } from "../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
    backgroundImage?: {
        firstBackground?: ImageWidget;
        secondBackground?: ImageWidget;
    }
    title?: Title;
    subTitle?: Subtitle;
    cards?: Card[];
    finalButtons?: {
        text?: string;
        link?: string;
        changeType?: boolean;
    }[];
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

function Prices({ title, subTitle, cards, finalButtons, backgroundImage }: Props) {
    const id = useId();

    return (
        <div id={id} class="relative bg-base-300 py-6 lg:pb-20 lg:pt-[72px]">
            {backgroundImage?.firstBackground && <Image
                src={backgroundImage?.firstBackground}
                alt={"gradient background"}
                height={806}
                width={1256}
                class="absolute top-0 left-2/4 translate-x-[-50%] lg:rounded-xl h-full"
            />
            }
            {backgroundImage?.secondBackground && <Image
                src={backgroundImage?.secondBackground}
                alt={"gradient background"}
                height={806}
                width={1256}
                class="absolute top-0 left-2/4 translate-x-[-50%] lg:rounded-xl z-10 h-full"
            />
            }
            <div className="relative z-20 placeholder:flex flex-col gap-4 mb-11 px-[10px]">
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
                        className="lg:hidden mb-4"
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
            <div class="relative z-20 px-4 2xl:px-0">
                <Slider class="carousel sm:carousel-end gap-2 lg:gap-6 lg:justify-center w-full items-center pt-4">
                    {cards?.map((card, index) => (
                        <Slider.Item
                            index={index}
                            class={clx("carousel-item max-w-[183px] w-full flex flex-col")}
                        >
                            <div
                                class={`relative z-20 flex flex-col items-center justify-center ${card.highlight ? "bg-primary-content" : "background-df2"
                                    } rounded-xl p-[34px] pt-[27px]`}
                            >
                                {card.highlight && <span className="bg-neutral-content text-xs text-primary-content rounded-[200px] text-center mb-2 px-3 mt-1 block w-max py-[6px] absolute top-[-20px] left-2/4 translate-x-[-50%]">
                                    Mais vantajoso
                                </span>}
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
            <div class="gap-5 relative z-20 w-full items-center justify-center mt-2 lg:mt-20 flex">
                {finalButtons?.map((button) =>
                    button.changeType ? (
                        <button class="background-df border-[1px] border-solid border-primary-content w-full max-w-[157px] rounded-lg h-[48px]">
                            <a
                                class="text-center font-bold text-[18px] text-primary-content "
                                href={button.link}
                            >
                                {button?.text}
                            </a>
                        </button>
                    ) : (
                        <button class="bg-primary-content w-full max-w-[157px] rounded-lg h-[48px]">
                            <a
                                class="text-center font-bold text-[18px] text-base-300 "
                                href={button.link}
                            >
                                {" "}
                                {button?.text}
                            </a>
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

export default Prices;
