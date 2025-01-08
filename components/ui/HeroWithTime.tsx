import Image from "apps/website/components/Image.tsx";
import { useState, useEffect } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";
import type { Props } from "../../sections/HeroWithTime.tsx";
import FlexibleButtons from "site/islands/FlexibleButtons.tsx";
import HeroTimeButtons from "site/islands/HeroTimeButtons.tsx";

function HeroWithTime({ title, subTitle, tabs = [], finalButtons = [], background, tabsInterval = 10 }: Props) {
    const rootId = tabs ? tabs[0].tabImage?.imageDesktop : "HeroWithTime";

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
        }, tabsInterval * 10);

        return () => clearInterval(interval);
    }, [activeTab, tabs]);

    return (
        <>
            <div id={rootId} className="customContainer">

                <div class="flex justify-between items-center">
                    <ul class="relative flex flex-col gap-6 justify-center">
                        {tabs?.map((tab, index) => (
                            <li
                                key={index}
                                className={`flex flex-col max-w-[550px] ${activeTab === index ? "active" : "border-bar pb-6"
                                    }`}
                            >
                                <div>
                                    <div
                                        class="flex items-center gap-4 cursor-pointer"
                                        onClick={() => { setActiveTab(index) }}
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
                                            <div class="flex flex-wrap gap-4 mt-4">
                                                {tab.tags?.map(tag => (
                                                    <div class="inline-block rounded-[5px] overflow-hidden p-[1px]" style={{ background: tag.borderColor || "linear-gradient(90deg, #71DBD4 0%, #204E53 100%)" }}>
                                                        <div class="inline-block rounded-[5px]" style={{ background: tag.backgroundColor || "linear-gradient(90deg, #13393D 0%, #204E53 100%)" }}>
                                                            <p
                                                                class={`flex gap-2.5 items-center h-full py-1 text-xl px-4 bg-primary-content text-primary-content font-normal `}
                                                                style={{ background: tag.textColor, backgroundClip: "text", color: tag.textColor && 'transparent', fontFamily: tag.fontFamily || "Instrument serif" }}>
                                                                {tag.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class="flex items-center mt-4 mb-6 gap-[10px]">  {tab.videoOn && (
                                                <button class="bg-[#86D7D6] rounded-lg border-[1px] border-solid border-[#66A6A5] p-1 pr-[18px] flex items-center gap-[18px] h-[48px]" onClick={() => {
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
                                                        {tab.videoText}
                                                    </span>
                                                </button>
                                            )}

                                                {tab.buttons?.map((button, index) => (
                                                    <HeroTimeButtons key={index} {...button} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {activeTab === index && (
                                    <>
                                        {tabs[index].useTab == "video"
                                            ? <div>
                                                <video width={tabs[index].tabVideo?.width || 337} height={tabs[index].tabVideo?.height || 351} autoPlay playsInline muted loading="lazy" loop
                                                    class="object-cover lg:hidden shadow-md pb-[24px] lg:pb-0"
                                                    style={{ width: tabs[index].tabVideo?.width + "px" || "337px", height: tabs[index].tabVideo?.height + "px" || "351px", animationDuration: '300ms' }}>
                                                    <source src={tabs[index].tabVideo?.videoDesktop} type="video/mp4" />
                                                </video>
                                            </div>
                                            : <Image
                                                src={tab.tabImage?.image || ""}
                                                alt={tab.tabImage?.alt || ""}
                                                height={tab.tabImage?.height || 351}
                                                width={tab.tabImage?.width || 337}
                                                style={{ minHeight: tab.tabImage?.height || 351 }}
                                                class="lg:hidden shadow-md pb-[24px] lg:pb-0"
                                            />
                                        }

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
                    {tabs.map((tab, index) => (
                        index == activeTab &&
                        (tab.useTab == "video"
                            ? <video width={tab.tabVideo?.widthDesktop || 606} height={tab.tabVideo?.heightDesktop || 627} autoPlay playsInline muted loading="lazy" loop
                                class={"object-cover hidden lg:block hoverScale shadow-md animate-fade-up50 desktopImage " + tab.tabVideo}
                                style={{ width: tab.tabVideo?.widthDesktop + "px" || "606px", height: tab.tabVideo?.heightDesktop + "px" || "627px", animationDuration: '300ms' }}>
                                <source src={tab.tabVideo?.videoDesktop} type="video/mp4" />
                            </video>
                            : <Image
                                src={tab.tabImage?.imageDesktop || ""}
                                alt={tab.tabImage?.altDesktop || ""}
                                height={tab.tabImage?.heightDesktop || 665}
                                width={tab.tabImage?.widthDesktop || 606}
                                className="hidden lg:block hoverScale shadow-md animate-fade-up50 desktopImage"
                                style={{ animationDuration: '300ms' }}
                            />
                        )
                    ))}

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
                {finalButtons.length > 0 && <div class="flex items-center justify-center gap-4 flex-wrap mt-[60px] lg:mt-[154px]">  {finalButtons?.map((button, index) => (
                    <FlexibleButtons key={index} {...button} />
                ))}</div>}
            </div>
        </>
    );
}

export default HeroWithTime;
