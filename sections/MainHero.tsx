
import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { CSS } from "../static/css2.ts";

export interface IImage {
    src: ImageWidget;
    alt?: string;
}

export interface Props {
    id?: string;
    title: string,
    caption?: HTMLWidget,
    inputLabel?: string;
    image: IImage;
    backgroundImage?: IImage
}

export default function MainHero({ id, title, caption = "", inputLabel, backgroundImage, image }: Props) {
    return <div id={id} class="flex min-h-96 pt-40 relative overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
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
                <h2 class="text-primary text-2xl md:text-[56px] font-semibold md:font-bold max-w-[575px] leading-[120%]">{title}</h2>
                <p class="text-base-300 text-lg md:text-[32px] font-normal" dangerouslySetInnerHTML={{ __html: caption }} />
                <label class="md:pt-7">
                    {inputLabel && <p class="bg-info-content rounded-tl-xl rounded-tr-xl py-1.5 px-5 text-base text-primary hidden md:inline-block">{inputLabel}</p>}
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
            <Image
                width={697}
                height={592}
                src={image.src}
                alt={image.src || ""}
                class="h-[697px] object-contain"
            />
        </div>
    </div>
}