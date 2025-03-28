import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../sdk/useId.ts";
import TcoCalculatorPage1 from "site/components/TcoCalculator/TcoCalculatorPage1.tsx";
import TcoCalculatorPage2 from "site/components/TcoCalculator/TcoCalculatorPage2.tsx";
import TcoCalculatorPage3 from "site/components/TcoCalculator/TcoCalculatorPage3.tsx";
import TcoCalculatorPage4 from "site/components/TcoCalculator/TcoCalculatorPage4.tsx";
import TcoCalculatorMobileStartPage from "site/components/TcoCalculator/TcoCalculatorMobileStartPage.tsx";
import { Page1 } from "site/components/TcoCalculator/TcoCalculatorPage1.tsx";
import { Page2 } from "site/components/TcoCalculator/TcoCalculatorPage2.tsx";
import { Page3 } from "site/components/TcoCalculator/TcoCalculatorPage3.tsx"
import { Page4 } from "site/components/TcoCalculator/TcoCalculatorPage4.tsx";

export interface IImage {
    src: ImageWidget;
    alt?: string;
}

/** @title {{title}} */
export interface Plan {
    title: string;
    montlyFee: number;
    cardFee: number;
    boletoFee: number;
    pixFee: number;
    comission: number;
}

export interface Props {
    hideSection?: boolean;
    sectionId?: string;
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
}

function TcoCalculator(props: Props) {
    if (props.hideSection) return <></>
    const id = useId();
    const { sectionId, title, caption, page1, page2, page3, page4, plans, titleColor, captionColor } = { ...props };

    return (
        <div
            id={sectionId}
            class="min-h-min flex flex-col lg:container md:max-w-[1332px] lg:mx-auto lg:pt-[123px]"
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
                    page3={page3}
                    rootId={id}
                    plans={plans}
                />
                <TcoCalculatorPage4
                    page1={page1}
                    page4={page4}
                    rootId={id}
                />
                <TcoCalculatorMobileStartPage
                    page1={page1}
                    rootId={id}
                />
            </div>
            {/* <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div dangerouslySetInnerHTML={{
                __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                    <script>
                    hbspt.forms.create({
                        region: "na1",
                        portalId: "7112881",
                        formId: "7ed4157b-6a66-425a-aebd-b66f51c1f0c8"
                    });
                    </script>
                `}} /> */}
        </div>
    );
}

export default TcoCalculator;
