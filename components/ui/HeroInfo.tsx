import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import FlexibleButtons from "site/islands/FlexibleButtons.tsx";
import { Button } from "site/types/types.ts";
import Icon from "site/components/ui/Icon.tsx";

import { useState } from "preact/hooks";

export interface Props {
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div
            id="heroInfoSection"
            class="bg-base-300 px-[10px] pb-[60px] lg:pb-[160px]"
        >
            <div class="customContainer">
                {title && (
                    <span
                        class=""
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
                                <div class="flex items-center gap-4 flex-wrap">
                                    {" "}
                                    {card.videoOn && <button
                                        class="bg-[#86D7D6] rounded-lg border-[1px] border-solid border-[#66A6A5] p-1 flex items-center gap-[18px] h-[48px] w-[180px]"
                                        onClick={() => {
                                            setCurrentVideoUrl(card.videoUrl || "");
                                            openModal();
                                        }}
                                    >
                                        {" "}
                                        <Icon
                                            class=""
                                            size={40}
                                            id="PlayButton"
                                            strokeWidth={3}
                                        />{" "}
                                        <span class="text-[#22454B] font-bold text-[17px] text-center">
                                            Como ativar
                                        </span>
                                    </button>
                                    }
                                    {card.buttons?.map((button, index) => (
                                        <FlexibleButtons key={index} {...button} />
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {isModalOpen && currentVideoUrl && (
                    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div class="bg-white p-4 rounded-lg relative w-[90%] max-w-[800px]">
                            <button
                                class="absolute top-[-25px] right-0 text-black font-bold text-xs bg-primary-content rounded-lg p-2 rounded-br-none hover:transform-none"
                                onClick={closeModal}
                            >
                                Fechar
                            </button>
                            <iframe
                                width="100%"
                                height="450"
                                src={currentVideoUrl}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HeroInfo;
