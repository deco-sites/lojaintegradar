import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { CSS } from '../static/css.ts'
interface Props {
    backgroundImage?: {
        mobile?: ImageWidget;
        desktop?: ImageWidget;
    };
    image?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;

    textContent?: Text;
    initialButtons?: {
        text?: string;
        link?: string;
        changeType?: boolean;
    }[];
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
    backgroundImage,
    image,
    alt,
    width,
    height,
    textContent,
    initialButtons,
    labelText,
}: Props) {
    return (
        <header class="customContainer pt-[36px] min-h-[416px] max-h-[416px] lg:min-h-[800px] flex flex-col items-center justify-normal">
            {backgroundImage && (
                <>
                    <Image
                        src={backgroundImage.mobile || ""}
                        alt={alt || ""}
                        height={height || 416}
                        width={width || 375}
                        class="w-full absolute top-0 left-0 max-h-[416px] lg:hidden"
                        loading={"eager"}
                    />
                    <Image
                        src={backgroundImage.desktop || ""}
                        alt={alt || ""}
                        height={height || 800}
                        width={width || 1920}
                        class="absolute top-0 left-0 hidden lg:block lg:min-h-[800px]"
                        loading={"eager"}
                    />
                </>
            )}
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
                    {initialButtons?.map((button) =>
                        button.changeType ? (
                            <button class="background-df border-[1px] border-solid border-primary-content w-full min-w-[281px] rounded-lg text-center font-bold text-[18px] text-primary-content h-[48px]">
                                <a href={button.link}> {button?.text}</a>
                            </button>
                        ) : (
                            <button class="bg-primary-content w-full rounded-lg text-center font-bold text-[18px] text-base-300 h-[48px] min-w-[157px]">
                                <a href={button.link}> {button?.text}</a>
                            </button>
                        )
                    )}
                </div>
            </div>
            <div class="flex flex-col items-center justify-center relative z-10 lg:min-h-[715px]">
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
                    {initialButtons?.map((button) => (
                        <button class="bg-primary-content w-full max-w-[157px] rounded-lg text-center font-bold text-[18px] text-base-300 h-[48px] hidden lg:block">
                            {button?.text}
                        </button>
                    ))}
                </div>
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

                <div class="gap-5 relative z-10 w-full items-center justify-center mt-[35px] flex">
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
