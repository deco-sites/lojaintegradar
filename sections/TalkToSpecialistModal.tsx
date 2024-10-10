import { useScript } from "deco/hooks/useScript.ts";

const closeTalkToSpecialist = () => {
    const form = document.getElementById("talkToSpecialistPopUpForm") as HTMLElement;
    form?.classList.add("hidden"); 
}

export default function TalkToSpecialistModal() {

    return <div>
        <div id="talkToSpecialistPopUpForm" class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-[60] talkToSpecialistForm overflow-auto hidden">
            <div class="max-w-[550px] min-h-[600px] bg-primary-content rounded-xl lg:p-12 animate-pop-up relative pt-12" style={{animationDuration: "0.3s"}}>
                <button class="text-[#371E55] font-black p-2.5 absolute top-2 right-2" hx-on:click={useScript(closeTalkToSpecialist)}>X</button>
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