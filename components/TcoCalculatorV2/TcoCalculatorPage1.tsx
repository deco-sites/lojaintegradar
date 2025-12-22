import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";

import { useScript } from "@deco/deco/hooks";
const onClickStart = (rootId: string) => {
    event?.preventDefault();
    const parent = document.getElementById(rootId);
    if (parent) {
        Array.from(parent.children)[0].classList.remove("lg:flex");
        Array.from(parent.children)[0].classList.add("hidden");
        Array.from(parent.children)[1].classList.remove("hidden");
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
    icon: IImage;
}
/** @title {{title}} */
export interface Objective {
    title: string;
    titleColor?: string;
    icon: IImage;
}
export interface Page1 {
    title: string;
    caption: string;
    /** 
     * @format color-input
     * @title Title and caption color
     */
    asideTextColor?: string;
    text?: HTMLWidget; 
    textWithIcon?: {
        text?: string;
        icon?: IImage;
    };
    benefits?: Benefit[];
    asideBottomText?: HTMLWidget;
    contentTitle: HTMLWidget;
    contentTitleIcon?: IImage;
    contentCaption?: string;
    /** @format color-input */
    contentCaptionColor?: string;
    progressImage?: IImage;
    objectivesCaption: string;
    /** @format color-input */
    objectivesCaptionColor?: string;
    objectives: Objective[];
    /** @format color-input */
    objectivesTextColor?: string;
    /** @format color-input */
    objectivesBorderColor?: string;
    emailCaption: string;
    /** @format color-input */
    emailCaptionColor?: string;
    /** @format color-input */
    hubspotButtonColor?: string;
    /** @format color-input */
    hubspotButtonTextColor?: string;
    /** @format color-input */
    hubspotErrorMessageColor?: string;
    emailPlaceHolder: string;
    emailButtonText: string;
    asideBackground?: IImage;
    asideTopIcon?: IImage;
    contentBackground?: IImage;
    mobileTopBanner: IImage;
    mobileStartBanner: IImage;
    mobileStartButtonText: string;
}
function TcoCalculatorPage1({ page1, rootId }: {
    page1: Page1;
    rootId: string;
}) {
    const { title, caption, text, benefits, contentTitle, textWithIcon, contentTitleIcon, asideBottomText, contentCaption, progressImage, objectivesCaption, objectives, emailCaption, emailPlaceHolder, emailButtonText, contentBackground, asideBackground, asideTopIcon, mobileTopBanner, asideTextColor, contentCaptionColor, objectivesCaptionColor, emailCaptionColor, objectivesTextColor, hubspotButtonColor, hubspotButtonTextColor, hubspotErrorMessageColor, objectivesBorderColor } = page1;
    return (<div class="relative flex flex-wrap lg:flex-nowrap justify-center w-full min-h-[971px] lg:rounded-[30px] overflow-hidden hidden lg:flex">
            <div class={`relative w-full lg:max-w-[437px] pt-[71px] px-11 ${!asideBackground && 'bg-primary'} text-primary-content hidden lg:block`} style={{color: asideTextColor}}>
                {asideTopIcon?.src && <img width={asideTopIcon.width || 133} height={asideTopIcon.width || 119} src={asideTopIcon.src} alt={asideTopIcon.alt || "content background"} class="absolute top-4 right-[-30px] w-[133px] h-[119px] object-contain z-10"/>}
                {asideBackground?.src && <img width={asideBackground.width || 813} height={asideBackground.height || 971} src={asideBackground.src} alt={asideBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover object-top"/>}
                <h2 class="text-[32px] leading-[130%] font-bold">{title}</h2>
                <p class="text-sm mt-5 leading-[120%] font-normal">{caption}</p>
                <div class="text-[42px] leading-[120%] font-instrument font-normal mt-5" dangerouslySetInnerHTML={{__html: text || ""}}/>
                <div class="flex gap-2.5 items-center">
                    <p class="text-base font-normal leading-normal">{textWithIcon?.text}</p>
                    {textWithIcon?.icon?.src && <img 
                        src={textWithIcon.icon.src}
                        alt={textWithIcon.icon.alt || "icon"}
                        width={textWithIcon.icon.width || 18}
                        height={textWithIcon.icon.height || 18}
                    />}
                </div>
                <div class="mt-[60px]">
                    {benefits && benefits.map((benefit) => (<div class="mt-[30px]">
                            <div class="flex">
                                {benefit.icon.src && <img height={benefit.icon.height || 17} width={benefit.icon.width || 17} src={benefit.icon.src} alt={benefit.icon.alt || "benefit icon"} class="mr-2.5"/>}
                                <p style={{color: benefit.titleColor}}>{benefit.title}</p>
                            </div>
                            <p class="mt-2.5 text-sm" style={{color: benefit.captionColor}}>{benefit.caption}</p>
                        </div>))}
                </div>
                <div dangerouslySetInnerHTML={{__html: asideBottomText || ""}} class="font-bold leading-[130%] absolute left-6 bottom-6" />
            </div>

            <div class="lg:hidden relative text-2xl text-secondary-content font-semibold py-10 px-4 w-full min-h-[155px]" style={{color: asideTextColor}} >
                    {mobileTopBanner.src && <img width={mobileTopBanner.width || 430} height={mobileTopBanner.height || 155} alt={mobileTopBanner.alt || "background image"} src={mobileTopBanner.src} class="absolute w-full h-full top-0 left-0 object-cover -z-10"/>}
                    <p>{title}</p>
            </div>
            
            <div class="py-14 px-3.5 md:px-14 xl:px-28 relative w-full">
                {contentBackground?.src && <img width={contentBackground.width || 813} height={contentBackground.height || 971} src={contentBackground.src} alt={contentBackground.alt || "content background"} class="absolute top-0 left-0 -z-50 w-full h-full object-cover"/>}
                <div class="flex gap-2">
                    {contentTitleIcon?.src && <img src={contentTitleIcon.src} alt={contentTitleIcon.alt || "icon"} width={contentTitleIcon.width || 14} height={contentTitleIcon.height || 14}/>}
                    <div dangerouslySetInnerHTML={{ __html: contentTitle }}/>
                </div>
                {contentCaption && <p class="mt-2.5" style={{color: contentCaptionColor}}>{contentCaption}</p>}
                {progressImage?.src && <div class="mt-7"><img width={progressImage.width || 590} height={progressImage.height || 70} src={progressImage.src} alt={progressImage.alt || "progress image"} class="max-h-[67px] object-contain object-left"/></div>}
                <p class="mt-[117px] text-transparent  bg-clip-text text-xl text-center font-semibold" style={{background: objectivesCaptionColor, backgroundClip: "text"}}>{objectivesCaption}</p>
                <div class="flex flex-wrap gap-y-6 justify-center lg:justify-between mt-7 px-10">
                    {objectives.map((objective, index) => (<button hx-on:click={useScript(objectiveOnClick)} class="p-6 flex flex-col items-center justify-between w-[154px] min-h-32 border border-neutral hover:border-primary disabled:border-primary rounded-[10px] bg-primary-content group" disabled={index == 0} style={{borderColor: objectivesBorderColor}}>
                            <div class="min-h-[26px]">{objective.icon.src && <img height={objective.icon.height || 26} width={objective.icon.width || 26} src={objective.icon.src} alt={objective.icon.alt || "objective icon"} class="h-full opacity-50 group-hover:opacity-100 group-disabled:opacity-100"/>}</div>
                            <p class="text-center text-primary opacity-50 group-hover:opacity-100 group-disabled:opacity-100 text-lg font-semibold leading-[120%]" style={{color: objectivesTextColor}}>{objective.title}</p>
                        </button>))}
                </div>
                <p class="text-center text-xl font-semibold mt-[60px] text-transparent bg-clip-text" style={{background: emailCaptionColor, backgroundClip: "text"}} >{emailCaption}</p>
                <div class="tcoEmailForm mt-7" dangerouslySetInnerHTML={{ __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                    <script>
                    hbspt.forms.create({
                        region: "na1",
                        portalId: "7112881",
                        formId: "5b72e2fa-f5b1-4cb8-b711-612b485f79c2",
                        onFormSubmit: function($form){
                                    const parent = document.getElementById('${rootId}');
                                    if (parent) {
                                        Array.from(parent.children)[0].classList.remove("lg:flex");
                                        Array.from(parent.children)[0].classList.add("hidden");
                                        Array.from(parent.children)[1].classList.remove("hidden");
                                        parent.querySelector('.btnStart').classList.remove("hidden");
                                    }
                                    
                                    const emailInput = $form.querySelector('input[name="email"]').value;

                                    const emailForm = document.getElementById('${rootId + 'emailInput'}');
                                    if (emailForm) emailForm.value = emailInput;
                                }
                    });
                    </script>
                ` }}/>
                
                <div class="w-full flex justify-center">
                    <input type="submit" class="btn btn-primary font-bold px-7 hover:scale-110 text-lg min-h-10 lg:min-h-12 h-auto hidden btnStart" style={{background: hubspotButtonColor, color: hubspotButtonTextColor}} value={emailButtonText} hx-on:click={useScript(onClickStart, rootId)}/>
                </div>
                
                <form class={`bg-primary-content flex justify-between py-1.5 pr-1.5 mt-7 text-base text-primary border border-base-200 rounded-xl shadow-spreaded hidden`} hx-on:submit={useScript(onClickStart, rootId)}>
                    <input id={rootId + 'emailInput'} type="email" class="w-1/2 md:w-auto md:flex-grow pl-2 md:pl-7 focus:outline-none text-sm md:text-base text-primary" placeholder={emailPlaceHolder} required/>
                    <input type="submit" class="btn btn-primary font-bold px-7 hover:scale-110 text-lg min-h-10 lg:min-h-12 h-auto" value={emailButtonText}>
                    </input>
                </form>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                .tcoEmailForm .hs-form-private {
                    position: relative;
                    background-color: var(--color-primary-content); /* bg-primary-content */
                    display: flex; /* flex */
                    justify-content: space-between; /* justify-between */
                    padding-top: 0.375rem; /* py-1.5 */
                    padding-bottom: 0.375rem; /* py-1.5 */
                    padding-right: 0.375rem; /* pr-1.5 */
                    font-size: 1rem; /* text-base */
                    color: var(--color-primary); /* text-primary */
                    border-width: 1px;
                    --tw-border-opacity: 1;
                    border-color: var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));
                    border-radius: 0 0.75rem 0.75rem 0.75rem; /* rounded-xl */
                    box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
                    --tw-bg-opacity: 1;
                    background-color: var(--fallback-pc,oklch(var(--pc)/var(--tw-bg-opacity)));
                    border: none;
                    border-radius: 10px;
                    flex-wrap: nowrap;
                }
                
                .tcoEmailForm .actions {
                    height: 47px;
                }

                .tcoEmailForm .hs-input {
                    width: 100%;
                    margin-top: 10px;
                }

                .tcoEmailForm .hs-button {
                    background-color: ${hubspotButtonColor};
                    color: ${hubspotButtonTextColor};
                    cursor:pointer;
                    transition: transform 0.2s ease-in-out;
                    height: 100%;
                    padding: 0px 30px 0px 30px;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 700;
                    border-radius: 8px;
                }

                        .tcoEmailForm .hs-button:hover {
                transform: scale(1.15);
                }

                .tcoEmailForm .hs-input {
                padding-left: 0.5rem; /* 2 * 0.25rem */
                outline: none;
                font-size: 0.875rem; /* text-sm */
                }

                .tcoEmailForm .input  {
                    outline: none; /* Remove a borda padrão */
                    border: none;
                    box-shadow: none; /* Remove qualquer sombra */
                }

                .tcoEmailForm .hs-error-msg {
                --tw-text-opacity: 1;
                    color: var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)));
                }

                .tcoEmailForm .submitted-message {
                text-align: center;
                }

                .tcoEmailForm .hs-error-msg {
                position: absolute;
                top: 60px;
                left: 24px;
                max-width: 50%;
                color: ${hubspotErrorMessageColor}
                }

                .tcoEmailForm .hs_error_rollup {
                    display: none;
                    }
                
                @media (min-width: 768px) {
                .tcoEmailForm .hs-input {
                    width: auto;
                    flex-grow: 1;
                    padding-left: 1.75rem; /* 7 * 0.25rem */
                    font-size: 1rem; /* text-base */
                }


                `}} />
        </div>);
}
export default TcoCalculatorPage1;
