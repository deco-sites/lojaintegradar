import { useState, useEffect } from "preact/hooks";

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
}

function HeroTab({ title, subTitle, buttons }: Props) {
    // Estado para armazenar o conteúdo do botão clicado
    const [activeContent, setActiveContent] = useState<string | null>(null);
    const [isHighlight, setIsHighlight] = useState<boolean>(false);
    useEffect(() => {
        if (buttons && buttons.length > 0) {
            setActiveContent(buttons[0].content || "");
            setIsHighlight(!!buttons[0].highlight);
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
                            }}
                        >{button.text}</button>
                    ))}
                </div>

                <div class="background-df relative mx-[10px] px-[22px] pt-[50px] flex flex-col rounded-2xl mt-[40px]">
                    {isHighlight && (
                        <span className="bg-[#FFE6A0] text-[#866300] rounded-[200px] text-center mb-2 px-3 mt-1 block w-fit">
                            Beta
                        </span>
                    )}

                    {activeContent && (
                        <div className="mb-[21px] lg:mb-20">
                            <span dangerouslySetInnerHTML={{ __html: activeContent }} />
                        </div>
                    )}

                    <img class="lg:hidden relative z-20" src="/rounded-img.png" />
                    <img class="hidden lg:block relative z-20" src="/rounded-img-desk.png" />
                    <img class="absolute bottom-0 right-0 z-10 lg:hidden" src="/bg-rounded-effect.png" />
                    <img class="absolute bottom-0 right-0 z-10 hidden lg:block" src="/bg-rounded-effect-desk.png" />
                </div>
            </div>
        </div>
    );
}

export default HeroTab;
