import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";
import { useId } from "site/sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

const openModal = (modalId: string) => {
  event!.preventDefault();
  const modal = document.getElementById(modalId) as HTMLElement;
  modal?.classList.remove("hidden");
};
const closeModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLElement;
  modal?.classList.add("hidden");
};

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
}

export interface Media {
  image?: IImage;
  video?: IVideo;
  use?: "image" | "video" | "embed";
}

export interface Modal {
  title?: RichText;
  titleTextProps?: TextProps;
  text?: RichText;
  textProps?: TextProps;
  media?: Media;
  cta?: CTAProps[];
}

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}


export interface Props {
  show?: boolean;
  region?: string;
  portalId?: string;
  formId?: string;
  /** @format color-input */
  buttonColor?: string;
  /** @format color-input */
  buttonTextColor?: string;
  /** @format color-input */
  buttonIcon?: boolean;
  buttonWidth?: 'min' | 'full';
  /** @format color-input */
  errorMessageColor?: string;
  inputLabel?: string;
  /** @format color-input */
  inputLabelColor?: string;
  /** @format color-input */
  inputLabelBackgroundColor?: string;
  inputLabelWidth?: 'min' | 'full';
  modal?: Modal;
}

export function HeroMedia({ media }: { media?: Media }) {
  return <>
    {media?.use == "image" && media.image?.src && <Image
      src={media.image.src}
      alt={media.image.alt || "image"}
      class="object-contain"
      width={media.image.width || 534}
      height={media.image.height || 534}
    />}
    {media?.use == "video" && media.video?.src && <video width={media.video.width || 1280} height={media.video.height || 720} autoPlay playsInline muted loading="lazy" loop
      class="object-cover"
      style={{ width: media.video.width + "px" || "1280px", height: media.video.height + "px" || "720px" }}>
      <source src={media.video.src} type="video/mp4" />
    </video>}
    {media?.use == "embed" && <iframe
      width={"100%"}
      height={"100%"}
      src={media.video?.src}
      frameborder="0"
      style={{ width: media.video?.width || 854, height: media.video?.height || 480 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />}
  </>
}

export default function HubspotForm(hubspotForm: Props) {
  const id = useId();
  const modalId = id + "modal";
  const hubspostFormId = id + "hubspotForm";

  return <div id="hubsportForm" class="max-w-[792px] w-full mx-auto">
    <label >
      {hubspotForm?.inputLabel && <p
        class={`bg-info-content rounded-tl-xl rounded-tr-xl py-1.5 pl-2.5 lg:pl-4 text-sm lg:text-base text-primary inline-block ${hubspotForm?.inputLabelWidth == 'full' ? "w-full text-center px-1" : "pr-12"}`}
        style={{ color: hubspotForm?.inputLabelColor, background: hubspotForm?.inputLabelBackgroundColor }}
      >
        {hubspotForm?.inputLabel}
      </p>}
      <div class={hubspostFormId} dangerouslySetInnerHTML={{
        __html: `
                                <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                                <script>
                                hbspt.forms.create({
                                    region: "${hubspotForm?.region || ""}",
                                    portalId: "${hubspotForm?.portalId}",
                                    formId: "${hubspotForm?.formId}",
                                    onFormSubmit: function($form) {
                                        const modal = document.getElementById("${modalId}");
                                        if (modal) modal.classList.remove('hidden');
                                    }
                                });
                                </script>`
      }} />
    </label>
    <div id={modalId} class="emailconfirmadomodal fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-[60] overflow-auto hidden px-6">
      <div class="bg-white rounded-[30px] p-7 lg:p-[60px] animate-pop-up relative max-w-[840px] w-full" style={{ animationDuration: "0.3s" }}>
        <button class="text-primary font-black p-2.5 absolute top-4 right-4 lg:top-6 lg:right-7" hx-on:click={useScript(closeModal, modalId)}>
          <svg width="42" height="42" viewBox="0 0 42 42" class="fill-current h-7 w-7 lg:h-auto lg:w-auto" style={{ color: hubspotForm.modal?.titleTextProps?.color || "black" }} xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0.6875C16.9826 0.6875 13.0554 1.87881 9.71499 4.11077C6.37462 6.34274 3.77111 9.51512 2.23371 13.2267C0.696301 16.9384 0.294046 21.0225 1.07781 24.9628C1.86157 28.903 3.79615 32.5224 6.6369 35.3631C9.47766 38.2039 13.097 40.1384 17.0372 40.9222C20.9775 41.706 25.0616 41.3037 28.7733 39.7663C32.4849 38.2289 35.6573 35.6254 37.8892 32.285C40.1212 28.9446 41.3125 25.0174 41.3125 21C41.3068 15.6145 39.1649 10.4513 35.3568 6.64317C31.5487 2.83507 26.3855 0.693187 21 0.6875ZM28.3555 26.1445C28.5007 26.2897 28.6158 26.462 28.6944 26.6517C28.7729 26.8414 28.8134 27.0447 28.8134 27.25C28.8134 27.4553 28.7729 27.6586 28.6944 27.8483C28.6158 28.038 28.5007 28.2103 28.3555 28.3555C28.2103 28.5006 28.038 28.6158 27.8483 28.6944C27.6586 28.7729 27.4553 28.8134 27.25 28.8134C27.0447 28.8134 26.8414 28.7729 26.6517 28.6944C26.4621 28.6158 26.2897 28.5006 26.1445 28.3555L21 23.209L15.8555 28.3555C15.7103 28.5006 15.538 28.6158 15.3483 28.6944C15.1586 28.7729 14.9553 28.8134 14.75 28.8134C14.5447 28.8134 14.3414 28.7729 14.1517 28.6944C13.9621 28.6158 13.7897 28.5006 13.6445 28.3555C13.4994 28.2103 13.3842 28.038 13.3056 27.8483C13.2271 27.6586 13.1866 27.4553 13.1866 27.25C13.1866 27.0447 13.2271 26.8414 13.3056 26.6517C13.3842 26.462 13.4994 26.2897 13.6445 26.1445L18.791 21L13.6445 15.8555C13.3514 15.5623 13.1866 15.1646 13.1866 14.75C13.1866 14.3354 13.3514 13.9377 13.6445 13.6445C13.9377 13.3513 14.3354 13.1866 14.75 13.1866C15.1646 13.1866 15.5623 13.3513 15.8555 13.6445L21 18.791L26.1445 13.6445C26.2897 13.4994 26.4621 13.3842 26.6517 13.3056C26.8414 13.2271 27.0447 13.1866 27.25 13.1866C27.4553 13.1866 27.6586 13.2271 27.8483 13.3056C28.038 13.3842 28.2103 13.4994 28.3555 13.6445C28.5007 13.7897 28.6158 13.962 28.6944 14.1517C28.7729 14.3414 28.8134 14.5447 28.8134 14.75C28.8134 14.9553 28.7729 15.1586 28.6944 15.3483C28.6158 15.538 28.5007 15.7103 28.3555 15.8555L23.209 21L28.3555 26.1445Z" />
          </svg>

        </button>
        <div class="font-normal text-[32px] leading-[130%] w-full " style={{ ...hubspotForm.modal?.titleTextProps }} dangerouslySetInnerHTML={{ __html: hubspotForm.modal?.title || "" }} />
        <div class="mt-7 text-xl text-neutral font-medium leading-[120%] max-w-[700px] " style={{ ...hubspotForm.modal?.textProps }} dangerouslySetInnerHTML={{ __html: hubspotForm.modal?.text || "" }} />
        <HeroMedia media={hubspotForm?.modal?.media} />
        <div class="flex flex-wrap justify-center items-center gap-7 mt-7">
          {hubspotForm?.modal?.cta?.map((button) => {
            if (!button.href) return <div hx-on:click={useScript(closeModal, modalId)} class="cursor-pointer hover:scale-110 transition-transform">
              <div style='pointer-events: none;'><CTA {...button} /></div>
            </div>
            return <CTA {...button} />
          })}
        </div>
      </div>
    </div>
    <script defer dangerouslySetInnerHTML={{
      __html: `
    const intervalHubspotForm = setInterval(() => {
      const getHubspotForm = document.getElementById("hubsportForm");
      if (getHubspotForm) {
        const getHubspotFormButton = getHubspotForm.querySelector(".hs-submit .actions input");
        const getHubspotFormInput = getHubspotForm.querySelector(".hs-email");
        const getHubspotFormCallback = getHubspotForm.querySelector(".emailconfirmadomodal");

        if (getHubspotFormButton) {
          getHubspotFormButton.addEventListener('click', function () {  
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'clique',
              'custom_section': "lp-komea-inicio:modal-email-confirmado",
              'custom_type': "botao",
              'custom_title': "receber-o-jornal"
            });
          });
        }

        if (getHubspotFormInput) {
          getHubspotFormInput.addEventListener('click', function () {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'interacao',
              'custom_section': "lp-komea-inicio",
              'custom_type': "campo",
              'custom_title': "email"
            });
          });
        }

        if (getHubspotFormCallback) {
          const observer = new MutationObserver(() => {
            const isVisible = getComputedStyle(getHubspotFormCallback).display !== 'none' &&
                              getComputedStyle(getHubspotFormCallback).visibility !== 'hidden' &&
                              getComputedStyle(getHubspotFormCallback).opacity !== '0';

            if (isVisible) {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'event':'callback',
                'custom_section': 'lp-komea-inicio',
                'custom_type': 'receber-jornal',
                'custom_title':'sucesso'  
              });

              observer.disconnect();
            }
          });

          observer.observe(getHubspotFormCallback, {
            attributes: true,
            attributeFilter: ['style', 'class'],
          });
        }

        clearInterval(intervalHubspotForm);
      }
    }, 500);
  `
    }} />

    <style dangerouslySetInnerHTML={{
      __html: `
                    .${hubspostFormId} .hs-form-private {
                        position: relative;
                        display: flex; /* flex */
                        justify-content: space-between; /* justify-between */
                        padding: 8px;
                        font-size: 1rem; /* text-base */
                        /*border: 1px solid #EBEBEB;*/
                        --tw-border-opacity: 1;
                        border-radius: ${hubspotForm?.inputLabel ? '0 100px 100px 100px' : '100px'};
                        ${hubspotForm?.inputLabel && hubspotForm?.inputLabelWidth == 'full' && 'border-radius: 0 0 0.75rem 0.75rem;'}
                        box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
                        --tw-bg-opacity: 1;
                        background-color: white;
                    }
                    
                    .${hubspostFormId} .input {
                        padding-right: 0px;
                        border-radius: 100px;
                        display: flex;
                        align-items: center;
                        height: 100%
                    } 

                    .${hubspostFormId} .hs-form-private {
                        flex-wrap: nowrap;
                    }
                        
                    .${hubspostFormId} .hs-input {
                        width: 100%;
                    }
                    
                    .${hubspostFormId} ${hubspotForm?.buttonIcon && '.actions::before'} {
                        content: '';
                        background-image: url("data:image/svg+xml,%3Csvg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.5' width='40' height='40' rx='4' fill='white'/%3E%3Cpath d='M26.8087 19.3671L16.4581 12.8195C16.2836 12.709 16.0837 12.6487 15.8791 12.6447C15.6745 12.6408 15.4726 12.6934 15.2943 12.7972C15.1176 12.8993 14.9705 13.0483 14.868 13.2287C14.7654 13.4091 14.7112 13.6145 14.7109 13.8238V26.9175C14.7123 27.2314 14.8341 27.5319 15.0496 27.753C15.2652 27.9741 15.5568 28.0976 15.8604 28.0964C16.0723 28.0963 16.28 28.0359 16.461 27.9218L26.8087 21.3743C26.9751 21.2694 27.1125 21.1221 27.2079 20.9465C27.3033 20.7709 27.3534 20.5728 27.3534 20.3714C27.3534 20.17 27.3033 19.9719 27.2079 19.7963C27.1125 19.6207 26.9751 19.4734 26.8087 19.3685V19.3671Z' fill='%232F575C'/%3E%3C/svg%3E%0A");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                            
                    .${hubspostFormId} .hs-submit {
                        ${hubspotForm?.buttonWidth == 'full' && 'width: 100%;'}
                    }

                    .${hubspostFormId} .actions {
                        display: flex;
                        align-items: center;
                        height: 48px;
                        background-color: ${hubspotForm?.buttonColor};
                        cursor: pointer;
                        border-radius: 100px;
                        padding-left: 4px;
                        transition: transform 0.2s ease-in-out;
                    }
                                
                    .${hubspostFormId} .actions:hover {
                        transform: scale(1.15);
                    }

                    .${hubspostFormId} .hs-button {
                        color: ${hubspotForm?.buttonTextColor};
                        padding: 0px 10px 0px 10px;
                        height: 100%;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 500;
                        cursor: pointer;
                        text-align: center;
                        white-space: nowrap;
                        ${hubspotForm?.buttonWidth == 'full' && 'width: 100%;'}
                    }
                                    
                    
                                        
                    .${hubspostFormId} .hs-input {
                        outline: none;
                        font-size: 0.875rem; /* text-sm */
                    }
                                            
                                            .${hubspostFormId} .input  {
                                                outline: none; /* Remove a borda padrão */
                                                border: none;
                                                box-shadow: none; /* Remove qualquer sombra */
                                                }
                                                
                                                
                                                    .${hubspostFormId} .submitted-message {
                                                        text-align: center;
                                                        }
                                                        
                                                        .${hubspostFormId} .hs-error-msg {
                                                            position: absolute;
                                                            top: 68px;
                                                            font-size: 14px;
                                                            left: 24px;
                                                            max-width: 100%;
                                                            color: ${hubspotForm?.errorMessageColor}
                                                            }
                                                            
                                                            .${hubspostFormId} .hs_error_rollup {
                                                                display: none;
                                                                }
                
                    @media (min-width: 768px) {
                      .${hubspostFormId} .hs-form-private {
                        padding: 12px;
                      }

                      .${hubspostFormId} .hs-input {
                        width: auto;
                        flex-grow: 1;
                        font-size: 1rem; /* text-base */
                      }
                      
                      .${hubspostFormId} .hs-error-msg {
                                                            top: 77px;
                                                            font-size: 16px;
                                                            left: 24px;
                                                            max-width: 100%;
                                                            }
                    }
    `
    }} />

  </div>
}