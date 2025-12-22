import { useState, useEffect } from "preact/hooks";
import Image from "site/components/ui/SmartImage.tsx";
import type { Props, Buttons } from "../../sections/HeroTab.tsx";
import FlexibleButton from "site/islands/FlexibleButtons.tsx";

function HeroTab({ title, subTitle, buttons, finalButtons }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeButton, setActiveButton] = useState<Buttons | null>(null);

    useEffect(() => {
        if (buttons && buttons.length > 0) {
            setActiveButton(buttons[0]);
        }
    }, [buttons]);

    useEffect(() => {
        if (buttons && buttons[activeIndex]) {
            setActiveButton(buttons[activeIndex]);
        }
    }, [activeIndex, buttons]);

    const renderResponsiveContent = (
        desktop: string | undefined,
        mobile: string | undefined,
        desktopClass: string,
        mobileClass: string
    ) => {
        if (!desktop && !mobile) return null;
        return (
            <>
                {desktop && (
                    <span
                        className={desktopClass}
                        dangerouslySetInnerHTML={{ __html: desktop }}
                    />
                )}
                {mobile && (
                    <span
                        className={mobileClass}
                        dangerouslySetInnerHTML={{ __html: mobile }}
                    />
                )}
            </>
        );
    };

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="customContainer">
                <div data-aos="zoom-in" className="flex flex-col gap-4 mb-[60px]">
                    {renderResponsiveContent(
                        title?.desktop,
                        title?.mobile,
                        "hidden lg:block",
                        "lg:hidden"
                    )}
                    {renderResponsiveContent(
                        subTitle?.desktop,
                        subTitle?.mobile,
                        "font-instrument leading-[66px] hidden lg:block",
                        "font-instrument leading-[30px] lg:hidden"
                    )}
                </div>

                <div className="background-df flex items-center justify-center gap-5 rounded-xl w-fit mx-auto">
                    {buttons?.map((button, index) => (
                        <button
                            key={index}
                            className={`py-2 px-4 rounded-xl transition-all duration-300 ease-in-out ${index === activeIndex
                                ? "bg-white text-[#371E55]"
                                : "bg-transparent text-primary-content"
                                }`}
                            onClick={() => handleTabClick(index)}
                        >
                            <span dangerouslySetInnerHTML={{ __html: button.text ?? '' }} />
                        </button>
                    ))}
                </div>

                {activeButton && (
                    <div className="background-df relative mx-[10px] px-[22px] pt-[50px] flex flex-col rounded-2xl mt-[40px]">
                        {activeButton.highlight && (
                            <span className="bg-[#FFE6A0] text-[#866300] rounded-[200px] text-center mb-2 px-3 mt-1 block w-fit">
                                Beta
                            </span>
                        )}

                        {activeButton.content && (
                            <div className={`mb-[21px] lg:mb-20 max-w-[1070px] ${activeButton.magicNumbers ? "flex items-center lg:items-end lg:min-h-[138px] justify-between flex-col lg:flex-row" : ""}`}>
                                <span
                                    className={`${activeButton.magicNumbers ? "max-w-[611px]" : ""} heightParagraph`}
                                    dangerouslySetInnerHTML={{ __html: activeButton.content }}
                                />
                                <div className="flex gap-6 items-center mt-6 lg:mt-0 font-instrument leading-[30px]">
                                    {renderResponsiveContent(
                                        activeButton.magicNumbers,
                                        activeButton.magicNumbersMobile,
                                        "hidden lg:block",
                                        "lg:hidden"
                                    )}
                                    {renderResponsiveContent(
                                        activeButton.secondMagicNumbers,
                                        activeButton.secondMagicNumbersMobile,
                                        "hidden lg:block",
                                        "lg:hidden"
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="relative flex justify-end mr-[-22px] lg:block lg:mr-0">
                            {activeButton.image && activeButton.imageMobile && (
                                <>
                                    <Image
                                        src={activeButton.image}
                                        alt="Imagem seção hero tab"
                                        height={585}
                                        width={1192}
                                        className="w-full relative z-[5] top-[5%] left-2/4 translate-x-[-50%] max-w-[930px] hidden lg:block rounded-lg"
                                    />
                                    <Image
                                        src={activeButton.imageMobile}
                                        alt="Imagem seção hero tab"
                                        height={320}
                                        width={337}
                                        className="w-full relative z-[5] max-w-[337px] min-h-[264px] lg:hidden rounded-lg"
                                    />
                                </>
                            )}
                        </div>
                        <img
                            className="absolute bottom-0 right-0 z-[4] lg:hidden"
                            src="/bg-rounded-effect.png"
                            alt=""
                        />
                        <img
                            className="absolute bottom-0 right-0 z-[4] hidden lg:block"
                            src="/bg-rounded-effect-desk.png"
                            alt=""
                        />
                    </div>
                )}
                <div class="flex items-center justify-center gap-4 flex-wrap mt-[124px]">  {finalButtons?.map((button, index) => (
                    <FlexibleButton key={index} {...button} />
                ))}</div>
            </div>
        </>
    );
}

export default HeroTab;

