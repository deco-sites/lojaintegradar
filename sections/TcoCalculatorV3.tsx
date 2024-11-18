import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../sdk/useId.ts";
import TcoCalculatorPage1 from "site/components/TcoCalculatorV2/TcoCalculatorPage1.tsx";
import TcoCalculatorPage2 from "site/components/TcoCalculatorV2/TcoCalculatorPage2.tsx";
import TcoCalculatorPage3 from "site/components/TcoCalculatorV2/TcoCalculatorPage3.tsx";
import TcoCalculatorPage4 from "site/components/TcoCalculatorV2/TcoCalculatorPage4.tsx";
import TcoCalculatorMobileStartPage from "site/components/TcoCalculatorV2/TcoCalculatorMobileStartPage.tsx";
import { Page1 } from "site/components/TcoCalculatorV2/TcoCalculatorPage1.tsx";
import { Page2 } from "site/components/TcoCalculatorV2/TcoCalculatorPage2.tsx";
import { Page3 } from "site/components/TcoCalculatorV2/TcoCalculatorPage3.tsx"
import { Page4 } from "site/components/TcoCalculatorV2/TcoCalculatorPage4.tsx";

export interface IImage {
    src: ImageWidget;
    alt?: string;
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

export interface Props {
    sectionId?: string;
    /** @format color-input */
    backgroundColor?: string;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    caption?: string;
    /** @format color-input */
    captionColor?: string;
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
    const { sectionId, backgroundColor, title, caption, page1, page2, page3, page4, plans, titleColor, captionColor, paddingBottom, paddingTop } = { ...props };

    return (
        <div class="relative">
            <div class="hidden lg:block absolute h-full w-full top-0 left-0 z-[-60] " style={{ background: backgroundColor }} />
            <div
                id={sectionId}
                class="min-h-min flex flex-col lg:container md:max-w-[1332px] lg:mx-auto pt-[42px] lg:py-[120px]"
                style={{ paddingBottom, paddingTop }}
            >
                {caption && <h3 class="text-center text-neutral text-2xl font-semibold hidden lg:block" style={{ color: captionColor }}>{caption}</h3>}
                {title && <h2 class="mt-3 text-center text-primary text-5xl font-semibold hidden lg:block" style={{ color: titleColor }}>{title}</h2>}
                <div
                    class="w-full gap-9 lg:pt-[116px] lg:px-9"
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
                        page2={page2}
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
                        page2={page2}
                        rootId={id}
                    />
                </div>
            </div>
        </div>
    );
}

export default TcoCalculator;
