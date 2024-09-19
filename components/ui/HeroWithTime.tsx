import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { useState, useEffect } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
    title?: Title;
    subTitle?: Subtitle;
    tabs?: Tabs[];
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
*/
    videoOn?: boolean;
    video?: VideoWidget;
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

function HeroWithTime({ title, subTitle, tabs }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);

    const nextTab = () => {
        setActiveTab((prev) => (prev + 1) % (tabs?.length || 1));
    };

    useEffect(() => {
        // Reseta o progresso ao mudar de tab
        setProgress(0);

        // Inicia o progresso
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextTab();
                    return 0; // Reseta o progresso ao completar
                }
                return prev + 1; // Incrementa o progresso
            });
        }, 100); // Atualiza a cada 100ms (10 segundos para completar 100%)

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente ou mudar de tab
    }, [activeTab, tabs]);

    return (
        <div className="bg-base-300 px-[10px] py-[60px] lg:py-[160px]">
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
                    <ul class="relative flex flex-col gap-6">
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
                                                    class={`hidden lg:block ${activeTab !== index ? 'opacity-50' : ''}`}
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

                                            {tab.highlight && <span class={`text-[#866300] ${activeTab === index ? 'bg-[#FFE6A0]' : 'background-df'} px-3 py-[2px] font-bold rounded-[200px] w-fit text-xs`}>Beta</span>}
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

                                            {tab.videoOn && <button class="mt-4 mb-6 bg-[#86D7D6] rounded-lg border-[1px] border-solid border-[#66A6A5] p-1 flex items-center gap-[18px] h-[48px] w-[160px]"> <Icon class="" size={40} id="PlayButton" strokeWidth={3} /> <span class="text-[#22454B] font-bold text-[17px] text-center">Ver demo</span></button>}
                                        </div>
                                    )}
                                </div>
                                {activeTab === index && (
                                    <><Image
                                        src={tab.tabImage?.imageDesktop || ""}
                                        alt={tab.tabImage?.altDesktop || ""}
                                        height={tab.tabImage?.heightDesktop || 685}
                                        width={tab.tabImage?.widthDesktop || 606}
                                        style={{ minHeight: tab.tabImage?.heightDesktop || 685 }}
                                        className="min-1180:absolute right-0 top-0 hidden lg:block h-full" />
                                        <Image
                                            src={tab.tabImage?.image || ""}
                                            alt={tab.tabImage?.alt || ""}
                                            height={tab.tabImage?.height || 351}
                                            width={tab.tabImage?.width || 337}
                                            style={{ minHeight: tab.tabImage?.height || 351 }}
                                            class="lg:hidden" />
                                        <div className="w-full h-[1px] background-bar">
                                            <div
                                                className="h-full bg-[#D9D9D9] transition-all ease-linear"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            ></div>
                                        </div></>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeroWithTime;
