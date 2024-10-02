
import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface Props {
    id?: string;
    title: string,
    /** @format color-input */
    titleColor?: string;
    caption?: HTMLWidget,
    inputLabel?: string;
    /** @format color-input */
    inputLabelColor?: string;
    /** @format color-input */
    inputLabelBackgroundColor?: string;
    image?: IImage;
    video?: VideoWidget;
    use?: "image" | "video";
    backgroundImage?: IImage
    /** @format color-input */
    hubspotFormButtonColor?: string;
    /** @format color-input */
    hubspotFormButtonTextColor?: string;
    /** @format color-input */
    hubspotErrorMessageColor?: string;
}

export default function MainHero({ id, title, caption = "", inputLabel, backgroundImage, image, titleColor, inputLabelColor, inputLabelBackgroundColor, hubspotErrorMessageColor, hubspotFormButtonColor, hubspotFormButtonTextColor, video, use }: Props) {
    return <div id={id} class="flex min-h-96 pt-40 relative overflow-hidden">
        {backgroundImage?.src && <Image
            width={1440}
            height={926}
            class="w-full h-screen absolute object-fill top-0 left-0 -z-50"
            // style={{ objectPosition: "top right" }}
            alt={backgroundImage?.alt || "background image"}
            src={backgroundImage.src}
        />}
        <div class="flex-grow flex justify-center xl:justify-end items-center w-full xl:w-1/2 px-7 md:px-0 border-base">
            <div class="flex-grow flex flex-col gap-5 md:gap-7 max-w-[630px] z-10">
                <h2 class="text-primary text-2xl md:text-[56px] font-semibold md:font-bold max-w-[575px] leading-[120%]" style={{ color: titleColor }}>{title}</h2>
                <p class="text-base-300 text-lg md:text-[32px] font-normal" dangerouslySetInnerHTML={{ __html: caption }} />
                <label class="md:pt-7">
                    {inputLabel && <p class="bg-info-content rounded-tl-xl rounded-tr-xl py-1.5 px-5 text-base text-primary hidden md:inline-block" style={{ color: inputLabelColor, backgroundColor: inputLabelBackgroundColor }}>{inputLabel}</p>}
                    <div class="main-hero-form" dangerouslySetInnerHTML={{
                        __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                    <script>
                    hbspt.forms.create({
                        region: "na1",
                        portalId: "7112881",
                        formId: "51bbcad7-31d8-4a8f-ba76-845a10da854d"
                    });
                    </script>
                    `}} />
                    {/* <div class={`bg-primary-content flex justify-between py-1.5 pr-1.5 text-base text-primary border border-base-200 rounded-xl shadow-spreaded ${inputLabel && 'md:rounded-tl-none'}`}>
                        <input
                            type="email"
                            class="w-1/2 md:w-auto md:flex-grow pl-2 md:pl-7 focus:outline-none text-sm md:text-base"
                            placeholder={inputPlaceHolder}
                        />
                        <button class="btn btn-primary font-bold px-7 hover:scale-110 text-lg">
                            {inputButtonText}
                        </button>
                    </div> */}
                </label>
            </div>
        </div>

        <div class="flex-grow hidden md:flex justify-end w-1/2">
            {use == "image" && image?.src && <Image
                width={image.width || 697}
                height={image.height || 592}
                src={image.src}
                alt={image.src || ""}
                class="h-[697px] object-contain"
            />}
            {use == "video" && video && <video
                width="697"
                height="592"
                autoPlay
                playsInline
                muted
                loading="lazy"
                loop
                class="w-full xl:w-auto max-w-[809px] object-contain"
            >
                <source src={video} type="video/mp4" />
                <object data="" width="697" height="592">
                    <embed width="697" height="592" src={video} />
                </object>
            </video>}
        </div>


        <style dangerouslySetInnerHTML={{
            __html: `
            .main-hero-form .hs-form-private {
            position: relative;
            display: flex; /* flex */
            flex-wrap: wrap;
            justify-content: space-between; /* justify-between */
            padding-top: 0.375rem; /* py-1.5 */
            padding-bottom: 0.375rem; /* py-1.5 */
            padding-right: 0.375rem; /* pr-1.5 */
            font-size: 1rem; /* text-base */
            border-width: 1px;
            --tw-border-opacity: 1;
            border-radius: 0 0.75rem 0.75rem 0.75rem; /* rounded-xl */
            box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
            --tw-bg-opacity: 1;
            border: none;
            border-radius: 10px;
            flex-wrap: nowrap;
            }

            .main-hero-form .hs-form-private {
            flex-wrap: nowrap;
            }

            .main-hero-form .hs-input {
            width: 100%;
            }

            .main-hero-form .actions {
            height: 47px;
            }

            .main-hero-form .hs-button {
                background-color: ${hubspotFormButtonColor};
                color: ${hubspotFormButtonTextColor};
                cursor:pointer;
                transition: transform 0.2s ease-in-out;
                height: 100%;
                padding: 0px 30px 0px 30px;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                border-radius: 8px;
            }

            .main-hero-form .hs-button:hover {
            transform: scale(1.15);
            }

            .main-hero-form .hs-input {
            padding-left: 0.5rem; /* 2 * 0.25rem */
            outline: none;
            font-size: 0.875rem; /* text-sm */
            }

            .main-hero-form .hs-input:focus {
            outline: none;
            }

            .main-hero-form .hs-error-msg {
            --tw-text-opacity: 1;
                color: var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)));
            }

            .main-hero-form .submitted-message {
            text-align: center;
            }

            .main-hero-form .hs-error-msg {
            position: absolute;
            top: 30px;
            left: 24px;
            width: 200%;
            color: ${hubspotErrorMessageColor}
            }

            .main-hero-form .hs_error_rollup {
                display: none;
                }
            
            @media (min-width: 768px) {
            .main-hero-form .hs-input {
                width: auto;
                flex-grow: 1;
                padding-left: 1.75rem; /* 7 * 0.25rem */
                font-size: 1rem; /* text-base */
            }
            `
        }} />
    </div>
}