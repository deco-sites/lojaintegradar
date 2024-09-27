import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx";
import HeroInfoButton from "site/islands/HeroInfoButton.tsx";

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
    buttonText?: string;
    buttonPlanId?: string;
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
        <div class="bg-base-300 px-[10px] pb-[60px] lg:pb-[160px]">
            <div class="customContainer">
                {title && (
                    <span class=""
                        dangerouslySetInnerHTML={{
                            __html: title,
                        }}
                    />
                )}
                <AnimateOnShow>
                    <ul class="flex flex-col lg:flex-row gap-10 mt-10">
                        {cards?.map((card) => (
                            <li class="flex flex-col lg:w-[50%]">
                                <Image
                                    src={card.image?.image || ""}
                                    alt={card.image?.alt || ""}
                                    height={card.image?.height || 454}
                                    width={card.image?.width || 606}
                                    class="mb-[30px]"
                                />
                                <Image
                                    src={card.icon?.image || ""}
                                    alt={"Ícone do card de mais lançamentos"}
                                    height={card.icon?.height || 52}
                                    width={card.icon?.width || 52}
                                    class="mb-[30px]"
                                />
                                <div class="flex flex-col gap-5">
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
                                    <HeroInfoButton buttonPlanId={card?.buttonPlanId} buttonText={card?.buttonText} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </AnimateOnShow>
            </div>
        </div>
    );
}

export default HeroInfo;
