import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";

import { useScript } from "@deco/deco/hooks";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
import { Plan } from "../../sections/TcoCalculatorV2.tsx";
import Plans from "site/sections/Plans.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}
/** @title {{title}} */
export interface IBenefit {
    title: string;
    caption: string;
    icon: IImage;
}
export interface IInput {
    caption: string;
    placeholder?: string;
}
export interface iconCTA {
    id?: string;
    href: string;
    text: string;
    icon?: IImage;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    borderColor?: string;
}

/** @title {{text}} */
export interface CTA {
    href: string;
    text?: string;
    underlineText?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    borderColor?: string;
    ctaStyle: "button" | "link";
    showIcon?: boolean;
}

export interface FeedbackCTA {
    text?: string;
    coupon?: string;
    underlineText?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    borderColor?: string;
    ctaStyle: "button" | "link";
    showIcon?: boolean;
}

export interface ResultTableColors {
    /** @format color-input */
    textColor1?: string;
    /** @format color-input */
    textColor2?: string;
    /** @format color-input */
    resultValuesBackgroundColor?: string;
    /** @format color-input */
    divisionLineColor?: string;
}

export interface Page1 {
    title: string;
    asideBackground?: IImage;
    contentTitle: HTMLWidget;
    contentTitleIcon?: IImage;
    contentCaption?: string;
    /** @format color-input */
    contentCaptionColor?: string;
    /** @format color-input */
    asideTextColor?: string;
    asideTopIcon?: IImage;
    asideBottomText?: HTMLWidget;
    mobileTopBanner: IImage;
}
export interface Result {
    montlyFeeLabel: string;
    salesComissionLabel: string;
    platformTotal: string;
    cardLabel: string;
    boletoLabel: string;
    pixLabel: string;
    totalPaymentLabel: string;
    totalLabel: string;
    totalTcoLabel: string;
    migrateCta: CTA;
}

export interface Saving {
    textBefore: string;
    background: IImage;
    /** @format color-input */
    textColor?: string;
}

export interface Benefit {
    text: string;
    /** @format color-input */
    textColor?: string;
    image?: IImage;
}

export interface Feedback {
    text?: HTMLWidget;
    cta?: FeedbackCTA;
    textBellow?: HTMLWidget;
}

export interface Page4 {
    progressImage?: IImage;
    contentBackground?: IImage;
    result: Result;
    saving: Saving;
    topSellerFeedback: Feedback;
    midTailFeedback: Feedback;
    longTailFeedback: Feedback;
    indicatedPlanSavingLabel: string;
    /** @format color-input */
    indicatedPlanSavingLabelTextColor?: string;
    /** @format color-input */
    indicatedPlanSavingLabelBackgroundColor?: string;
    lessVantageText?: string;
    /** @format color-input */
    lessVantageTextColor?: string;
    /** @format color-input */
    lessVantageBackgroundColor?: string;
    moreVantageText?: string;
    /** @format color-input */
    moreVantageTextColor?: string;
    /** @format color-input */
    moreVantageBackgroundColor?: string;
    lojaIntegradaText?: string;
    /** @format color-input */
    lojaIntegradaTextColor?: string;
    resultTableColors?: ResultTableColors;
    /** @format color-input */
    asideContentBackgroundColor?: string;
}
function ResultRow({ label, userValueId, lojaIntegradaValue, lojaIntegradaValueId, resultTableColors }: {
    label: string;
    userValueId?: string;
    lojaIntegradaValue?: string;
    lojaIntegradaValueId?: string;
    resultTableColors?: ResultTableColors;
}) {
    return <div class="flex gap-2.5 text-sm text-base-300 font-normal" style={{ color: resultTableColors?.textColor1 }}>
        <div class="w-[68%] 2xl:w-auto">
            <div class="flex justify-between w-full 2xl:w-[390px] py-[18px]">
                <p class="w-[60%] 2xl:w-auto">{label}</p>
                <p id={userValueId} class="w-[40%] 2xl:w-40 text-center">R$ 389,00</p>
            </div>
            <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral to-transparent" style={{ background: resultTableColors?.divisionLineColor }} />
        </div>
        <div class="bg-primary py-[18px] sm:px-3 max-w-[193px] w-[32%] 2xl:w-full" style={{ backgroundColor: resultTableColors?.resultValuesBackgroundColor }}>
            <p id={lojaIntegradaValueId} class="bg-transparent text-primary-content text-center font-semibold" style={{ color: resultTableColors?.textColor2 }}>{lojaIntegradaValue || "R$ 389,00"}</p>
        </div>
    </div>;
}
function TcoCalculatorPage4({ page1, rootId, page4, plans }: {
    page1: Page1;
    page4: Page4;
    plans: Plan[];
    rootId: string;
}) {
    const { contentTitle, asideBackground, contentTitleIcon, contentCaption, asideTopIcon, mobileTopBanner, title, contentCaptionColor, asideTextColor, asideBottomText } = page1;
    const { progressImage, contentBackground, saving, result, resultTableColors, topSellerFeedback, midTailFeedback, longTailFeedback, lessVantageText, moreVantageText, lojaIntegradaText, indicatedPlanSavingLabel, indicatedPlanSavingLabelTextColor, indicatedPlanSavingLabelBackgroundColor, moreVantageBackgroundColor, moreVantageTextColor, lessVantageBackgroundColor, lessVantageTextColor, lojaIntegradaTextColor, asideContentBackgroundColor } = page4;
    const inputCaptionClass = "text-base text-primary font-bold flex justify-between items-center";
    const inputClass = "bg-transparent min-h-[38px] w-full rounded-lg border border-neutral-content px-4 mt-1";
    return (<div class="relative flex flex-wrap xl:flex-nowrap w-full min-h-[971px] xl:rounded-[30px] overflow-hidden hidden">
        <div class={`relative w-full xl:max-w-[437px] min-h-[971px] pt-[70px] px-7 pb-16 xl:pb-0 text-primary order-last xl:order-none`} style={{ backgroundColor: asideContentBackgroundColor }}>
            {asideTopIcon?.src && <img id={rootId + "negativeScreenAsideTopIcon"} width={asideTopIcon.width || 133} height={asideTopIcon.height || 119} src={asideTopIcon.src} alt={asideTopIcon.alt || "content background"} class="absolute top-4 right-[-30px] w-[133px] h-[119px] object-contain z-10 hidden" />}
            {asideBackground?.src && <img width={asideBackground.width || 813} height={asideBackground.height || 971} src={asideBackground.src} alt={asideBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover object-top" />}
            <div id={rootId + "savingDiv"} class="px-7 py-[14px] relative max-w-[242px]" style={{ color: saving.textColor }}>
                <div class="relative z-10">
                    <p class="text-xl font-semibold text-center">{saving.textBefore}</p>
                    <p id={rootId + "savingAside"} class="bg-transparent text-[40px] font-semibold" />
                    {/* <p class="text-xl font-semibold">{saving.textAfter} <span id={rootId + "indicatedPlanName"} /></p> */}
                </div>
                {saving.background.src && <img width={saving.background.width || 242} height={saving.background.height || 125} src={saving.background.src} alt={saving.background.alt || "background"} class="w-full h-full absolute top-0 left-0 object-fill" />}
                {asideTopIcon?.src && <img width={asideTopIcon.width || 133} height={asideTopIcon.height || 119} src={asideTopIcon.src} alt={asideTopIcon.alt || "content background"} class="absolute top-[-30px] right-[-60px] w-[133px] h-[119px] object-contain z-10" />}
            </div>
            <div id={rootId + "topSellerFeedback"} class="hidden">
                {topSellerFeedback.text && <div class="text-[42px] leading-[120%] font-instrument font-normal mt-7" style={{ color: saving.textColor }} dangerouslySetInnerHTML={{ __html: topSellerFeedback.text }} />}
                {(topSellerFeedback.cta?.text || topSellerFeedback.cta?.text) &&
                    <div class="mt-7">
                        <TalkToSpecialistCta
                            showIcon={topSellerFeedback.cta.showIcon}
                            underlineText={topSellerFeedback.cta.underlineText}
                            text={topSellerFeedback.cta.text}
                            ctaClass={`${topSellerFeedback.cta.ctaStyle != "link" && 'btn btn-primary px-2.5'} inline-flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base`}
                            style={topSellerFeedback.cta.ctaStyle == "button" ? { backgroundColor: topSellerFeedback.cta.backgroundColor, color: topSellerFeedback.cta.textColor, borderColor: topSellerFeedback.cta.borderColor } : { color: topSellerFeedback.cta.textColor }}
                        />
                    </div>
                }
                {topSellerFeedback.textBellow && <div class="text-sm font-normal leading-normal mt-7" style={{ color: saving.textColor }} dangerouslySetInnerHTML={{ __html: topSellerFeedback.textBellow }} />}
            </div>
            <div id={rootId + "midTailFeedback"} class="hidden">
                {midTailFeedback.text && <div class="text-[42px] leading-[120%] font-instrument font-normal mt-7" style={{ color: saving.textColor }} dangerouslySetInnerHTML={{ __html: midTailFeedback.text }} />}
                {(midTailFeedback.cta?.text || midTailFeedback.cta?.text) &&
                    <div class="mt-7">
                        <CreateStoreCta
                            planId="176"
                            period="anual"
                            coupon={midTailFeedback.cta.coupon}
                            showIcon={midTailFeedback.cta.showIcon}
                            underlineText={midTailFeedback.cta.underlineText}
                            text={midTailFeedback.cta.text}
                            ctaClass={`${midTailFeedback.cta.ctaStyle != "link" && 'btn btn-primary px-2.5'} inline-flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base`}
                            style={midTailFeedback.cta.ctaStyle == "button" ? { backgroundColor: midTailFeedback.cta.backgroundColor, color: midTailFeedback.cta.textColor, borderColor: midTailFeedback.cta.borderColor } : { color: midTailFeedback.cta.textColor }}
                        />
                    </div>
                }
                {midTailFeedback.textBellow && <div class="text-sm font-normal leading-normal mt-7" style={{ color: saving.textColor }} dangerouslySetInnerHTML={{ __html: midTailFeedback.textBellow }} />}
            </div>
            <div id={rootId + "longTailFeedback"} class="hidden">
                {longTailFeedback.text && <div class="text-[42px] leading-[120%] font-instrument font-normal mt-7" style={{ color: saving.textColor }} dangerouslySetInnerHTML={{ __html: longTailFeedback.text }} />}
                {(longTailFeedback.cta?.text || longTailFeedback.cta?.text) &&
                    <div class="mt-7">
                        <CreateStoreCta
                            planId="174"
                            period="anual"
                            coupon={longTailFeedback.cta.coupon}
                            showIcon={longTailFeedback.cta.showIcon}
                            underlineText={longTailFeedback.cta.underlineText}
                            text={longTailFeedback.cta.text}
                            ctaClass={`${longTailFeedback.cta.ctaStyle != "link" && 'btn btn-primary px-2.5'} inline-flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base`}
                            style={longTailFeedback.cta.ctaStyle == "button" ? { backgroundColor: longTailFeedback.cta.backgroundColor, color: longTailFeedback.cta.textColor, borderColor: longTailFeedback.cta.borderColor } : { color: longTailFeedback.cta.textColor }}
                        />
                    </div>
                }
                {longTailFeedback.textBellow && <div class="text-sm font-normal leading-normal mt-7" style={{ color: saving.textColor }} dangerouslySetInnerHTML={{ __html: longTailFeedback.textBellow }} />}
            </div>

            <div dangerouslySetInnerHTML={{ __html: asideBottomText || "" }} class="font-bold leading-[130%] absolute left-6 bottom-6 text-white" />
        </div>

        <div class="xl:hidden relative text-2xl text-secondary-content font-semibold py-10 px-4 w-full min-h-[155px]" style={{ color: asideTextColor }}>
            {mobileTopBanner.src && <img width={mobileTopBanner.width || 430} height={mobileTopBanner.height || 155} alt={mobileTopBanner.alt || "background image"} src={mobileTopBanner.src} class="absolute w-full h-full top-0 left-0 object-cover -z-10" />}
            <p>{title}</p>
        </div>

        <div class="py-14 px-3.5 xl:px-28 relative w-full">
            {contentBackground?.src && <img width={contentBackground.width || 813} height={contentBackground.height || 971} src={contentBackground.src} alt={contentBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover" />}
            <div class="flex gap-2">
                {contentTitleIcon?.src && <img src={contentTitleIcon.src} alt={contentTitleIcon.alt || "icon"} width={contentTitleIcon.width || 14} height={contentTitleIcon.height || 14} />}
                <div dangerouslySetInnerHTML={{ __html: contentTitle }} />
            </div>
            {contentCaption && <p class="mt-2.5" style={{ color: contentCaptionColor }}>{contentCaption}</p>}
            {progressImage?.src && <div class="mt-7"><img width={progressImage.width || 590} height={progressImage.height || 70} src={progressImage.src} alt={progressImage.alt || "progress image"} class="max-h-[67px] object-contain object-left" /></div>}

            <div class="flex gap-2.5 text-sm mt-[54px]">
                <div class="w-[68%] 2xl:w-auto">
                    <div class="flex justify-between w-full 2xl:w-[390px] pt-9">
                        <p class="w-[60%] 2xl:w-auto"></p>
                        <p id={rootId + "currentPlanLabel"} class="w-[40%] 2xl:w-40 text-center text-primary font-semibold bg-info-content rounded-[20px] py-2.5 pt-2" style={{ color: lessVantageTextColor, backgroundColor: lessVantageBackgroundColor }}>{lessVantageText}</p>
                    </div>
                </div>
                <div class="relative bg-primary pt-9 sm:px-3 max-w-[193px] w-[32%] 2xl:w-full rounded-tl-[20px] rounded-tr-[20px]" style={{ backgroundColor: resultTableColors?.resultValuesBackgroundColor }}>
                    <div class="absolute w-full top-[-45px] md:top-[-29px] left-0 h-14 bg-error-content bg-opacity-30 -z-10 rounded-lg" style={{ backgroundColor: indicatedPlanSavingLabelBackgroundColor }}>
                        <p class="text-primary text-xs text-center font-semibold pt-2" style={{ color: indicatedPlanSavingLabelTextColor }}>{indicatedPlanSavingLabel} <span id={rootId + "indicatedPlanLabelSaving"} /></p>
                    </div>
                    <p id={rootId + "indicatedPlanLabel"} class="text-primary text-center font-semibold bg-info-content rounded-[20px] py-2.5 pb-3 pt-2" style={{ color: moreVantageTextColor, backgroundColor: moreVantageBackgroundColor }}>{moreVantageText}</p>
                </div>
            </div>

            <div class="flex gap-2.5 text-sm">
                <div class="w-[68%] 2xl:w-auto">
                    <div class="flex justify-between w-full 2xl:w-[390px] py-[18px]">
                        <p class="w-[60%] 2xl:w-auto"></p>
                        <p id={rootId + "currentPlatform"} class="w-[40%] 2xl:w-40 text-center text-primary font-semibold" />
                    </div>
                </div>
                <div class="bg-primary py-[18px] sm:px-3 max-w-[193px] w-[32%] 2xl:w-full" style={{ backgroundColor: resultTableColors?.resultValuesBackgroundColor }}>
                    <p class="bg-transparent text-primary-content text-center font-semibold" style={{ color: lojaIntegradaTextColor }}>{lojaIntegradaText}</p>
                </div>
            </div>
            <ResultRow resultTableColors={resultTableColors} label={result.montlyFeeLabel} userValueId={rootId + "montlyFee"} lojaIntegradaValueId={rootId + "montlyFeeIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.salesComissionLabel} userValueId={rootId + "comission"} lojaIntegradaValueId={rootId + "comissionIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.platformTotal} userValueId={rootId + "platformTotal"} lojaIntegradaValueId={rootId + "platformTotalIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.cardLabel} userValueId={rootId + "cardFeeMoney"} lojaIntegradaValueId={rootId + "cardFeeMoneyIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.boletoLabel} userValueId={rootId + "boletoFeeMoney"} lojaIntegradaValueId={rootId + "boletoFeeMoneyIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.pixLabel} userValueId={rootId + "pixFeeMoney"} lojaIntegradaValueId={rootId + "pixFeeMoneyIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.totalPaymentLabel} userValueId={rootId + "totalPaymentMoney"} lojaIntegradaValueId={rootId + "totalPaymentMoneyIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.totalLabel} userValueId={rootId + "totalMoney"} lojaIntegradaValueId={rootId + "totalMoneyIndicatedPlan"} />
            <ResultRow resultTableColors={resultTableColors} label={result.totalTcoLabel} userValueId={rootId + "totalTco"} lojaIntegradaValueId={rootId + "totalTcoIndicatedPlan"} />

            <div class="flex gap-2.5">
                <div class="w-[68%] 2xl:w-[390px]" />
                <div id={rootId + "migrateCta"} class="flex justify-center bg-primary py-[18px] sm:px-3 max-w-[193px] w-[32%] 2xl:w-full rounded-bl-[20px] rounded-br-[20px]" style={{ backgroundColor: resultTableColors?.resultValuesBackgroundColor }}>
                    {plans.map((plan) => (
                        <CreateStoreCta
                            period="anual"
                            text={result.migrateCta.text}
                            planId={plan.planId}
                            showIcon={result.migrateCta.showIcon}
                            underlineText={result.migrateCta.underlineText}
                            ctaClass={`${result.migrateCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg hidden migrateTo${plan.planId}`}
                            style={result.migrateCta.ctaStyle == "button" ? { backgroundColor: result.migrateCta.backgroundColor, color: result.migrateCta.textColor, borderColor: result.migrateCta.borderColor } : { color: result.migrateCta.textColor }}
                        />
                    ))}
                    <TalkToSpecialistCta
                        text={result.migrateCta.text}
                        showIcon={result.migrateCta.showIcon}
                        underlineText={result.migrateCta.underlineText}
                        ctaClass={`${result.migrateCta.ctaStyle != "link" && 'btn btn-primary px-6'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg hidden migrateToTalk whitespace-nowrap`}
                        style={result.migrateCta.ctaStyle == "button" ? { backgroundColor: result.migrateCta.backgroundColor, color: result.migrateCta.textColor, borderColor: result.migrateCta.borderColor } : { color: result.migrateCta.textColor }}
                    />
                </div>
            </div>
        </div>
    </div>);
}
export default TcoCalculatorPage4;
