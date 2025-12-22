import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "site/components/ui/SmartImage.tsx";
import { useScript } from "@deco/deco/hooks";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
import { Plan } from "../../sections/TcoCalculatorV2.tsx";
import Plans from "site/sections/Plans.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

const sendWhatsapp = (rootId: string) => {
    const parent = document.getElementById(rootId);
    const email = (parent?.querySelector("#" + rootId + 'emailInput') as HTMLInputElement).value;
    const firstname = (parent?.querySelector("#" + rootId + 'whatsappName') as HTMLInputElement).value;
    const mobilephone = (parent?.querySelector("#" + rootId + 'whatsappNumber') as HTMLInputElement).value;
    //envia os dados para o hubspot
    const fields = {
        email,
        firstname,
        mobilephone
    };
    //envia os dados para a hubspot
    // invoke.site.actions.sendTcoUserData({fields, formGuid: '7ed4157b-6a66-425a-aebd-b66f51c1f0c8', portalId: '7112881'});
    const hutk = document.cookie.replace(/(?:(?:^|.;\s)hubspotutk\s=\s([^;]).$)|^.*$/, "$1");
    const context = {
        "hutk": hutk,
        "pageUri": window.location.href,
        "pageName": document.title
    };
    try {
        fetch('/live/invoke/site/actions/sendTcoUserData.ts', {
            body: JSON.stringify({ fields, formGuid: '9e130d4a-96c0-49ba-a934-2cdbb42ae3e8', portalId: '7112881', context: context }),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        }).then((r) => r.json()).then((r) => {
            alert(r["Success"].includes("error") ? "Erro ao enviar": "Enviado");
            console.log(r)
        });
        
    } catch (error) {
        alert("Erro:"+error.message);
    }
};

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
    title?: string;
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
    textAfter: string;
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
    // topSellerFeedback: Feedback;
    // midTailFeedback: Feedback;
    // longTailFeedback: Feedback;
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
    negativeScreenAsideTitle?: string;
    whatsappText: string;
    /** @format color-input */
    whatsappTextColor?: string;
    whatsappNameInput: IInput;
    whatsappNumberInput: IInput;
    /** @format color-input */
    whatsappInputTextColor?: string;
    /** @format color-input */
    whatsappInputBorderColor?: string;
    whasappCta: iconCTA;
    benefit1: Benefit;
    benefit2: Benefit;
    negativeScreenExtraBenefit1: Benefit;
    negativeScreenExtraBenefit2: Benefit;
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
    const { progressImage, contentBackground, saving, result, resultTableColors, negativeScreenAsideTitle, whatsappTextColor, whatsappText, whatsappInputTextColor, whatsappNameInput, whatsappNumberInput, whasappCta, whatsappInputBorderColor, benefit1, benefit2, negativeScreenExtraBenefit1, negativeScreenExtraBenefit2, lessVantageText, moreVantageText, lojaIntegradaText, indicatedPlanSavingLabel, indicatedPlanSavingLabelTextColor, indicatedPlanSavingLabelBackgroundColor, moreVantageBackgroundColor, moreVantageTextColor, lessVantageBackgroundColor, lessVantageTextColor, lojaIntegradaTextColor, asideContentBackgroundColor } = page4;
    const inputCaptionClass = "text-base text-primary font-bold flex justify-between items-center";
    const inputClass = "bg-transparent min-h-[38px] w-full rounded-lg border border-neutral-content px-4 mt-1";
    return (<div class="relative flex flex-wrap xl:flex-nowrap w-full min-h-[971px] xl:rounded-[10px] overflow-hidden hidden">
        <div class={`relative w-full xl:max-w-[437px] pt-[70px] px-7 pb-16 xl:pb-0 bg-warning text-primary order-last xl:order-none`} style={{backgroundColor: asideContentBackgroundColor}}>
                {asideTopIcon?.src && <Image id={rootId + "negativeScreenAsideTopIcon"} width={asideTopIcon.width || 133} height={asideTopIcon.height || 119} src={asideTopIcon.src} alt={asideTopIcon.alt || "content background"} class="absolute top-4 right-[-30px] w-[133px] h-[119px] object-contain z-10 hidden"/>}
                <div id={rootId + "savingDiv"} class="px-7 py-[14px] relative max-w-[242px]" style={{color: saving.textColor}}>
                    <div class="relative z-10">
                        <p class="text-xl font-semibold pr-9">{saving.textBefore}</p>
                        <p id={rootId + "savingAside"} class="bg-transparent text-[40px] font-semibold"/>
                        <p class="text-xl font-semibold">{saving.textAfter} <span id={rootId + "indicatedPlanName"}/></p>
                    </div>
                    {saving.background.src && <Image width={saving.background.width || 242} height={saving.background.height || 125} src={saving.background.src} alt={saving.background.alt || "background"} class="w-full h-full absolute top-0 left-0 object-fill"/>}
                    {asideTopIcon?.src && <Image width={asideTopIcon.width || 133} height={asideTopIcon.height || 119} src={asideTopIcon.src} alt={asideTopIcon.alt || "content background"} class="absolute top-[-30px] right-[-60px] w-[133px] h-[119px] object-contain z-10"/>}
                </div>

                <p id={rootId + "negativeScreenAsideTitle"} class="text-2xl font-semibold hidden">{negativeScreenAsideTitle}</p>
                <div id={rootId + "resultAsideContentDiv"} class="flex flex-col gap-y-[70px] mt-10">
                    <div>
                        <p class="text-xl px-7 xl:px-0 text-center xl:text-left" style={{color: whatsappTextColor}}>{whatsappText}</p>
                        {/* <div dangerouslySetInnerHTML={{
            __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
            <script>
            hbspt.forms.create({
                region: "na1",
                portalId: "7112881",
                formId: "9e130d4a-96c0-49ba-a934-2cdbb42ae3e8"
            });
            </script>
        `}} /> */}
                        <form class="mt-5 xl:max-w-64 flex flex-col gap-5 z-10 items-center w-full">
                            <label>
                                <div class={inputCaptionClass}>
                                    <p style={{color: whatsappInputTextColor}}>{whatsappNameInput.caption}</p>
                                </div>
                                <input id={rootId + 'whatsappName'} class={inputClass} type="text" required placeholder={whatsappNameInput.placeholder} disabled={false} style={{borderColor: whatsappInputBorderColor}} />
                            </label>
                            <label>
                                <div class={inputCaptionClass}>    
                                    <p style={{color: whatsappInputTextColor}}>{whatsappNumberInput.caption}</p>
                                </div>
                                <input id={rootId + 'whatsappNumber'} class={inputClass} type="tel" placeholder={whatsappNumberInput.placeholder} required style={{borderColor: whatsappInputBorderColor}}/>
                            </label>
                            <div>
                                <a id={whasappCta.id} hx-on:click={useScript(sendWhatsapp, rootId)} target={whasappCta?.href.includes("http") ? "_blank" : "_self"} class={`btn btn-primary font-bold px-5 hover:scale-110 text-lg h-auto w-auto`} style={{color: whasappCta.textColor, backgroundColor: whasappCta.backgroundColor, borderColor: whasappCta.borderColor}}>
                                    {whasappCta.icon?.src && <Image width={whasappCta.icon.width || 20} height={whasappCta.icon.height || 20} src={whasappCta.icon.src} class="h-5 w-5"/>}
                                    {whasappCta?.text}
                                </a>
                            </div>
                        </form>
                    </div>
                    <div class="flex gap-4 justify-center xl:justify-start">
                        <div class="flex flex-col gap-y-5">
                            <div id={rootId + "negativeScreenExtraBenefit1"} class="relative max-w-[226px] min-h-[125px] px-2 py-5 hidden">
                                <p class="text-center text-sm font-semibold relative z-10" style={{color: negativeScreenExtraBenefit1.textColor}}>{negativeScreenExtraBenefit1.text}</p>
                                {negativeScreenExtraBenefit1.image?.src && <Image src={negativeScreenExtraBenefit1.image.src} alt={negativeScreenExtraBenefit1.image.alt || "background"} width={negativeScreenExtraBenefit1.image.width || 226} height={negativeScreenExtraBenefit1.image.height || 125} class="h-full w-full object-fill absolute top-0 left-0"/>}
                            </div>
                            <div class="relative max-w-[226px] min-h-[238px] px-2 py-5">
                                <p class="text-center text-sm font-semibold relative z-10" style={{color: benefit1.textColor}}>{benefit1.text}</p>
                                {benefit1.image?.src && <Image src={benefit1.image.src} alt={benefit1.image.alt || "background"} width={benefit1.image.width || 226} height={benefit1.image.height || 238} class="h-full w-full object-fill absolute top-0 left-0"/>}
                            </div>
                        </div>
                        <div class="flex flex-col justify-end gap-y-5">
                            <div class="relative max-w-[140px] min-h-[163px] px-2 py-5">
                                <p class="text-center text-sm font-semibold relative z-10" style={{color: benefit2.textColor}}>{benefit2.text}</p>
                                {benefit2.image?.src && <Image src={benefit2.image.src} alt={benefit2.image.alt || "background"} width={benefit2.image.width || 140} height={benefit2.image.height || 163} class="h-full w-full object-fill absolute top-0 left-0"/>}
                            </div>
                            <div id={rootId + "negativeScreenExtraBenefit2"} class="relative max-w-[140px] min-h-[191px] h-full px-2 py-5 hidden">
                                <p class="text-center text-sm font-semibold relative z-10" style={{color: negativeScreenExtraBenefit2.textColor}}>{negativeScreenExtraBenefit2.text}</p>
                                {negativeScreenExtraBenefit2.image?.src && <Image src={negativeScreenExtraBenefit2.image.src} alt={negativeScreenExtraBenefit2.image.alt || "background"} width={negativeScreenExtraBenefit2.image.width || 140} height={negativeScreenExtraBenefit2.image.height || 191} class="h-full w-full object-fill absolute top-0 left-0"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div class="xl:hidden relative text-2xl text-secondary-content font-semibold py-10 px-4 w-full min-h-[155px]" style={{ color: asideTextColor }}>
            {mobileTopBanner.src && <Image width={mobileTopBanner.width || 430} height={mobileTopBanner.height || 155} alt={mobileTopBanner.alt || "background image"} src={mobileTopBanner.src} class="absolute w-full h-full top-0 left-0 object-cover -z-10" />}
            <p>{title}</p>
        </div>

        <div class="py-14 px-3.5 xl:px-28 relative w-full">
            {contentBackground?.src && <Image width={contentBackground.width || 813} height={contentBackground.height || 971} src={contentBackground.src} alt={contentBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover" />}
            <div class="flex gap-2">
                {contentTitleIcon?.src && <Image src={contentTitleIcon.src} alt={contentTitleIcon.alt || "icon"} width={contentTitleIcon.width || 14} height={contentTitleIcon.height || 14} />}
                <div dangerouslySetInnerHTML={{ __html: contentTitle }} />
            </div>
            {contentCaption && <p class="mt-2.5" style={{ color: contentCaptionColor }}>{contentCaption}</p>}
            {progressImage?.src && <div class="mt-7"><Image width={progressImage.width || 590} height={progressImage.height || 70} src={progressImage.src} alt={progressImage.alt || "progress image"} class="max-h-[67px] object-contain object-left" /></div>}

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
