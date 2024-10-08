import { useScript } from "deco/hooks/useScript.ts";
import { useId } from "site/sdk/useId.ts";
import { JSX } from 'preact';


const openTalkToSpecialist = (rootId: string) => {
    const parent = document.getElementById(rootId) as HTMLElement;
    const popUpForm = parent.querySelector("#" + rootId + "popUpForm");
    popUpForm?.classList.remove("hidden"); 
}

const closeTalkToSpecialist = (rootId: string) => {
    const parent = document.getElementById(rootId) as HTMLElement;
    const popUpForm = parent.querySelector("#" + rootId + "popUpForm");
    popUpForm?.classList.add("hidden"); 
}


export interface Props {
    text?: string;
    underlineText?: string;
    ctaClass?: string;
    divClass?: string;
    key?: string;
    style?: JSX.CSSProperties;
    showIcon?: boolean;
}

export default function TalkToSpecialistCta({ctaClass, key, text, divClass, style, underlineText, showIcon}: Props) {
    const rootId = useId();

    return <div id={rootId} class={divClass}>
        <a
            key={key}
            class={ctaClass}
            hx-on:click={useScript(openTalkToSpecialist, rootId)} 
            style={style}
        >
            {text}
            {underlineText && <span class="underline">{underlineText}</span>}
            {showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                        </svg>}
        </a>
        <div id={rootId + "popUpForm"} class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-[60] talkToSpecialistForm overflow-auto hidden">
            <div class="max-w-[550px] min-h-[600px] bg-primary-content rounded-xl lg:p-12 animate-pop-up relative pt-12" style={{animationDuration: "0.3s"}}>
                <button class="text-[#371E55] font-black p-2.5 absolute top-2 right-2" hx-on:click={useScript(closeTalkToSpecialist, rootId)}>X</button>
                <div dangerouslySetInnerHTML={{
                    __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                                                                    <script>
                                                                    hbspt.forms.create({
                                                                        region: "na1",
                                                                        portalId: "7112881",
                                                                        formId: "06d3df52-7c37-4749-aa27-5c7744917d89"
                                                                    });
                                                                    </script>
                `}}/>
            </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
            .talkToSpecialistForm .hs-form-private {
            position: relative;
            background-color: white;
            display: flex; /* flex */
            flex-wrap: wrap;
            justify-content: space-between; /* justify-between */
            padding-top: 0.375rem; /* py-1.5 */
            padding-bottom: 0.375rem; /* py-1.5 */
            padding-right: 0.375rem; /* pr-1.5 */
            font-size: 1rem; /* text-base */
            color: #371E55;
            border-width: 1px;
            --tw-border-opacity: 1;
            border-color: #371E55;
            border-radius: 0 0.75rem 0.75rem 0.75rem; /* rounded-xl */
            }

            .talkToSpecialistForm .hs-form-private {
            justify-content: center;
            border: none;
            background-color: transparent;
            padding: 10px;
            }

            .talkToSpecialistForm .hs-form-field {
            width: 100%;
            margin-bottom: 30px;
            }
            .talkToSpecialistForm .hs-button {
                --tw-bg-opacity: 1;
                background-color: #371E55;
                --tw-text-opacity: 1;
                color: white;
                cursor:pointer;
                transition: transform 0.2s ease-in-out;
                height: 100%;
                padding: 0px 30px 0px 30px;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                border-radius: 8px;
            }
            .talkToSpecialistForm .hs-button:hover {
            transform: scale(1.15);
            }

            .talkToSpecialistForm span {
                color: #371E55
            }

            .talkToSpecialistForm .hs-input {
            padding-left: 0.5rem; /* 2 * 0.25rem */
            outline: none;
            font-size: 0.875rem; /* text-sm */
            }

            .talkToSpecialistForm .actions {
            height: 47px;
            }

            .talkToSpecialistForm .input {
            display: flex;
            align-items: center;
            background-color: transparent;
            width: 100%;
            border-radius: 10px;
            border: 1px solid;
            --tw-border-opacity: 1;
                border-color: var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));
            }

            .talkToSpecialistForm .hs-form-private {
            justify-content: center;
            border: none;
            background-color: transparent;
            padding: 10px;
            }

.talkToSpecialistForm .hs-form-field {
  width: 100%;
  margin-bottom: 30px;
}

.talkToSpecialistForm .input {
  display: flex;
  align-items: center;
  background-color: transparent;
  width: 100%;
  border-radius: 10px;
  border: 1px solid;
  --tw-border-opacity: 1;
    border-color: #371E55;
}

            `}} />
    </div>
}