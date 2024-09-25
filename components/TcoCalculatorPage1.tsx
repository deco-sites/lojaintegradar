import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";

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
    src: ImageWidget;
    alt?: string;
}

/** @title {{title}} */
export interface Benefit {
    title: string;
    caption: string;
    icon: IImage;
}

/** @title {{title}} */
export interface Objective {
    title: string;
    icon: IImage;
}


  export interface Page1 {
    title: string;
    caption: string;
    benefits?: Benefit[];
    contentTitle: HTMLWidget;
    contentTitleIcon?: IImage;
    contentCaption?: string;
    progressImage?: IImage;
    objectivesCaption: string;
    objectives: Objective[];
    emailCaption: string;
    emailPlaceHolder: string;
    emailButtonText: string;
    asideBackground?: IImage;
    asideTopIcon?: IImage;
    contentBackground?: IImage;
    mobileTopBanner: IImage;
    mobileStartBanner: IImage;
    mobileStartButtonText: string;
}

function TcoCalculatorPage1(
    { page1, rootId }: { page1: Page1; rootId: string },
) {
    const {
        title, caption, benefits, contentTitle, contentTitleIcon, contentCaption, progressImage, objectivesCaption, objectives, emailCaption, emailPlaceHolder, emailButtonText, contentBackground, asideBackground, asideTopIcon, mobileTopBanner
    } = page1;

    return (
        <div
            class="relative flex flex-wrap lg:flex-nowrap justify-center w-full min-h-[971px] lg:rounded-[30px] overflow-hidden hidden lg:flex"
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
            
            <div class="py-14 px-3.5 md:px-14 xl:px-28 relative w-full">
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
                <p class="mt-[117px] text-transparent bg-gradient-to-r from-warning-content to-error-content bg-clip-text text-xl text-center font-semibold">{objectivesCaption}</p>
                <div class="flex flex-wrap justify-center lg:justify-between mt-7 px-10">
                    {objectives.map((objective, index) => (
                        <button 
                            hx-on:click={useScript(objectiveOnClick)} 
                            class="p-6 flex flex-col items-center justify-between w-[154px] min-h-32 border border-neutral hover:border-primary disabled:border-primary rounded-[10px] bg-primary-content group"
                            disabled={index == 0}
                            >
                            <div class="min-h-[26px]"><Image
                                height={26}
                                width={26}
                                src={objective.icon.src}
                                alt={objective.icon.alt || "objective icon"}
                                class="h-full opacity-50 group-hover:opacity-100 group-disabled:opacity-100"
                            /></div>
                            <p class="text-center text-primary opacity-50 group-hover:opacity-100 group-disabled:opacity-100 text-lg font-semibold leading-[120%]">{objective.title}</p>
                        </button>
                    ))}
                </div>
                <p class="text-center text-xl font-semibold mt-[60px] text-transparent bg-gradient-to-r from-warning-content to-error-content bg-clip-text">{emailCaption}</p>
                <div class="tcoEmailForm mt-7" dangerouslySetInnerHTML={{__html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
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

                                    const emailForm = document.getElementById('${rootId+'emailInput'}');
                                    if (emailForm) emailForm.value = emailInput;
                                }
                    });
                    </script>
                `}}/>
                
                <div class="w-full flex justify-center">
                    <input 
                        type="submit"
                        class="btn btn-primary font-bold px-7 hover:scale-110 text-lg min-h-10 lg:min-h-12 h-auto hidden btnStart"
                        value={emailButtonText}
                        hx-on:click={useScript(onClickStart, rootId)}
                    />
                </div>
                
                <form 
                    class={`bg-primary-content flex justify-between py-1.5 pr-1.5 mt-7 text-base text-primary border border-base-200 rounded-xl shadow-spreaded hidden`}
                    hx-on:submit={useScript(onClickStart, rootId)}
                >
                    <input
                        id={rootId + 'emailInput'}
                        type="email"
                        class="w-1/2 md:w-auto md:flex-grow pl-2 md:pl-7 focus:outline-none text-sm md:text-base text-primary"
                        placeholder={emailPlaceHolder}
                        required
                    />
                    <input 
                    type="submit"
                        class="btn btn-primary font-bold px-7 hover:scale-110 text-lg min-h-10 lg:min-h-12 h-auto"
                        value={emailButtonText}
                        >
                    </input>
                </form>
            </div>
        </div>
    );
}

export default TcoCalculatorPage1;