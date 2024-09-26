import { useState, useEffect } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
export interface Props {
    title?: Title;
    subTitle?: Subtitle;
    buttons?: Buttons[];
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

interface Buttons {
    highlight?: boolean;
    text?: string;
    /**
     * @format rich-text
     * @title Conteúdo do botão
     * @description Conteúdo a ser exibido quando o botão for clicado
     */
    content?: string;
    /**
     * @format rich-text
     */
    magicNumbers?: string;
    /**
     * @format rich-text
     */
    secondMagicNumbers?: string;
    /**
     * @format rich-text
     */
    magicNumbersMobile?: string;
    /**
     * @format rich-text
     */
    secondMagicNumbersMobile?: string;
    image?: ImageWidget;
    imageMobile?: ImageWidget;
}

function HeroTab({ title, subTitle, buttons }: Props) {
    const [activeContent, setActiveContent] = useState<string | null>(null);
    const [isHighlight, setIsHighlight] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<ImageWidget | null>(null);
    const [activeImageMobile, setActiveImageMobile] = useState<ImageWidget | null>(null);
    const [activeMagicNumbers, setActiveMagicNumbers] = useState<string | null>(
        null
    );
    const [activeMagicNumbersMobile, setActiveMagicNumbersMobile] = useState<string | null>(null);
    const [activeMagicNumbersTwo, setActiveMagicNumbersTwo] = useState<string | null>(null);
    const [activeMagicNumbersTwoMobile, setActiveMagicNumbersTwoMobile] = useState<string | null>(null);



    useEffect(() => {
        if (buttons && buttons.length > 0) {
            setActiveContent(buttons[0].content || "");
            setIsHighlight(!!buttons[0].highlight);
            setActiveImage(buttons[0].image || null);
            setActiveImageMobile(buttons[0].imageMobile || null);
            setActiveMagicNumbers(buttons[0].magicNumbers || null);
            setActiveMagicNumbersMobile(buttons[0].magicNumbersMobile || null);
            setActiveMagicNumbersTwo(buttons[0].secondMagicNumbers || null);
            setActiveMagicNumbersTwoMobile(buttons[0].secondMagicNumbersMobile || null);

        }
    }, [buttons]);

    return (
        <div className="bg-base-300 px-[10px] py-[60px] lg:pb-[124px] lg:pt-[160px]">
            <div className="customContainer">
                <div className="flex flex-col gap-4 mb-[60px]">
                    {title?.desktop && (
                        <span
                            className="hidden lg:block"
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

                <div className="background-df flex items-center justify-center gap-5 rounded-xl w-fit mx-auto">
                    {buttons?.map((button, index) => (
                        <button
                            key={index}
                            className={`py-2 px-4 rounded-xl transition-all duration-300 ease-in-out ${activeContent === button.content
                                ? "bg-white text-[#371E55]"
                                : "bg-transparent text-primary-content"
                                }`}
                            onClick={() => {
                                setActiveContent(button.content || "");
                                setIsHighlight(!!button.highlight);
                                setActiveImage(button.image || null);
                                setActiveImageMobile(button.imageMobile || null);
                                setActiveMagicNumbers(button.magicNumbers || null);
                                setActiveMagicNumbersMobile(button.magicNumbersMobile || null);
                                setActiveMagicNumbersTwo(button.secondMagicNumbers || null);
                                setActiveMagicNumbersTwoMobile(button.secondMagicNumbersMobile || null);
                            }}
                        >
                            {button.text}
                        </button>
                    ))}
                </div>

                <div class="background-df relative mx-[10px] px-[22px] pt-[50px] flex flex-col rounded-2xl mt-[40px]">
                    {isHighlight && (
                        <span className="bg-[#FFE6A0] text-[#866300] rounded-[200px] text-center mb-2 px-3 mt-1 block w-fit">
                            Beta
                        </span>
                    )}

                    {activeContent && (
                        <div
                            className={`mb-[21px] lg:mb-20 max-w-[1070px] ${activeMagicNumbers
                                ? "flex items-center justify-between flex-col lg:flex-row"
                                : ""
                                }`}
                        >
                            <span
                                class={`${activeMagicNumbers ? "max-w-[611px]" : ""}`}
                                dangerouslySetInnerHTML={{ __html: activeContent }}
                            />
                            <div class="flex gap-6 items-center mt-6 lg:mt-0">
                                {activeMagicNumbers && (
                                    <span
                                        className="font-instrument leading-[30px] hidden lg:block"
                                        dangerouslySetInnerHTML={{ __html: activeMagicNumbers }}
                                    />
                                )}
                                {activeMagicNumbersMobile && (
                                    <span
                                        className="font-instrument leading-[30px] lg:hidden"
                                        dangerouslySetInnerHTML={{ __html: activeMagicNumbersMobile }}
                                    />
                                )}
                                {activeMagicNumbersTwo && (
                                    <span
                                        className="font-instrument leading-[30px] hidden lg:block"
                                        dangerouslySetInnerHTML={{ __html: activeMagicNumbersTwo }}
                                    />
                                )}
                                {activeMagicNumbersTwoMobile && (
                                    <span
                                        className="font-instrument leading-[30px] lg:hidden"
                                        dangerouslySetInnerHTML={{ __html: activeMagicNumbersTwoMobile }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <div class="relative flex justify-end mr-[-22px] lg:block lg:mr-0">
                        {activeImage && activeImageMobile && (
                            <>
                                <Image
                                    src={activeImage}
                                    alt="Imagem seção hero tab"
                                    height={585}
                                    width={1192}
                                    className="w-full relative z-[5] top-[5%] left-2/4 translate-x-[-50%] max-w-[930px] hidden lg:block rounded-lg"
                                />

                                <Image
                                    src={activeImageMobile}
                                    alt="Imagem seção hero tab"
                                    height={320}
                                    width={337}
                                    className="w-full relative z-[5] max-w-[337px] min-h-[264px] lg:hidden rounded-lg"
                                />
                            </>
                        )}

                    </div>
                    <img
                        class="absolute bottom-0 right-0 z-[4] lg:hidden"
                        src="/bg-rounded-effect.png"
                    />
                    <img
                        class="absolute bottom-0 right-0 z-[4] hidden lg:block"
                        src="/bg-rounded-effect-desk.png"
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroTab;
