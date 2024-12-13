import type { ImageWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";

const emailInputOnKeyUp = (inputsBorderColor?: string) => {
    const element = event!.currentTarget as HTMLInputElement;

    //limpa mensagem de erro
    element.parentElement?.querySelector(".invalidEmail")?.classList.add("hidden");
    element.parentElement?.querySelector(".text-error")?.classList.add("hidden");
    element.style.borderColor = inputsBorderColor || "#371E55";
}

const moneyInputOnKeyUp = (inputsBorderColor?: string) => {
    const element = event!.currentTarget as HTMLInputElement;
    let valor = element.value;
    valor = valor.replace(/[^\d,]/g, ""); // Remove todos os caracteres não numéricos e não vírgula
    valor = valor.replace(/(,.*),/g, "$1"); // Permite apenas uma vírgula
    valor = valor.replace(/(\,\d{2})\d+/, "$1"); // Limita a dois dígitos após a vírgula
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona ponto a cada 3 dígitos
    if (valor[0] == ',')
        valor = '';
    element.value = "R$ " + valor;
    if (element.value.toLowerCase().includes('nan') || element.value.length == 3)
        element.value = "";

    //limpa mensagem de erro
    element.parentElement?.querySelector(".text-error")?.classList.add("hidden");
    element.style.borderColor = inputsBorderColor || "#371E55";
};

const onClickStart = (rootId: string, inputsErrorMessageColor?: string) => {
    event?.preventDefault();
    const parent = document.getElementById(rootId);

    const form = parent?.querySelector(".page1form");
    let validated = true;
    const emailInput = parent?.querySelector(`#${rootId}emailInput`) as HTMLInputElement;
    const fields = form?.querySelectorAll("label");

    //checa se o email esta em formato válido
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.parentElement?.querySelector(".invalidEmail")?.classList.remove("hidden");
        emailInput.style.borderColor = inputsErrorMessageColor || "#F57E77";
        validated = false;
    }

    //checa se todos os campos foram preenchidos
    fields?.forEach((field) => {
       const input = field.querySelector("input");
       if (input?.value == "") {
            validated = false;
           field.querySelector(".text-error")?.classList.remove("hidden"); //mostra mensagem de erro
           input.style.borderColor = inputsErrorMessageColor || "#F57E77";
       }
    });

    if (parent && validated) {
        Array.from(parent.children)[0].classList.remove("lg:flex");
        Array.from(parent.children)[0].classList.add("hidden");
        Array.from(parent.children)[1].classList.remove("hidden");
    }

     //envia os dados para o hubspot
     const hubspotFields = {
        email: emailInput.value
    };
    // invoke.site.actions.sendTcoUserData({fields, formGuid: '7ed4157b-6a66-425a-aebd-b66f51c1f0c8', portalId: '7112881'});
    const hutk = document.cookie.replace(/(?:(?:^|.;\s)hubspotutk\s=\s([^;]).$)|^.*$/, "$1");
    const context = {
        "hutk": hutk,
        "pageUri": window.location.href,
        "pageName": document.title
    };
    try {
        fetch('/live/invoke/site/actions/sendTcoUserData.ts', {
            body: JSON.stringify({ fields: hubspotFields, formGuid: '5b72e2fa-f5b1-4cb8-b711-612b485f79c2', portalId: '7112881', context: context }),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        }).then((r) => r.json()).then((r) => {
            console.log(r["Success"].includes("error") ? "Erro ao enviar": "Enviado");
            console.log(r)
        });
        
    } catch (error) {
        console.log("Erro:"+error.message);
    }
};
const objectiveOnClick = () => {
    const element = event!.currentTarget as HTMLElement;
    const parent = element.parentElement as HTMLElement;
    Array.from(parent.children).forEach((child) => child.removeAttribute("disabled"));
    element.setAttribute("disabled", "");
};
export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
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
/** @title {{title}} */
export interface Objective {
    title: string;
    titleColor?: string;
    icon: IImage;
}

export interface IInput {
    caption?: string;
    placeholder?: string;
    tooltipMessage?: string;
}
export interface IDropdown {
    caption?: string;
    options?: string[];
    tooltipMessage?: string;
}

export interface Page1 {
    title?: string;
    caption?: string;
    /** 
     * @format color-input
     * @title Title and caption color
     */
    asideTextColor?: string;
    text?: RichText;
    textFont?: string; 
    textWithIcon?: {
        text?: string;
        icon?: IImage;
    };
    asideBottomText?: RichText;
    contentTitle: RichText;
    contentTitleIcon?: IImage;
    contentCaption?: string;
    /** @format color-input */
    contentCaptionColor?: string;
    progressImage?: IImage;
    emailInput?: IInput;
    averageMonthlyRevenue?: IInput;
    currentPlatform?: IDropdown;
    /** @format color-input */
    inputsTextColor?: string;
    /** @format color-input */
    inputsBorderColor?: string;
    invalidEmailErrorMessage?: string;
    inputsNoFillErrorMessage?: string;
    /** @format color-input */
    inputsErrorMessageColor?: string;
    starButtonText?: string;
    /** @format color-input */
    startButtonBackgroundColor?: string
    /** @format color-input */
    startButtonTextColor?: string;
    asideBackground?: IImage;
    asideTopIcon?: IImage;
    contentBackground?: IImage;
    mobileTopBanner: IImage;
    mobileStartBanner: IImage;
    mobileStartBannerTitle?: RichText;
    mobileStartBannerTitleFont?: string;
    mobileStartBannerText?: RichText;
    mobileStartButtonText: string;
    /** @format color-input */
    mobileStartButtonTextColor?: string;
}

function InfoIcon() {
    return <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.35294 0.00439453C3.49201 0.00439453 2.65042 0.275646 1.93458 0.783847C1.21874 1.29205 0.660814 2.01437 0.33135 2.85948C0.00188606 3.70459 -0.0843167 4.63452 0.0836425 5.53169C0.251602 6.42885 0.666179 7.25294 1.27495 7.89976C1.88372 8.54658 2.65934 8.98707 3.50373 9.16552C4.34811 9.34398 5.22334 9.25239 6.01874 8.90234C6.81414 8.55228 7.49397 7.95948 7.97228 7.1989C8.45059 6.43833 8.70588 5.54413 8.70588 4.62939C8.70466 3.40317 8.24566 2.22753 7.42959 1.36046C6.61352 0.493381 5.50704 0.00568945 4.35294 0.00439453ZM4.35294 8.54285C3.62446 8.54285 2.91234 8.31333 2.30663 7.88332C1.70093 7.4533 1.22883 6.8421 0.950056 6.12701C0.671279 5.41192 0.598338 4.62505 0.740458 3.86592C0.882577 3.10678 1.23337 2.40947 1.74849 1.86216C2.2636 1.31485 2.91989 0.942131 3.63437 0.791129C4.34886 0.640127 5.08944 0.717627 5.76246 1.01383C6.43549 1.31003 7.01074 1.81163 7.41546 2.45519C7.82018 3.09876 8.0362 3.85538 8.0362 4.62939C8.03509 5.66695 7.64668 6.66167 6.95617 7.39533C6.26567 8.12899 5.32946 8.54168 4.35294 8.54285ZM5.02262 6.76401C5.02262 6.85836 4.98735 6.94886 4.92455 7.01558C4.86176 7.0823 4.77659 7.11978 4.68778 7.11978C4.51017 7.11978 4.33984 7.04481 4.21425 6.91137C4.08866 6.77793 4.0181 6.59695 4.0181 6.40824V4.62939C3.9293 4.62939 3.84413 4.59191 3.78133 4.52519C3.71854 4.45847 3.68326 4.36798 3.68326 4.27362C3.68326 4.17927 3.71854 4.08878 3.78133 4.02206C3.84413 3.95534 3.9293 3.91786 4.0181 3.91786C4.19571 3.91786 4.36605 3.99282 4.49164 4.12626C4.61723 4.2597 4.68778 4.44068 4.68778 4.62939V6.40824C4.77659 6.40824 4.86176 6.44572 4.92455 6.51244C4.98735 6.57916 5.02262 6.66965 5.02262 6.76401ZM3.68326 2.67266C3.68326 2.56712 3.71272 2.46394 3.76791 2.37618C3.82309 2.28842 3.90154 2.22002 3.99331 2.17963C4.08509 2.13924 4.18608 2.12867 4.28351 2.14926C4.38094 2.16985 4.47043 2.22068 4.54067 2.29531C4.61092 2.36995 4.65875 2.46503 4.67813 2.56855C4.69751 2.67207 4.68757 2.77937 4.64955 2.87688C4.61154 2.9744 4.54716 3.05774 4.46456 3.11638C4.38197 3.17502 4.28486 3.20632 4.18552 3.20632C4.05231 3.20632 3.92456 3.15009 3.83037 3.05001C3.73618 2.94993 3.68326 2.8142 3.68326 2.67266Z" fill="#371E55"/>
    </svg>;
}

function TcoCalculatorPage1({ page1, rootId }: {
    page1: Page1;
    rootId: string;
}) {
    const { title, caption, text, textFont, contentTitle, inputsBorderColor, inputsErrorMessageColor, emailInput, startButtonBackgroundColor, invalidEmailErrorMessage, inputsNoFillErrorMessage, inputsTextColor, averageMonthlyRevenue, currentPlatform, textWithIcon, contentTitleIcon, asideBottomText, contentCaption, progressImage, starButtonText, startButtonTextColor, contentBackground, asideBackground, asideTopIcon, mobileTopBanner, asideTextColor, contentCaptionColor} = page1;
    const inputCaptionClass = "text-base text-primary flex justify-between items-center";
    const inputClass = "bg-transparent min-h-[38px] w-full rounded-lg border border-primary px-4 mt-2.5";
    return (<div class="relative flex flex-wrap lg:flex-nowrap justify-center w-full min-h-[971px] lg:rounded-[10px] overflow-hidden hidden lg:flex">
            <div class={`relative w-full lg:max-w-[437px] pt-[71px] px-11 ${!asideBackground && 'bg-primary'} text-primary-content hidden lg:block`} style={{color: asideTextColor}}>
                {asideTopIcon?.src && <Image width={asideTopIcon.width || 133} height={asideTopIcon.width || 119} src={asideTopIcon.src} alt={asideTopIcon.alt || "content background"} class="absolute top-4 right-[-30px] w-[133px] h-[119px] object-contain z-10"/>}
                {asideBackground?.src && <Image width={asideBackground.width || 813} height={asideBackground.height || 971} src={asideBackground.src} alt={asideBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover object-top"/>}
                <h2 class="text-[32px] leading-[130%] font-bold">{title}</h2>
                {caption && <p class="text-sm mt-5 leading-[120%] font-normal">{caption}</p>}
                <div class="text-[42px] leading-[120%] font-instrument font-normal mt-5" style={{fontFamily: textFont}} dangerouslySetInnerHTML={{__html: text || ""}}/>
                <div class="flex gap-2.5 items-center mt-5">
                    <p class="text-base font-normal leading-normal">{textWithIcon?.text}</p>
                    {textWithIcon?.icon?.src && <Image 
                        src={textWithIcon.icon.src}
                        alt={textWithIcon.icon.alt || "icon"}
                        width={textWithIcon.icon.width || 18}
                        height={textWithIcon.icon.height || 18}
                    />}
                </div>
                <div dangerouslySetInnerHTML={{__html: asideBottomText || ""}} class="font-bold leading-[130%] absolute left-6 bottom-6" />
            </div>

            <div class="lg:hidden relative text-2xl text-secondary-content font-semibold py-10 px-4 w-full min-h-[155px]" style={{color: asideTextColor}} >
                    {mobileTopBanner.src && <Image width={mobileTopBanner.width || 430} height={mobileTopBanner.height || 155} alt={mobileTopBanner.alt || "background image"} src={mobileTopBanner.src} class="absolute w-full h-full top-0 left-0 object-cover -z-10"/>}
                    <p>{title}</p>
            </div>
            
            <div class="py-14 px-3.5 md:px-14 xl:px-28 relative w-full">
                {contentBackground?.src && <Image width={contentBackground.width || 813} height={contentBackground.height || 971} src={contentBackground.src} alt={contentBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover"/>}
                <div class="flex gap-2">
                    {contentTitleIcon?.src && <Image src={contentTitleIcon.src} alt={contentTitleIcon.alt || "icon"} width={contentTitleIcon.width || 14} height={contentTitleIcon.height || 14}/>}
                    <div dangerouslySetInnerHTML={{ __html: contentTitle }}/>
                </div>
                {contentCaption && <p class="mt-2.5" style={{color: contentCaptionColor}}>{contentCaption}</p>}
                {progressImage?.src && <div class="mt-7"><Image width={progressImage.width || 590} height={progressImage.height || 70} src={progressImage.src} alt={progressImage.alt || "progress image"} class="max-h-[67px] object-contain object-left"/></div>}
                
                <form class="flex flex-col gap-[18px] mt-14 max-w-[375px] page1form" >
                    <label class="animate-fade-right" style={{ animationDuration: "0.3s" }}>
                        <div class={inputCaptionClass} style={{color: inputsTextColor }}>
                            <p>{emailInput?.caption}</p>
                            <div class="tooltip tooltip-left" data-tip={emailInput?.tooltipMessage} style={`--tooltip-text-color: black; --tooltip-color: white`}>
                                <InfoIcon />
                            </div>
                        </div>
                        <input class={inputClass} style={{borderColor: inputsBorderColor}} hx-on:keyup={useScript(emailInputOnKeyUp, inputsBorderColor)} type="email" placeholder={emailInput?.placeholder} required id={rootId + 'emailInput'}>
                        </input>
                        <p class="invalidEmail mt-2.5 leading-[120%] text-sm hidden" style={{color: inputsErrorMessageColor}} >{invalidEmailErrorMessage || "Insira um e-mail válido."}</p>
                        <p class="text-error mt-2.5 leading-[120%] text-sm hidden" style={{color: inputsErrorMessageColor}} >{inputsNoFillErrorMessage || "Preencha esse campo obrigatório."}</p>
                    </label>
                    <label class="animate-fade-right" style={{ animationDuration: "0.3s", animationDelay: "0.1s" }}>
                        <div class={inputCaptionClass} style={{color: inputsTextColor }}>
                            <p>{averageMonthlyRevenue?.caption}</p>
                            <div class="tooltip tooltip-left" data-tip={averageMonthlyRevenue?.tooltipMessage} style={`--tooltip-text-color: black; --tooltip-color: white`}>
                                <InfoIcon />
                            </div>
                        </div>
                        <input class={inputClass} style={{borderColor: inputsBorderColor}} hx-on:keyup={useScript(moneyInputOnKeyUp, inputsBorderColor)} type="text" placeholder={averageMonthlyRevenue?.placeholder} required id={rootId + "gmvInput"}>
                        </input>
                        <p class="text-error mt-2.5 leading-[120%] text-sm hidden" style={{color: inputsErrorMessageColor}} >{inputsNoFillErrorMessage || "Preencha esse campo obrigatório."}</p>
                    </label>
                    <label class="animate-fade-right" style={{ animationDuration: "0.3s", animationDelay: "0.2s", opacity: "0", animationFillMode: "forwards" }}>
                        <div class={inputCaptionClass} style={{color: inputsTextColor }}>
                            <p>{currentPlatform?.caption}</p>
                            <div class="tooltip tooltip-primary tooltip-left" data-tip={currentPlatform?.tooltipMessage} style={`--tooltip-text-color: black; --tooltip-color: white`}>
                                <InfoIcon />
                            </div>
                        </div>
                        <select class={inputClass} style={{borderColor: inputsBorderColor}} id={rootId + "currentPlatformInput"}>
                            {currentPlatform?.options?.map(option => (<option>{option}</option>))}
                        </select>
                    </label>
                    <button class="btn btn-primary font-bold px-7 hover:scale-110 text-lg min-h-10 lg:min-h-12 h-auto self-end" 
                        hx-on:click={useScript(onClickStart, rootId, inputsErrorMessageColor)}
                        style={{color: startButtonTextColor, background: startButtonBackgroundColor}}>
                        {starButtonText}
                        <svg width="17" height="17" class=" fill-current" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 0.910645C6.97338 0.910645 5.48104 1.36334 4.2117 2.21149C2.94235 3.05964 1.95302 4.26514 1.36881 5.67556C0.784594 7.08597 0.631737 8.63796 0.929567 10.1352C1.2274 11.6325 1.96254 13.0079 3.04202 14.0874C4.12151 15.1669 5.49686 15.902 6.99415 16.1998C8.49144 16.4977 10.0434 16.3448 11.4538 15.7606C12.8643 15.1764 14.0698 14.187 14.9179 12.9177C15.7661 11.6484 16.2188 10.156 16.2188 8.62939C16.2166 6.58292 15.4027 4.62088 13.9556 3.1738C12.5085 1.72672 10.5465 0.912806 8.5 0.910645ZM11.8888 9.04947L9.51383 11.4245C9.40242 11.5359 9.25131 11.5985 9.09375 11.5985C8.93619 11.5985 8.78509 11.5359 8.67368 11.4245C8.56226 11.3131 8.49967 11.162 8.49967 11.0044C8.49967 10.8468 8.56226 10.6957 8.67368 10.5843L10.0356 9.22314H5.53125C5.37378 9.22314 5.22276 9.16059 5.11141 9.04924C5.00006 8.93789 4.9375 8.78687 4.9375 8.62939C4.9375 8.47192 5.00006 8.3209 5.11141 8.20955C5.22276 8.0982 5.37378 8.03564 5.53125 8.03564H10.0356L8.67368 6.67447C8.56226 6.56306 8.49967 6.41195 8.49967 6.25439C8.49967 6.09683 8.56226 5.94573 8.67368 5.83432C8.78509 5.7229 8.93619 5.66031 9.09375 5.66031C9.25131 5.66031 9.40242 5.7229 9.51383 5.83432L11.8888 8.20932C11.944 8.26446 11.9878 8.32994 12.0177 8.40202C12.0476 8.4741 12.063 8.55137 12.063 8.62939C12.063 8.70742 12.0476 8.78469 12.0177 8.85677C11.9878 8.92885 11.944 8.99433 11.8888 9.04947Z"/>
                        </svg>
                    </button>
                </form>
            </div>
            
        </div>);
}
export default TcoCalculatorPage1;
