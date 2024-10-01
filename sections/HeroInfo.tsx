import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import FlexibleButtons from "site/islands/FlexibleButtons.tsx";
import { Button } from "site/types/types.ts";
interface Props {
    /**
     * @format rich-text
     */
    title?: string;
    cards?: Card[];
}

interface Card {
    image?: {
        image?: ImageWidget;
        alt?: string;
        width?: number;
        height?: number;
    };
    icon?: {
        image?: ImageWidget;
        width?: number;
        height?: number;
    };
    title?: Title;
    textContent?: TextContent;
    buttons?: Button[];
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

interface TextContent {
    /**
     * @format rich-text
     */
    desktop?: string;
    /**
     * @format rich-text
     */
    mobile?: string;
}

function HeroInfo({ title, cards }: Props) {
    return (
        <div id="heroInfoSection" class="bg-base-300 px-[10px] pb-[60px] lg:pb-[160px]">
            <div class="customContainer">
                {title && (
                    <span class=""
                        dangerouslySetInnerHTML={{
                            __html: title,
                        }}
                    />
                )}
                <ul class="flex flex-col lg:flex-row gap-10 mt-10">
                    {cards?.map((card) => (
                        <li class="flex flex-col lg:w-[50%]">
                            <Image
                                data-aos="fade-up"
                                src={card.image?.image || ""}
                                alt={card.image?.alt || ""}
                                height={card.image?.height || 454}
                                width={card.image?.width || 606}
                                class="mb-[30px]"
                            />
                            <Image
                                data-aos="fade-up"
                                src={card.icon?.image || ""}
                                alt={"Ícone do card de mais lançamentos"}
                                height={card.icon?.height || 52}
                                width={card.icon?.width || 52}
                                class="mb-[30px]"
                            />
                            <div data-aos="zoom-in" class="flex flex-col gap-5">
                                {card.title?.desktop && (
                                    <span
                                        class="hidden lg:block"
                                        dangerouslySetInnerHTML={{
                                            __html: card.title?.desktop,
                                        }}
                                    />
                                )}
                                {card.title?.mobile && (
                                    <span
                                        class="lg:hidden"
                                        dangerouslySetInnerHTML={{
                                            __html: card.title?.mobile,
                                        }}
                                    />
                                )}
                                {card.textContent?.desktop && (
                                    <span
                                        class="hidden lg:block"
                                        dangerouslySetInnerHTML={{
                                            __html: card.textContent?.desktop,
                                        }}
                                    />
                                )}
                                {card.textContent?.mobile && (
                                    <span
                                        class="lg:hidden"
                                        dangerouslySetInnerHTML={{
                                            __html: card.textContent?.mobile,
                                        }}
                                    />
                                )}
                                <div class="flex items-center gap-4 flex-wrap">  {card.buttons?.map((button, index) => (
                                    <FlexibleButtons key={index} {...button} />
                                ))}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HeroInfo;
