import { useScript } from "deco/hooks/useScript.ts";
import { useId } from "site/sdk/useId.ts";
import { JSX } from 'preact';


const openTalkToSpecialist = () => {
    const form = document.getElementById("talkToSpecialistPopUpForm") as HTMLElement;
    form.classList.remove("hidden"); 
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
            hx-on:click={useScript(openTalkToSpecialist)} 
            style={style}
        >
            {text}
            {underlineText && <span class="underline">{underlineText}</span>}
            {showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                        </svg>}
        </a>
    </div>
}