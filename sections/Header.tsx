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
        mobileWidth?: number;
        mobileHeight?: number;
        desktop?: ImageWidget;
        desktopWidth?: number;
        desktopHeight?: number;
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
        <header id="headerSection" class="customContainer headerMinHeight pt-[36px] flex flex-col items-center justify-normal">
            <style dangerouslySetInnerHTML={{
                __html: `
                .headerMinHeight {
                min-height: ${backgroundImage?.mobileHeight ? backgroundImage.mobileHeight : '460'}px;
                max-height: ${backgroundImage?.mobileHeight ? backgroundImage.mobileHeight : '460'}px;
                }
                @media screen and (min-width: 1024px) {
                .headerMinHeight {
                min-height: ${backgroundImage?.desktopHeight ? backgroundImage.desktopHeight : '800'}px;
                max-height: ${backgroundImage?.desktopHeight ? backgroundImage.desktopHeight : '800'}px;
                }
                }
                `}} />
            <>
                {backgroundType === "image" && (
                    <>
                        <Image
                            src={backgroundImage?.mobile || ""}
                            alt={alt || ""}
                            height={backgroundImage?.mobileHeight || 460}
                            width={backgroundImage?.mobileWidth || 375}
                            class="headerMinHeight w-full absolute top-0 left-0 lg:hidden"
                            loading={"eager"}
                        />
                        <Image
                            src={backgroundImage?.desktop || ""}
                            alt={alt || ""}
                            height={backgroundImage?.desktopHeight || 800}
                            width={backgroundImage?.desktopWidth || 1920}
                            class="headerMinHeight absolute top-0 left-0 hidden lg:block lg:min-h-[800px]"
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
                         max-height: ${backgroundVideo?.mobileMaximumHeight ? backgroundVideo.mobileMaximumHeight : '455'}px;
                         min-height: ${backgroundVideo?.mobileMinimumHeight ? backgroundVideo.mobileMinimumHeight : '455'}px;
                        }

                        @media screen and (min-width: 1024px) {
                        #headerVideo {
                         max-height: ${backgroundVideo?.desktopMaximumHeight ? backgroundVideo.desktopMaximumHeight : '800'}px;
                         min-height: ${backgroundVideo?.desktopMinimumHeight ? backgroundVideo.desktopMaximumHeight : '800'}px;
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
                            className={`w-full max-w-full object-cover absolute top-0 left-0 ${backgroundVideo?.disableOnMobile ? "hidden lg:block" : ''}`}
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
                                class="headerMinHeight w-full absolute top-0 left-0 lg:hidden"
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
                            class="mb-10"
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
                            className="lg:hidden font-instrument leading-[30px]"
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
                            <p class="backgroundHeroTimeButton videoHeaderBorder rounded-tl-xl rounded-tr-xl py-1.5 px-3 lg:px-5 text-sm lg:text-base font-bold text-primary-content flex mx-auto w-full max-w-[611px] text-center justify-center">
                                {labelText}
                            </p>
                        )}
                        <div dangerouslySetInnerHTML={{
                            __html: `
                            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                            <script>
                            hbspt.forms.create({
                                region: "na1",
                                portalId: "7112881",
                                formId: "c871137b-35fa-47d7-b15f-26b64c490e7f"
                            });
                            </script>`
                        }} />
                    </label>
                </div>
            </div>
        </header>
    );
}

export default Header;
