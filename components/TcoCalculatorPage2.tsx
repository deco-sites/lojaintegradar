import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";

const moneyInputOnKeyUp = () => {
    const element = event!.currentTarget as HTMLInputElement;
    let valor = element.value;
    valor = valor.replace(/[^\d,]/g, ""); // Remove todos os caracteres não numéricos e não vírgula
    valor = valor.replace(/(,.*),/g, "$1"); // Permite apenas uma vírgula
    valor = valor.replace(/(\,\d{2})\d+/, "$1"); // Limita a dois dígitos após a vírgula
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona ponto a cada 3 dígitos
    if (valor[0] == ',') valor = '';
    element.value = "R$ " + valor;
    if (element.value.toLowerCase().includes('nan') || element.value.length == 3) element.value = "";

}

const percentageInputOnKeyUp = () => {
    const element = event!.currentTarget as HTMLInputElement;
    const keyEvent = event as KeyboardEvent;
    let valor = element.value;
    valor = valor.replace(/[^\d,]/g, ""); // Remove todos os caracteres não numéricos e não vírgula
    valor = valor.replace(/(,.*),/g, "$1"); // Permite apenas uma vírgula
    if( keyEvent.key === "Backspace" ) valor = valor.slice(0, -1);
    if (valor[0] == ',') valor = '';
    element.value = valor + "%"; // Adiciona o símbolo de porcentagem
    if (element.value == "%") element.value = "";
}

const onClickNext = (rootId: string) => {
    const parent = document.getElementById(rootId);
    event?.preventDefault();
    if (parent) {
        Array.from(parent.children)[1].classList.add("hidden");
        Array.from(parent.children)[2].classList.remove("hidden");
    }
};

const onClickBack = (rootId: string) => {
    const parent = document.getElementById(rootId);
    event?.preventDefault();
    if (parent) {
        Array.from(parent.children)[0].classList.add("lg:flex");
        Array.from(parent.children)[0].classList.remove("hidden");
        Array.from(parent.children)[1].classList.add("hidden");
    }
};

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

export interface IInput{
    caption: string;
    placeholder: string;
    tooltipMessage: string;
}

export interface IDropdown {
    caption: string;
    options: string[];
    tooltipMessage?: string;
}

export interface Page1 {
    title: string;
    caption: string;
    benefits?: IBenefit[];
    contentTitle: HTMLWidget;
    contentTitleIcon?: IImage;
    contentCaption?: string;
    asideBackground?: IImage;
    asideTopIcon?: IImage;
    contentBackground?: IImage;
    mobileTopBanner: IImage;
}

export interface Page2 { 
    progressImage?: IImage 
    averageMonthlyRevenue: IInput;
    currentPlatform: IDropdown;
    currentPlatformMonthlyFee: IInput;
    currentPlatformComission: IInput;
    MontlyOrders: IInput;
    nextButtonText: string;
    backButtonText: string;
}

function InfoIcon() {
    return <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.35294 0.00439453C3.49201 0.00439453 2.65042 0.275646 1.93458 0.783847C1.21874 1.29205 0.660814 2.01437 0.33135 2.85948C0.00188606 3.70459 -0.0843167 4.63452 0.0836425 5.53169C0.251602 6.42885 0.666179 7.25294 1.27495 7.89976C1.88372 8.54658 2.65934 8.98707 3.50373 9.16552C4.34811 9.34398 5.22334 9.25239 6.01874 8.90234C6.81414 8.55228 7.49397 7.95948 7.97228 7.1989C8.45059 6.43833 8.70588 5.54413 8.70588 4.62939C8.70466 3.40317 8.24566 2.22753 7.42959 1.36046C6.61352 0.493381 5.50704 0.00568945 4.35294 0.00439453ZM4.35294 8.54285C3.62446 8.54285 2.91234 8.31333 2.30663 7.88332C1.70093 7.4533 1.22883 6.8421 0.950056 6.12701C0.671279 5.41192 0.598338 4.62505 0.740458 3.86592C0.882577 3.10678 1.23337 2.40947 1.74849 1.86216C2.2636 1.31485 2.91989 0.942131 3.63437 0.791129C4.34886 0.640127 5.08944 0.717627 5.76246 1.01383C6.43549 1.31003 7.01074 1.81163 7.41546 2.45519C7.82018 3.09876 8.0362 3.85538 8.0362 4.62939C8.03509 5.66695 7.64668 6.66167 6.95617 7.39533C6.26567 8.12899 5.32946 8.54168 4.35294 8.54285ZM5.02262 6.76401C5.02262 6.85836 4.98735 6.94886 4.92455 7.01558C4.86176 7.0823 4.77659 7.11978 4.68778 7.11978C4.51017 7.11978 4.33984 7.04481 4.21425 6.91137C4.08866 6.77793 4.0181 6.59695 4.0181 6.40824V4.62939C3.9293 4.62939 3.84413 4.59191 3.78133 4.52519C3.71854 4.45847 3.68326 4.36798 3.68326 4.27362C3.68326 4.17927 3.71854 4.08878 3.78133 4.02206C3.84413 3.95534 3.9293 3.91786 4.0181 3.91786C4.19571 3.91786 4.36605 3.99282 4.49164 4.12626C4.61723 4.2597 4.68778 4.44068 4.68778 4.62939V6.40824C4.77659 6.40824 4.86176 6.44572 4.92455 6.51244C4.98735 6.57916 5.02262 6.66965 5.02262 6.76401ZM3.68326 2.67266C3.68326 2.56712 3.71272 2.46394 3.76791 2.37618C3.82309 2.28842 3.90154 2.22002 3.99331 2.17963C4.08509 2.13924 4.18608 2.12867 4.28351 2.14926C4.38094 2.16985 4.47043 2.22068 4.54067 2.29531C4.61092 2.36995 4.65875 2.46503 4.67813 2.56855C4.69751 2.67207 4.68757 2.77937 4.64955 2.87688C4.61154 2.9744 4.54716 3.05774 4.46456 3.11638C4.38197 3.17502 4.28486 3.20632 4.18552 3.20632C4.05231 3.20632 3.92456 3.15009 3.83037 3.05001C3.73618 2.94993 3.68326 2.8142 3.68326 2.67266Z" fill="#371E55"/>
    </svg>
}

function TcoCalculatorPage2(
    { page1, rootId, page2 }: { page1: Page1; page2: Page2; rootId: string, },
) {
    const {
        title, caption, benefits, contentTitle, contentTitleIcon, contentCaption, contentBackground, asideBackground, asideTopIcon, mobileTopBanner
    } = page1;

    const { progressImage, averageMonthlyRevenue, currentPlatform, currentPlatformMonthlyFee, currentPlatformComission, MontlyOrders, nextButtonText, backButtonText } = page2;

    const inputCaptionClass = "text-base text-primary flex justify-between items-center";
    const inputClass = "bg-transparent min-h-[38px] w-full rounded-lg border border-primary px-4 mt-2.5";

    return (
        <div
            class="relative flex flex-wrap lg:flex-nowrap w-full min-h-[971px] lg:rounded-[30px] overflow-hidden hidden"
        >

            <div class={`relative w-full lg:max-w-[437px] pt-[121px] px-11 ${!asideBackground && 'bg-primary'} text-primary-content hidden lg:block`}>
                {asideTopIcon && <Image
                    width={133}
                    height={119}
                    src={asideTopIcon.src}
                    alt={asideTopIcon.alt || "content background"}
                    class="absolute top-4 right-[-30px] w-[133px] h-[119px] object-contain z-10"
                />}
                {asideBackground && <Image
                    width={813}
                    height={971}
                    src={asideBackground.src}
                    alt={asideBackground.alt || "content background"}
                    class="absolute top-0 left-0 -z-50 w-full h-full object-cover"
                />}
                <h2 class="text-[32px] leading-[130%]">{title}</h2>
                <p class="text-sm mt-5 leading-[120%]">{caption}</p>
                <div class="mt-[60px]">
                    {benefits && benefits.map((benefit) => (
                        <div class="mt-[30px]">
                            <div class="flex">
                                <Image
                                    height={17}
                                    width={17}
                                    src={benefit.icon.src}
                                    alt={benefit.icon.alt || "benefit icon"}
                                    class="mr-2.5"
                                />
                                <p>{benefit.title}</p>
                            </div>
                            <p class="mt-2.5 text-sm">{benefit.caption}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div class="lg:hidden relative text-2xl text-secondary-content font-semibold py-10 px-4 w-full min-h-[155px]">
                    {mobileTopBanner && <Image 
                        width={430}
                        height={155}
                        alt={mobileTopBanner.alt || "background image"}
                        src={mobileTopBanner.src}
                        class="absolute w-full h-full top-0 left-0 object-cover -z-10"
                    />}
                    <p>{title}</p>
            </div>

            <div class="py-14 px-3.5 lg:px-28 relative w-full overflow-hidden">
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

                <form class="flex flex-col gap-[18px] mt-14 max-w-[375px]" hx-on:submit={useScript(onClickNext, rootId)}>
                    <label class="animate-fade-right" style={{animationDuration: "0.3s"}}>
                        <div class={inputCaptionClass} >
                            <p>{averageMonthlyRevenue.caption}</p>
                            <div class="tooltip tooltip-primary tooltip-left" data-tip={averageMonthlyRevenue.tooltipMessage}>
                                <InfoIcon />
                            </div>
                        </div>
                        <input
                            class={inputClass}
                            hx-on:keyup={useScript(moneyInputOnKeyUp)}
                            type="text"
                            placeholder={averageMonthlyRevenue.placeholder}
                            required
                            id={rootId+"gmvInput"}
                        >
                        </input>
                    </label>
                    <label class="animate-fade-right" style={{animationDuration: "0.3s", animationDelay: "0.1s", opacity: "0", animationFillMode: "forwards"}}>
                        <div class={inputCaptionClass} >
                            <p>{currentPlatform.caption}</p>
                            <div class="tooltip tooltip-primary tooltip-left" data-tip={currentPlatform.tooltipMessage}>
                                <InfoIcon />
                            </div>
                        </div>
                        <select 
                            class={inputClass}
                            id={rootId+"currentPlatformInput"}
                        >
                            {currentPlatform.options.map(option => (
                                <option>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label class="animate-fade-right" style={{animationDuration: "0.3s", animationDelay: "0.2s", opacity: "0", animationFillMode: "forwards"}}>
                        <div class={inputCaptionClass} >
                            <p>{currentPlatformMonthlyFee.caption}</p>
                            <div class="tooltip tooltip-primary tooltip-left" data-tip={currentPlatformMonthlyFee.tooltipMessage}>
                                <InfoIcon />
                            </div>
                        </div>
                        <input
                            name="test"
                            class={inputClass}
                            hx-on:keyup={useScript(moneyInputOnKeyUp)}
                            type="text"
                            placeholder={currentPlatformMonthlyFee.placeholder}
                            required
                            id={rootId + 'montlyFeeInput'}
                        >
                        </input>
                    </label>
                    <label class="animate-fade-right" style={{animationDuration: "0.3s", animationDelay: "0.3s", opacity: "0", animationFillMode: "forwards"}}>
                        <div class={inputCaptionClass} >
                            <p>{currentPlatformComission.caption}</p>
                            <div class="tooltip tooltip-primary tooltip-left" data-tip={currentPlatformComission.tooltipMessage}>
                                <InfoIcon />
                            </div>
                        </div>
                        <input
                            class={inputClass}
                            hx-on:keyup={useScript(percentageInputOnKeyUp)}
                            type="text"
                            placeholder={currentPlatformComission.placeholder}
                            id={rootId + 'comissionInput'}
                            required
                        >
                        </input>
                    </label>
                    <label class="animate-fade-right" style={{animationDuration: "0.3s", animationDelay: "0.4s", opacity: "0", animationFillMode: "forwards"}}>
                        <div class={inputCaptionClass} >
                            <p>{MontlyOrders.caption}</p>
                            <div class="tooltip tooltip-primary tooltip-left" data-tip={MontlyOrders.tooltipMessage}>
                                <InfoIcon />
                            </div>
                        </div>
                        <input
                            class={inputClass}
                            type="number"
                            placeholder={MontlyOrders.placeholder}
                            required
                            id={rootId + 'montlyOrdersInput'}
                        >
                        </input>
                    </label>
                    <div class="flex justify-end gap-10">
                        <button 
                            class="flex items-center gap-1 font-bold hover:scale-110 text-lg transition-transform text-primary"
                            hx-on:click={useScript(onClickBack, rootId)}
                            >
                            <svg width="17" height="17" class="text-primary fill-current rotate-180" viewBox="0 0 17 17"  xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 0.910645C6.97338 0.910645 5.48104 1.36334 4.2117 2.21149C2.94235 3.05964 1.95302 4.26514 1.36881 5.67556C0.784594 7.08597 0.631737 8.63796 0.929567 10.1352C1.2274 11.6325 1.96254 13.0079 3.04202 14.0874C4.12151 15.1669 5.49686 15.902 6.99415 16.1998C8.49144 16.4977 10.0434 16.3448 11.4538 15.7606C12.8643 15.1764 14.0698 14.187 14.9179 12.9177C15.7661 11.6484 16.2188 10.156 16.2188 8.62939C16.2166 6.58292 15.4027 4.62088 13.9556 3.1738C12.5085 1.72672 10.5465 0.912806 8.5 0.910645ZM11.8888 9.04947L9.51383 11.4245C9.40242 11.5359 9.25131 11.5985 9.09375 11.5985C8.93619 11.5985 8.78509 11.5359 8.67368 11.4245C8.56226 11.3131 8.49967 11.162 8.49967 11.0044C8.49967 10.8468 8.56226 10.6957 8.67368 10.5843L10.0356 9.22314H5.53125C5.37378 9.22314 5.22276 9.16059 5.11141 9.04924C5.00006 8.93789 4.9375 8.78687 4.9375 8.62939C4.9375 8.47192 5.00006 8.3209 5.11141 8.20955C5.22276 8.0982 5.37378 8.03564 5.53125 8.03564H10.0356L8.67368 6.67447C8.56226 6.56306 8.49967 6.41195 8.49967 6.25439C8.49967 6.09683 8.56226 5.94573 8.67368 5.83432C8.78509 5.7229 8.93619 5.66031 9.09375 5.66031C9.25131 5.66031 9.40242 5.7229 9.51383 5.83432L11.8888 8.20932C11.944 8.26446 11.9878 8.32994 12.0177 8.40202C12.0476 8.4741 12.063 8.55137 12.063 8.62939C12.063 8.70742 12.0476 8.78469 12.0177 8.85677C11.9878 8.92885 11.944 8.99433 11.8888 9.04947Z" />
                            </svg>
                            {backButtonText}
                        </button>
                        <button 
                            class="flex items-center gap-1 font-bold hover:scale-110 text-lg transition-transform text-primary"
                            type="submit"
                            >
                            {nextButtonText}
                            <svg width="17" height="17" class="text-primary fill-current" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 0.910645C6.97338 0.910645 5.48104 1.36334 4.2117 2.21149C2.94235 3.05964 1.95302 4.26514 1.36881 5.67556C0.784594 7.08597 0.631737 8.63796 0.929567 10.1352C1.2274 11.6325 1.96254 13.0079 3.04202 14.0874C4.12151 15.1669 5.49686 15.902 6.99415 16.1998C8.49144 16.4977 10.0434 16.3448 11.4538 15.7606C12.8643 15.1764 14.0698 14.187 14.9179 12.9177C15.7661 11.6484 16.2188 10.156 16.2188 8.62939C16.2166 6.58292 15.4027 4.62088 13.9556 3.1738C12.5085 1.72672 10.5465 0.912806 8.5 0.910645ZM11.8888 9.04947L9.51383 11.4245C9.40242 11.5359 9.25131 11.5985 9.09375 11.5985C8.93619 11.5985 8.78509 11.5359 8.67368 11.4245C8.56226 11.3131 8.49967 11.162 8.49967 11.0044C8.49967 10.8468 8.56226 10.6957 8.67368 10.5843L10.0356 9.22314H5.53125C5.37378 9.22314 5.22276 9.16059 5.11141 9.04924C5.00006 8.93789 4.9375 8.78687 4.9375 8.62939C4.9375 8.47192 5.00006 8.3209 5.11141 8.20955C5.22276 8.0982 5.37378 8.03564 5.53125 8.03564H10.0356L8.67368 6.67447C8.56226 6.56306 8.49967 6.41195 8.49967 6.25439C8.49967 6.09683 8.56226 5.94573 8.67368 5.83432C8.78509 5.7229 8.93619 5.66031 9.09375 5.66031C9.25131 5.66031 9.40242 5.7229 9.51383 5.83432L11.8888 8.20932C11.944 8.26446 11.9878 8.32994 12.0177 8.40202C12.0476 8.4741 12.063 8.55137 12.063 8.62939C12.063 8.70742 12.0476 8.78469 12.0177 8.85677C11.9878 8.92885 11.944 8.99433 11.8888 9.04947Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}

export default TcoCalculatorPage2;