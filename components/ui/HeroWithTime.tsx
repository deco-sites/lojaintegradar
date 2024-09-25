import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { useState, useEffect } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
    title?: Title;
    subTitle?: Subtitle;
    tabs?: Tabs[];
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
    videoUrl?: string;
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

function HeroWithTime({ title, subTitle, tabs, background }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const nextTab = () => {
        setActiveTab((prev) => (prev + 1) % (tabs?.length || 1));
    };

    useEffect(() => {
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextTab();
                    return 0;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [activeTab, tabs]);


    const getBackgroundStyle = () => {
        if (!background) return {};

        if (background.type === 'solid') {
            return { backgroundColor: background.color };
        }

        if (background.type === 'gradient' && background.gradient) {
            const { type, stops, angle, shape } = background.gradient;
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
            <div className="customContainer">
                <div className="flex flex-col gap-4 mb-[60px]">
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
                </div>
                <div>
                    <ul class="relative flex flex-col gap-6 min-h-[600px]">
                        {tabs?.map((tab, index) => (
                            <li
                                key={index}
                                className={`flex flex-col max-w-[550px] ${activeTab === index ? "active" : ""
                                    }`}
                            >
                                <div>
                                    <div
                                        class="flex items-center gap-4 cursor-pointer"
                                        onClick={() => setActiveTab(index)}
                                    >
                                        <Image
                                            src={tab.icon?.image || ""}
                                            alt={tab.icon?.alt || ""}
                                            height={32}
                                            width={32}
                                            class="lg:hidden"
                                        />
                                        <Image
                                            src={tab.icon?.image || ""}
                                            alt={tab.icon?.alt || ""}
                                            height={52}
                                            width={52}
                                            class="hidden lg:block"
                                        />

                                        <div class="flex flex-col-reverse">
                                            {tab.title?.desktop && (
                                                <span
                                                    class={`hidden lg:block ${activeTab !== index ? "opacity-50" : ""
                                                        }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: tab.title?.desktop,
                                                    }}
                                                ></span>
                                            )}

                                            {tab.title?.mobile && (
                                                <span
                                                    class="lg:hidden"
                                                    dangerouslySetInnerHTML={{
                                                        __html: tab.title?.mobile,
                                                    }}
                                                ></span>
                                            )}

                                            {tab.highlight && (
                                                <span
                                                    class={`text-[#866300] ${activeTab === index
                                                        ? "bg-[#FFE6A0]"
                                                        : "background-df"
                                                        } px-3 py-[2px] font-bold rounded-[200px] w-fit text-xs`}
                                                >
                                                    Beta
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {activeTab === index && (
                                        <div class="mt-4 mb-6">
                                            {tab.textContent?.desktop && (
                                                <span
                                                    class="hidden lg:block"
                                                    dangerouslySetInnerHTML={{
                                                        __html: tab.textContent?.desktop,
                                                    }}
                                                ></span>
                                            )}
                                            {tab.textContent?.mobile && (
                                                <span
                                                    class="lg:hidden"
                                                    dangerouslySetInnerHTML={{
                                                        __html: tab.textContent?.mobile,
                                                    }}
                                                ></span>
                                            )}

                                            <div class="flex items-center gap-[10px]">  {tab.videoOn && (
                                                <button class="mt-4 mb-6 bg-[#86D7D6] rounded-lg border-[1px] border-solid border-[#66A6A5] p-1 flex items-center gap-[18px] h-[48px] w-[160px]" onClick={() => {
                                                    setCurrentVideoUrl(tab.videoUrl || "");
                                                    openModal();
                                                }}>
                                                    {" "}
                                                    <Icon
                                                        class=""
                                                        size={40}
                                                        id="PlayButton"
                                                        strokeWidth={3}
                                                    />{" "}
                                                    <span class="text-[#22454B] font-bold text-[17px] text-center">
                                                        Ver demo
                                                    </span>
                                                </button>
                                            )}

                                                {tab.button?.buttonText && (
                                                    <button class="mt-4 mb-6 backgroundHeroTimeButton rounded-lg p-1 flex items-center justify-center gap-[18px] h-[48px] w-[160px]">
                                                        <a href={tab.button.buttonLink} class="text-primary-content font-bold text-[17px] text-center">
                                                            {tab.button.buttonText}
                                                        </a>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {activeTab === index && (
                                    <>
                                        <Image
                                            src={tab.tabImage?.imageDesktop || ""}
                                            alt={tab.tabImage?.altDesktop || ""}
                                            height={tab.tabImage?.heightDesktop || 685}
                                            width={tab.tabImage?.widthDesktop || 606}
                                            style={{ minHeight: tab.tabImage?.heightDesktop || 685 }}
                                            className="min-1180:absolute right-0 top-0 hidden lg:block h-full hoverScale shadow-md"
                                        />
                                        <Image
                                            src={tab.tabImage?.image || ""}
                                            alt={tab.tabImage?.alt || ""}
                                            height={tab.tabImage?.height || 351}
                                            width={tab.tabImage?.width || 337}
                                            style={{ minHeight: tab.tabImage?.height || 351 }}
                                            class="lg:hidden shadow-md pb-[24px] lg:pb-0"
                                        />
                                        <div className="w-full h-[1px] background-bar">
                                            <div
                                                className="h-full bg-[#D9D9D9] transition-all ease-linear"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </>
                                )}
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
        </div>
    );
}

export default HeroWithTime;
