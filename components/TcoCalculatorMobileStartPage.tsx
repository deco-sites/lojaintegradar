import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";
import { Benefit, IImage } from "site/components/TcoCalculatorPage1.tsx";

const onClickStart = (rootId: string) => {
    event?.preventDefault();
    const parent = document.getElementById(rootId);
    if (parent) {
        Array.from(parent.children)[parent.children.length - 1].classList.add("hidden");
        Array.from(parent.children)[0].classList.remove("hidden");
    }
};


export interface Page1 {
    title: string;
    caption: string;
    benefits?: Benefit[];
    mobileStartBanner: IImage;
    mobileStartButtonText: string;
}

export default function TcoCalculatorMobileStartPage({ page1, rootId }: { page1: Page1; rootId: string }) {

    const { title, caption, benefits, mobileStartBanner, mobileStartButtonText } = page1;

    return <div class="lg:hidden relative text-sm text-primary-content font-normal py-10 px-4 w-full min-h-[155px]">
        {mobileStartBanner && <Image
            width={430}
            height={755}
            alt={mobileStartBanner.alt || "background image"}
            src={mobileStartBanner.src}
            class="absolute w-full h-full top-0 left-0 object-cover object-top -z-10"
        />}
        <p class="text-2xl font-semibold pr-20">{title}</p>
        <p class="mt-[26px]">{caption}</p>
        <div>
            {benefits && benefits.map((benefit) => (
                <div class="mt-5 py-2.5 pl-3.5 pr-2 border border-secondary-content rounded-[10px] min-h[122px] max-w-[219px] backdrop-blur-[2px] bg-base-content bg-opacity-25">
                    <div class="flex ">
                        <Image
                            height={17}
                            width={17}
                            src={benefit.icon.src}
                            alt={benefit.icon.alt || "benefit icon"}
                            class="mr-2.5"
                        />
                        <p class="text-secondary-content">{benefit.title}</p>
                    </div>
                    <p class="mt-2.5">{benefit.caption}</p>
                </div>
            ))}
        </div>

        <div class="flex justify-center mt-8">
            <button
                class="btn bg-primary-content text-base text-primary px-10"
                hx-on:click={useScript(onClickStart, rootId)}
            >
                {mobileStartButtonText}
                <svg width="16" height="16" viewBox="0 0 16 16" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.83631 0.371582C6.30968 0.371582 4.81734 0.824279 3.548 1.67243C2.27866 2.52057 1.28933 3.72608 0.705112 5.13649C0.120898 6.54691 -0.0319589 8.0989 0.265871 9.59619C0.5637 11.0935 1.29884 12.4688 2.37833 13.5483C3.45781 14.6278 4.83316 15.3629 6.33045 15.6608C7.82774 15.9586 9.37973 15.8057 10.7901 15.2215C12.2006 14.6373 13.4061 13.648 14.2542 12.3786C15.1024 11.1093 15.5551 9.61696 15.5551 8.09033C15.5529 6.04386 14.739 4.08182 13.2919 2.63474C11.8448 1.18766 9.88278 0.373743 7.83631 0.371582ZM11.2251 8.51041L8.85014 10.8854C8.73872 10.9968 8.58762 11.0594 8.43006 11.0594C8.2725 11.0594 8.12139 10.9968 8.00998 10.8854C7.89857 10.774 7.83598 10.6229 7.83598 10.4653C7.83598 10.3078 7.89857 10.1567 8.00998 10.0453L9.37189 8.68408H4.86756C4.71008 8.68408 4.55906 8.62153 4.44771 8.51018C4.33636 8.39883 4.27381 8.2478 4.27381 8.09033C4.27381 7.93286 4.33636 7.78184 4.44771 7.67049C4.55906 7.55914 4.71008 7.49658 4.86756 7.49658H9.37189L8.00998 6.13541C7.89857 6.024 7.83598 5.87289 7.83598 5.71533C7.83598 5.55777 7.89857 5.40667 8.00998 5.29525C8.12139 5.18384 8.2725 5.12125 8.43006 5.12125C8.58762 5.12125 8.73872 5.18384 8.85014 5.29525L11.2251 7.67025C11.2803 7.7254 11.3241 7.79088 11.354 7.86296C11.3839 7.93504 11.3993 8.0123 11.3993 8.09033C11.3993 8.16836 11.3839 8.24562 11.354 8.3177C11.3241 8.38978 11.2803 8.45527 11.2251 8.51041Z" />
                </svg>

            </button>
        </div>
    </div>
}