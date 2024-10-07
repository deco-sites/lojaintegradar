import { useScript } from "deco/hooks/useScript.ts";

const onLoad = (appearAt: number) => {
    globalThis.addEventListener("scroll", () => {
        const backToTopButton = document.querySelector("#backToTopButton") as HTMLElement;
        if (globalThis.scrollY > appearAt && backToTopButton) {
            backToTopButton.classList.remove("hidden");
        }
        else {
            backToTopButton.classList.add("hidden");
        }
    });
};

export interface Props {
    text?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @description quantity of pixels scrolled necessary to show */
    appearAt: number;
}

export default function BackToTopButton({ text, textColor, backgroundColor, appearAt }: Props) {
    return <a href="#" id="backToTopButton" class="w-[84px] min-h-[84px] fixed bottom-5 lg:bottom-14 right-5 lg:right-14 z-40 bg-primary rounded-full flex flex-col items-center justify-center p-4 gap-y-1 hidden" style={{ background: backgroundColor }}>
        <svg width="14" height="15" viewBox="0 0 14 15" class="text-primary-content fill-current" style={{ color: textColor }} xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_121_911)">
                <path d="M6.99952 3.35893L2.43598 8.20766C2.01603 8.65386 1.33493 8.65386 0.915001 8.20766C0.495048 7.76146 0.495048 7.03779 0.915001 6.59159L6.23955 0.93426C6.6595 0.48806 7.3406 0.48806 7.76055 0.93426L13.0851 6.59159C13.505 7.03779 13.505 7.76146 13.0851 8.20766C12.6652 8.65386 11.9841 8.65386 11.5641 8.20766L6.99952 3.35893ZM6.99364 10.1861L3.52212 13.861C3.09631 14.3123 2.40509 14.3123 1.97926 13.861C1.55345 13.4097 1.55345 12.6787 1.97926 12.2274L6.22248 7.73597C6.64829 7.28466 6.96007 7.35715 7.38003 7.80335L12.0086 12.2274C12.4344 12.6787 12.4344 13.4097 12.0086 13.861C11.5828 14.3123 10.8915 14.3123 10.4657 13.861L6.99364 10.1861Z" />
            </g>
            <defs>
                <clipPath id="clip0_121_911">
                    <rect width="13.6" height="12.8" fill="white" transform="matrix(-4.37114e-08 1 1 4.37114e-08 0.599998 0.599609)" />
                </clipPath>
            </defs>
        </svg>
        <p class="text-xs text-center font-semibold leading-[120%] text-primary-content" style={{ color: textColor }}>{text}</p>
        <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad, appearAt) }} />
    </a>
}