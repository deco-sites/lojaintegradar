import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../sdk/useId.ts";
import TcoCalculatorPage1 from "site/components/TcoCalculatorV3/TcoCalculatorPage1.tsx";
import TcoCalculatorPage2 from "site/components/TcoCalculatorV3/TcoCalculatorPage2.tsx";
import TcoCalculatorPage3 from "site/components/TcoCalculatorV3/TcoCalculatorPage3.tsx";
import TcoCalculatorPage4 from "site/components/TcoCalculatorV3/TcoCalculatorPage4.tsx";
import TcoCalculatorMobileStartPage from "site/components/TcoCalculatorV3/TcoCalculatorMobileStartPage.tsx";
import { Page1 } from "site/components/TcoCalculatorV3/TcoCalculatorPage1.tsx";
import { Page2 } from "site/components/TcoCalculatorV3/TcoCalculatorPage2.tsx";
import { Page3 } from "site/components/TcoCalculatorV3/TcoCalculatorPage3.tsx"
import { Page4 } from "site/components/TcoCalculatorV3/TcoCalculatorPage4.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

/** @title {{title}} */
export interface Plan {
    planId: string;
    title: string;
    montlyFee: number;
    cardFee: number;
    boletoFee: number;
    pixFee: number;
    comission: number;
}

/** @title {{title}} */
export interface Benefit {
    title: string;
    /** @format color-input */
    titleColor?: string;
    caption?: string;
    /** @format color-input */
    captionColor?: string;
    icon?: IImage;
}

export interface Props {
    sectionId?: string;
    /** @format color-input */
    backgroundColor?: string;
    title?: RichText;
    titleFont?: string;
    caption?: RichText;
    captionText?: RichText;
    benefits?: Benefit[];
    plans: Plan[];
    page1: Page1;
    page2: Page2;
    page3: Page3;
    page4: Page4;
    paddingTop?: string;
    paddingBottom?: string;
}

function TcoCalculator(props: Props) {
    const id = useId();
    const { sectionId, backgroundColor, title, titleFont, benefits, caption, captionText, page1, page2, page3, page4, plans, paddingBottom, paddingTop } = { ...props };

    return (
        <div class="relative">
            <div class="hidden lg:block absolute h-full w-full top-0 left-0 z-[-60] " style={{ background: backgroundColor }} />
            <div
                id={sectionId}
                class="min-h-min flex flex-col lg:container md:max-w-[1332px] lg:mx-auto pt-[42px] lg:py-[120px]"
                style={{ paddingBottom, paddingTop }}
            >
                <div class="px-9 hidden lg:block">
                    {title && <div class="mt-3 text-primary text-[32px] lg:text-7xl font-normal" dangerouslySetInnerHTML={{ __html: title }} style={{ fontFamily: titleFont }} />}
                    {caption && <div class="text-neutral text-2xl font-normal leading-normal  mt-[60px]" dangerouslySetInnerHTML={{ __html: caption }} />}
                    {captionText && <div class="text-base text-normal mt-2.5" dangerouslySetInnerHTML={{ __html: captionText }} />}
                    <div class="mt-7 flex justify-between">
                        {benefits && benefits.map((benefit) => (<div class="max-w-[364px]">
                            {benefit.icon?.src && <Image height={benefit.icon.height || 17} width={benefit.icon.width || 17} src={benefit.icon.src} alt={benefit.icon.alt || "benefit icon"} />}
                            <p class="mt-2.5" style={{ color: benefit.titleColor }}>{benefit.title}</p>
                            <p class="mt-2.5 text-sm" style={{ color: benefit.captionColor }}>{benefit.caption}</p>
                        </div>))}
                    </div>
                </div>
                <div
                    class="w-full gap-9 lg:pt-[60px] lg:px-9"
                    id={id}
                >
                    <TcoCalculatorPage1
                        page1={page1}
                        rootId={id}
                    />
                    <TcoCalculatorPage2
                        page1={page1}
                        page2={page2}
                        rootId={id}
                    />
                    <TcoCalculatorPage3
                        page1={page1}
                        page3={page3}
                        rootId={id}
                        plans={plans}
                    />
                    <TcoCalculatorPage4
                        page1={page1}
                        page4={page4}
                        plans={plans}
                        rootId={id}
                    />
                    <TcoCalculatorMobileStartPage
                        page1={page1}
                        benefits={benefits}
                        rootId={id}
                    />
                </div>
            </div>
        </div>
    );
}

export default TcoCalculator;
