import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";

const sendWhatsapp = (rootId: string) => {
    const parent = document.getElementById(rootId);
    const email = (parent?.querySelector("#"+rootId+'emailInput') as HTMLInputElement).value;
    const firstname = (parent?.querySelector("#"+rootId+'whatsappName') as HTMLInputElement).value;
    const mobilephone = (parent?.querySelector("#"+rootId+'whatsappNumber') as HTMLInputElement).value;
    
    //envia os dados para o hubspot
    const fields = {
       email,
       firstname,
       mobilephone
    } 

    //envia os dados para a hubspot
    // invoke.site.actions.sendTcoUserData({fields, formGuid: '7ed4157b-6a66-425a-aebd-b66f51c1f0c8', portalId: '7112881'});
    const hutk = document.cookie.replace(/(?:(?:^|.;\s)hubspotutk\s=\s([^;]).$)|^.*$/, "$1");
    const context = {
        "hutk": hutk,
        "pageUri": window.location.href,
        "pageName": document.title
    };

    fetch('/live/invoke/site/actions/sendTcoUserData.ts', {
        body: JSON.stringify({fields, formGuid: '9e130d4a-96c0-49ba-a934-2cdbb42ae3e8', portalId: '7112881', context: context}),
        method: 'POST',
        headers: {'content-type': 'application/json'}
    }).then((r) => r.json()).then((r) => console.log(r));
}

export interface IImage {
    src: ImageWidget;
    alt?: string;
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

export interface CTA {
    id?: string;
    href: string;
    text: string;
    icon?: IImage;
    outline?: boolean;
}

export interface Page1 {
    title: string;
    contentTitle: HTMLWidget;
    contentTitleIcon?: IImage;
    contentCaption?: string;
    asideTopIcon?: IImage;
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

export interface Page4 {
    progressImage?: IImage
    contentBackground?: IImage;
    result: Result;
    saving: {
        textBefore: string;
        textAfter: string;
        background: IImage;
        indicatedPlanSavingLabel: string;
    }
    negativeScreenAsideTitle?: string;
    whatsappText: string;
    whatsappNameInput: IInput;
    whatsappNumberInput: IInput;
    whasappCta: CTA;
    benefit1: {
        text: string;
        image?: IImage;
    }
    benefit2: {
        text: string;
        image?: IImage;
    }
    negativeScreenExtraBenefit1: {
        text: string;
        image?: IImage;
    }
    negativeScreenExtraBenefit2: {
        text: string;
        image?: IImage;
    }
}

function ResultRow({ label, userValueId, lojaIntegradaValue, lojaIntegradaValueId }: { label: string, userValueId?: string, lojaIntegradaValue?: string, lojaIntegradaValueId?: string }) {
    return <div class="flex gap-2.5 text-sm text-base-300 font-normal">
        <div class="w-[68%] 2xl:w-auto">
            <div class="flex justify-between w-full 2xl:w-[390px] py-[18px]">
                <p class="w-[60%] 2xl:w-auto">{label}</p>
                <p id={userValueId} class="w-[40%] 2xl:w-40 text-center">R$ 389,00</p>
            </div>
            <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral to-transparent" />
        </div>
        <div class="bg-primary py-[18px] sm:px-3 max-w-[193px] w-[32%] 2xl:w-full">
            <p id={lojaIntegradaValueId} class="bg-transparent text-primary-content text-center font-semibold">{lojaIntegradaValue || "R$ 389,00"}</p>
        </div>
    </div>
}

function TcoCalculatorPage4(
    { page1, rootId, page4 }: { page1: Page1; page4: Page4; rootId: string, },
) {
    const {
        contentTitle, contentTitleIcon, contentCaption, asideTopIcon, mobileTopBanner, title
    } = page1;

    const { progressImage, contentBackground, saving, whasappCta, whatsappNameInput, whatsappNumberInput, whatsappText, benefit1, benefit2, result, negativeScreenExtraBenefit1, negativeScreenExtraBenefit2, negativeScreenAsideTitle } = page4;

    const inputCaptionClass = "text-base text-primary font-bold flex justify-between items-center";
    const inputClass = "bg-transparent min-h-[38px] w-full rounded-lg border border-neutral-content px-4 mt-1";

    return (
        <div
            class="relative flex flex-wrap xl:flex-nowrap w-full min-h-[971px] xl:rounded-[30px] overflow-hidden hidden"
        >
            <div class={`relative w-full xl:max-w-[437px] pt-[70px] px-7 pb-16 xl:pb-0 bg-warning text-primary order-last xl:order-none`}>
                {asideTopIcon && <Image
                    id={rootId + "negativeScreenAsideTopIcon"}
                    width={133}
                    height={119}
                    src={asideTopIcon.src}
                    alt={asideTopIcon.alt || "content background"}
                    class="absolute top-4 right-[-30px] w-[133px] h-[119px] object-contain z-10 hidden"
                />}
                <div id={rootId + "savingDiv"} class="px-7 py-[14px] relative max-w-[242px]">
                    <div class="relative z-10">
                        <p class="text-xl font-semibold pr-9">{saving.textBefore}</p>
                        <p id={rootId + "savingAside"} class="bg-transparent text-[40px] font-semibold" />
                        <p class="text-xl font-semibold">{saving.textAfter} <span id={rootId + "indicatedPlanName"} /></p>
                    </div>
                    <Image
                        width={242}
                        height={125}
                        src={saving.background.src}
                        alt={saving.background.alt || "background"}
                        class="w-full h-full absolute top-0 left-0 object-fill"
                    />
                    {asideTopIcon && <Image
                        width={133}
                        height={119}
                        src={asideTopIcon.src}
                        alt={asideTopIcon.alt || "content background"}
                        class="absolute top-[-30px] right-[-60px] w-[133px] h-[119px] object-contain z-10"
                    />}
                </div>

                <p id={rootId + "negativeScreenAsideTitle"} class="text-2xl font-semibold hidden">{negativeScreenAsideTitle}</p>
                <div id={rootId + "resultAsideContentDiv"} class="flex flex-col gap-y-[70px] mt-10">
                    <div>
                        <p class="text-xl px-7 xl:px-0 text-center xl:text-left">{whatsappText}</p>
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
                                <div class={inputCaptionClass} >
                                    <p>{whatsappNameInput.caption}</p>
                                </div>
                                <input
                                    id={rootId+'whatsappName'}
                                    class={inputClass}
                                    type="text"
                                    required
                                    placeholder={whatsappNameInput.placeholder}
                                    disabled={false}
                                >
                                </input>
                            </label>
                            <label>
                                <div class={inputCaptionClass} >    
                                    <p>{whatsappNumberInput.caption}</p>
                                </div>
                                <input
                                    id={rootId+'whatsappNumber'}
                                    class={inputClass}
                                    type="tel"
                                    placeholder={whatsappNumberInput.placeholder}
                                    required
                                >
                                </input>
                            </label>
                            <div>
                                <a
                                    id={whasappCta.id}
                                    href={whasappCta?.href ?? "#"}
                                    hx-on:click={useScript(sendWhatsapp, rootId)}
                                    target={whasappCta?.href.includes("http") ? "_blank" : "_self"}
                                    class={`btn btn-primary ${whasappCta.outline ? "btn-outline" : ""} font-bold px-5 hover:scale-110 text-lg h-auto w-auto`}
                                >
                                    {whasappCta.icon && <Image
                                        width={20}
                                        height={20}
                                        src={whasappCta.icon.src}
                                        class="h-5 w-5"
                                    />}
                                    {whasappCta?.text}
                                </a>
                            </div>
                        </form>
                    </div>
                    <div class="flex gap-4 justify-center xl:justify-start">
                        <div class="flex flex-col gap-y-5">
                            <div id={rootId + "negativeScreenExtraBenefit1"} class="relative max-w-[226px] min-h-[125px] px-2 py-5 hidden">
                                <p class="text-center text-sm font-semibold relative z-10">{negativeScreenExtraBenefit1.text}</p>
                                {negativeScreenExtraBenefit1.image && <Image
                                    src={negativeScreenExtraBenefit1.image.src}
                                    alt={negativeScreenExtraBenefit1.image.alt || "background"}
                                    width={226}
                                    class="h-full w-full object-fill absolute top-0 left-0"
                                />}
                            </div>
                            <div class="relative max-w-[226px] min-h-[238px] px-2 py-5">
                                <p class="text-center text-sm font-semibold relative z-10">{benefit1.text}</p>
                                {benefit1.image && <Image
                                    src={benefit1.image.src}
                                    alt={benefit1.image.alt || "background"}
                                    width={226}
                                    class="h-full w-full object-fill absolute top-0 left-0"
                                />}
                            </div>
                        </div>
                        <div class="flex flex-col justify-end gap-y-5">
                            <div class="relative max-w-[140px] min-h-[163px] px-2 py-5">
                                <p class="text-center text-sm font-semibold relative z-10">{benefit2.text}</p>
                                {benefit2.image && <Image
                                    src={benefit2.image.src}
                                    alt={benefit2.image.alt || "background"}
                                    width={140}
                                    class="h-full w-full object-fill absolute top-0 left-0"
                                />}
                            </div>
                            <div id={rootId + "negativeScreenExtraBenefit2"} class="relative max-w-[140px] min-h-[191px] h-full px-2 py-5 hidden">
                                <p class="text-center text-sm font-semibold relative z-10">{negativeScreenExtraBenefit2.text}</p>
                                {negativeScreenExtraBenefit2.image && <Image
                                    src={negativeScreenExtraBenefit2.image.src}
                                    alt={negativeScreenExtraBenefit2.image.alt || "background"}
                                    width={140}
                                    class="h-full w-full object-fill absolute top-0 left-0"
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="xl:hidden relative text-2xl text-secondary-content font-semibold py-10 px-4 w-full min-h-[155px]">
                {mobileTopBanner && <Image
                    width={430}
                    height={155}
                    alt={mobileTopBanner.alt || "background image"}
                    src={mobileTopBanner.src}
                    class="absolute w-full h-full top-0 left-0 object-cover -z-10"
                />}
                <p>{title}</p>
            </div>

            <div class="py-14 px-3.5 xl:px-28 relative w-full">
                {contentBackground && <Image
                    width={813}
                    height={971}
                    src={contentBackground.src}
                    alt={contentBackground.alt || "content background"}
                    class="absolute top-0 left-0 -z-50 w-full h-full object-cover"
                />}
                <div class="flex gap-2">
                    {contentTitleIcon && <Image
                        src={contentTitleIcon.src}
                        alt={contentTitleIcon.alt || "icon"}
                        width={14}
                        height={14}
                    />}
                    <div dangerouslySetInnerHTML={{ __html: contentTitle }} />
                </div>
                {contentCaption && <p class="mt-2.5">{contentCaption}</p>}
                {progressImage && <div class="mt-7"><Image
                    width={590}
                    height={70}
                    src={progressImage.src}
                    alt={progressImage.alt || "progress image"}
                    class="max-h-[67px] object-contain object-left"
                /></div>}

                <div class="flex gap-2.5 text-sm mt-[54px]">
                    <div class="w-[68%] 2xl:w-auto">
                        <div class="flex justify-between w-full 2xl:w-[390px] pt-9">
                            <p class="w-[60%] 2xl:w-auto"></p>
                            <p id={rootId + "currentPlanLabel"} class="w-[40%] 2xl:w-40 text-center text-primary font-semibold bg-info-content rounded-[20px] py-2.5 pt-2">😥  menos vantajoso</p>
                        </div>
                    </div>
                    <div class="relative bg-primary pt-9 sm:px-3 max-w-[193px] w-[32%] 2xl:w-full rounded-tl-[20px] rounded-tr-[20px]">
                        <div class="absolute w-full top-[-45px] md:top-[-29px] left-0 h-14 bg-error-content bg-opacity-30 -z-10 rounded-lg">
                            <p class="text-primary text-xs text-center font-semibold pt-2">{saving.indicatedPlanSavingLabel} <span id={rootId + "indicatedPlanLabelSaving"} /></p>
                        </div>
                        <p id={rootId + "indicatedPlanLabel"} class="text-primary text-center font-semibold bg-info-content rounded-[20px] py-2.5 pb-3 pt-2">🚀 mais vantajoso</p>
                    </div>
                </div>

                <div class="flex gap-2.5 text-sm">
                    <div class="w-[68%] 2xl:w-auto">
                        <div class="flex justify-between w-full 2xl:w-[390px] py-[18px]">
                            <p class="w-[60%] 2xl:w-auto"></p>
                            <p id={rootId + "currentPlatform"} class="w-[40%] 2xl:w-40 text-center text-primary font-semibold" />
                        </div>
                    </div>
                    <div class="bg-primary py-[18px] sm:px-3 max-w-[193px] w-[32%] 2xl:w-full">
                        <p class="bg-transparent text-primary-content text-center font-semibold">Loja Integrada</p>
                    </div>
                </div>
                <ResultRow label={result.montlyFeeLabel} userValueId={rootId + "montlyFee"} lojaIntegradaValueId={rootId + "montlyFeeIndicatedPlan"} />
                <ResultRow label={result.salesComissionLabel} userValueId={rootId + "comission"} lojaIntegradaValueId={rootId + "comissionIndicatedPlan"} />
                <ResultRow label={result.platformTotal} userValueId={rootId + "platformTotal"} lojaIntegradaValueId={rootId + "platformTotalIndicatedPlan"} />
                <ResultRow label={result.cardLabel} userValueId={rootId + "cardFeeMoney"} lojaIntegradaValueId={rootId + "cardFeeMoneyIndicatedPlan"} />
                <ResultRow label={result.boletoLabel} userValueId={rootId + "boletoFeeMoney"} lojaIntegradaValueId={rootId + "boletoFeeMoneyIndicatedPlan"} />
                <ResultRow label={result.pixLabel} userValueId={rootId + "pixFeeMoney"} lojaIntegradaValueId={rootId + "pixFeeMoneyIndicatedPlan"} />
                <ResultRow label={result.totalPaymentLabel} userValueId={rootId + "totalPaymentMoney"} lojaIntegradaValueId={rootId + "totalPaymentMoneyIndicatedPlan"} />
                <ResultRow label={result.totalLabel} userValueId={rootId + "totalMoney"} lojaIntegradaValueId={rootId + "totalMoneyIndicatedPlan"} />
                <ResultRow label={result.totalTcoLabel} userValueId={rootId + "totalTco"} lojaIntegradaValueId={rootId + "totalTcoIndicatedPlan"} />

                <div class="flex gap-2.5">
                    <div class="w-[68%] 2xl:w-[390px]" />
                    <div class="flex justify-center bg-primary py-[18px] sm:px-3 max-w-[193px] w-[32%] 2xl:w-full rounded-bl-[20px] rounded-br-[20px]">
                        <a
                            id={result.migrateCta.id}
                            href={result.migrateCta?.href ?? "#"}
                            target={result.migrateCta?.href.includes("http") ? "_blank" : "_self"}
                            class={`btn ${result.migrateCta.outline ? "bg-primary border border-secondary-content text-secondary-content" : "bg-primary-content"}  font-bold hover:scale-110 text-lg h-auto w-full px-3.5`}
                        >
                            {result.migrateCta.icon && <Image
                                width={20}
                                height={20}
                                src={result.migrateCta.icon.src}
                                class="h-5 w-5"
                            />}
                            {result.migrateCta?.text}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TcoCalculatorPage4;