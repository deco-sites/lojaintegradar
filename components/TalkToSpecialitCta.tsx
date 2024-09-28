import { useScript } from "deco/hooks/useScript.ts";
import { useId } from "site/sdk/useId.ts";
import { CSS } from "../static/css2.ts";

const openTalkToSpecialist = (rootId: string) => {
    event!.preventDefault();
    const parent = document.getElementById(rootId) as HTMLElement;
    const popUpForm = parent.querySelector("#" + rootId + "popUpForm");
    popUpForm?.classList.remove("hidden"); 
}

const closeTalkToSpecialist = (rootId: string) => {
    event!.preventDefault();
    const parent = document.getElementById(rootId) as HTMLElement;
    const popUpForm = parent.querySelector("#" + rootId + "popUpForm");
    popUpForm?.classList.add("hidden"); 
}


export interface Props {
    text?: string;
    ctaClass?: string;
    divClass?: string;
    key?: string;
}

export default function TalkToSpecialistCta({ctaClass, key, text, divClass}: Props) {
    const rootId = useId();

    return <div id={rootId} class={divClass}>
        <a
            key={key}
            class={ctaClass}
            hx-on:click={useScript(openTalkToSpecialist, rootId)} 
        >
            {text}
        </a>
        <div id={rootId + "popUpForm"} class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-50 talkToSpecialistForm overflow-auto hidden">
                        <style dangerouslySetInnerHTML={{ __html: CSS }} />
                        <div class="max-w-[550px] min-h-[600px] bg-primary-content rounded-xl lg:p-12 animate-pop-up relative pt-12" style={{animationDuration: "0.3s"}}>
                            <button class="text-primary font-black p-2.5 absolute top-2 right-2" hx-on:click={useScript(closeTalkToSpecialist, rootId)}>X</button>
                            <div dangerouslySetInnerHTML={{
                                __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                                                                    <script>
                                                                    hbspt.forms.create({
                                                                        region: "na1",
                                                                        portalId: "7112881",
                                                                        formId: "06d3df52-7c37-4749-aa27-5c7744917d89"
                                                                    });
                                                                    </script>
                            `}} />
                        </div>
                    </div>
    </div>
}