import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { CSS } from "../static/css.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import FlexibleButton from "site/islands/FlexibleButtons.tsx";
import { Button } from "site/types/types.ts";
interface Props {
    backgroundType: "image" | "video";
    /**
     * @description Só preencha os dados de tamanho caso seja necessário, senão, deixar vazio
     */
    backgroundVideo?: {
        disableOnMobile?: boolean;
        video?: VideoWidget;
        desktopMinimumHeight?: number;
        desktopMaximumHeight?: number;
        mobileMinimumHeight?: number;
        mobileMaximumHeight?: number;
    };
    backgroundImage?: {
        mobile?: ImageWidget;
        desktop?: ImageWidget;
    };
    image?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;

    textContent?: Text;
    buttons?: Button[];
    labelText?: string;
}

interface Text {
    /**
     * @format rich-text
     */
    desktop?: string;
    /**
     * @format rich-text
     */
    mobile?: string;
}

function Header({
    backgroundType = "image",
    backgroundVideo,
    backgroundImage,
    image,
    alt,
    width,
    height,
    textContent,
    buttons,
    labelText,
}: Props) {
    return (
        <header id="headerSection" class="customContainer pt-[36px] min-h-[455px] max-h-[455px] lg:min-h-[800px] flex flex-col items-center justify-normal">
            <>
                {backgroundType === "image" && (
                    <>
                        <Image
                            src={backgroundImage?.mobile || ""}
                            alt={alt || ""}
                            height={height || 460}
                            width={width || 375}
                            class="w-full absolute top-0 left-0 max-h-[460px] lg:hidden"
                            loading={"eager"}
                        />
                        <Image
                            src={backgroundImage?.desktop || ""}
                            alt={alt || ""}
                            height={height || 800}
                            width={width || 1920}
                            class="absolute top-0 left-0 hidden lg:block lg:min-h-[800px]"
                            loading={"eager"}
                        />
                    </>
                )}
                {backgroundType === "video" && (
                    <>
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                        #headerVideo {
                         max-height: ${backgroundVideo?.mobileMaximumHeight};
                         min-height: ${backgroundVideo?.mobileMinimumHeight};
                        }

                        @media screen and (min-width: 1024px) {
                        #headerVideo {
                         max-height: ${backgroundVideo?.desktopMaximumHeight};
                         min-height: ${backgroundVideo?.desktopMinimumHeight};
                        }
                        }
                        `,
                            }}
                        ></style>
                        <video
                            loading="eager"
                            autoPlay
                            muted
                            loop
                            id="headerVideo"
                            className={`w-full max-w-full object-cover absolute top-0 left-0 min-h-[455px] max-h-[455px] lg:max-h-[800px] lg:min-h-[800px] ${backgroundVideo?.disableOnMobile ? "hidden lg:block" : ''}`}
                        >
                            <source
                                src={backgroundVideo?.video}
                                media="(min-width: 1024px)"
                            />
                            <source
                                src={backgroundVideo?.video}
                                media="(max-width: 1023px)"
                            />
                        </video>
                        {backgroundVideo?.disableOnMobile &&
                            <Image
                                src={backgroundImage?.mobile || ""}
                                alt={alt || ""}
                                height={height || 460}
                                width={width || 375}
                                class="w-full absolute top-0 left-0 max-h-[460px] lg:hidden"
                                loading={"eager"}
                            />
                        }
                    </>
                )}
            </>
            <div class="w-full justify-center lg:justify-between hidden lg:flex relative z-10">
                {" "}
                {image && (
                    <Image
                        src={image || ""}
                        alt={alt || ""}
                        height={height || 40}
                        width={width || 257}
                        class="mb-16 lg:mb-0"
                    />
                )}
                <div class="flex items-center gap-[30px]">
                    {buttons?.map((button, index) => (
                        <FlexibleButton key={index} {...button} />
                    ))}
                </div>
            </div>
            <div class="flex flex-col items-center justify-center relative z-[5] lg:min-h-[715px]">
                <div class="w-full flex justify-center lg:justify-between lg:hidden">
                    {" "}
                    {image && (
                        <Image
                            src={image || ""}
                            alt={alt || ""}
                            height={height || 40}
                            width={width || 257}
                            class="mb-16"
                        />
                    )}
                    {/* {buttons?.map((button, index) => (
                        <FlexibleButton key={index} {...button} />
                    ))} */}
                </div>
                <AnimateOnShow animation="animate-pop-up" animationDuration="1.1s">
                    {textContent?.desktop && (
                        <span
                            className="hidden lg:block font-instrument leading-[66px]"
                            dangerouslySetInnerHTML={{
                                __html: textContent?.desktop,
                            }}
                        ></span>
                    )}

                    {textContent?.mobile && (
                        <span
                            className="lg:hidden font-instrument"
                            dangerouslySetInnerHTML={{
                                __html: textContent?.mobile,
                            }}
                        ></span>
                    )}
                </AnimateOnShow>

                <div class="gap-5 relative z-10 w-full items-center justify-center mt-[35px] flex px-[10px] lg:px-0">
                    <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
                    <label class="w-full">
                        {labelText && (
                            <p class="backgroundHeroTimeButton videoHeaderBorder rounded-tl-xl rounded-tr-xl py-1.5 px-5 text-base font-bold text-primary-content flex mx-auto w-full max-w-[611px] text-center justify-center">
                                {labelText}
                            </p>
                        )}
                        <script
                            charset="utf-8"
                            type="text/javascript"
                            src="//js.hsforms.net/forms/embed/v2.js"
                        ></script>
                        <script
                            charset="utf-8"
                            type="text/javascript"
                            src="/headerSnippet.js"
                        ></script>
                    </label>
                </div>
            </div>
        </header>
    );
}

export default Header;
