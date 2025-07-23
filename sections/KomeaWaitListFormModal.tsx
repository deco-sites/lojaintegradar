import type { RichText } from "apps/admin/widgets.ts";
import { useScript } from "@deco/deco/hooks";
import { HtmlEscaped } from "@hono/hono/utils/html";
import { isWindows } from "std/_util/os.ts";

// export {};
// declare global {
//   interface Window {
//     dataLayer: Record<string, any>[];
//   }
// }

const openAndCloseDropdown = () => {
    const modal = document.getElementById("customerAdvisoryBoardModal") as HTMLElement;
    const form = modal.querySelector("form") as HTMLElement;
    const currentTarget = event!.currentTarget as HTMLElement;
    const parentElement = currentTarget.closest("label");
    const error = parentElement?.querySelector(".error");
    const dropDown = parentElement?.querySelector(".dropDownDiv") as HTMLElement;
    const input = parentElement?.querySelector("input") as HTMLElement;
    input.style.borderColor = "#5F6E82";
    error?.classList.add("hidden");
    if (dropDown.classList.contains("hidden"))
        dropDown.classList.remove("hidden");
    else
        dropDown.classList.add("hidden");
    form.scrollTo({
        top: form.scrollHeight,
        behavior: 'smooth' // Rola suavemente
    });
};
const dropDownSelect = (value: string) => {
    const currentTarget = event!.currentTarget as HTMLElement;
    const parentLabel = currentTarget.closest("label");
    console.log("parentLabel: ", parentLabel);
    const input = parentLabel?.querySelector("input") as HTMLInputElement | undefined;
    console.log("input:", input);
    if (input)
        input.value = value;
};
const onLoad = () => {
    let temLoja = true;

    const modal = document.getElementById("waitlist-form") as HTMLElement;
    const form = modal.querySelector("form") as HTMLElement;
    const cancelButtons = modal?.querySelectorAll(".cancelButton") as NodeListOf<HTMLInputElement>;
    const nextButton = modal?.querySelector(".nextButton") as HTMLElement;
    const page1 = modal.querySelector(".page1") as HTMLElement;
    const page2 = modal.querySelector(".page2") as HTMLElement;
    const errorPage = modal.querySelector(".errorPage")
    const page2WithoutStore = modal.querySelector(".page2WithoutStore") as HTMLElement;
    const fields = modal.querySelectorAll("label");
    const nameInput = modal.querySelector('input[name="name"]') as HTMLInputElement;
    const dddInput = modal.querySelector('input[name="ddd"]') as HTMLInputElement;
    const telefoneInput = modal.querySelector('input[name="telefone"]') as HTMLInputElement;
    const emailInput = modal.querySelector('input[name="email"]') as HTMLInputElement;
    const nomeLojaInput = modal.querySelector('input[name="nome_loja"]') as HTMLInputElement;
    const urlInput = modal.querySelector('input[name="url_loja"]') as HTMLInputElement;
    const possuiLoja = modal.querySelectorAll('input[name="possui_loja"]') as NodeListOf<HTMLInputElement>;
    const inputRadios = modal.querySelectorAll('input[type="radio"') as NodeListOf<HTMLInputElement>
    const inlineMessage = modal.querySelector(".inlineMessage") as HTMLElement;
    const listaEsperaSucessButton = modal.querySelector(".listaEsperaSucessButton") as HTMLInputElement;
    const cadastroSucessButton = modal.querySelector(".cadastroSucessButton") as HTMLInputElement;
    
    const trackFieldInteraction = (field:HTMLInputElement, fieldName:string) => {
                        
                        if (field) {
                            field.addEventListener('focus', () => {
                              window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    'event': 'interacao',
                                    'custom_section': 'lp-komea:modal-formulario-lista-de-espera',
                                    'custom_type': 'campo',
                                    'custom_title': fieldName
                                });
                            });
                        }
                    };

                    const fieldsToTrack = [
                        { selector: nameInput, name: 'nome' },
                        { selector: emailInput, name: 'email' },
                        { selector: nomeLojaInput, name: 'empresa' },
                        { selector: urlInput, name: 'website' }
                    ];

                    fieldsToTrack.forEach(({ selector, name }) => {
                        trackFieldInteraction(selector, name);
                    });

    let currentPage = 1;
    const closeModal = () => {
        modal.classList.add("hidden");
        // fields.forEach(field => {
        //     const input = field.querySelectorAll("input");
        //     if (input[0])
        //         input[0].value = "";
        //     if (input[1])
        //         input[1].value = "";
        // });
        // page1.classList.remove("hidden");
        // page2.classList.add("hidden");
        // currentPage = 1;
        // cancelButton?.classList.remove("hidden");
        // nextButton.textContent = "Continuar";
        // inlineMessage.innerText = "Enviando...";
        // possuiLoja[0].checked = false;
        // possuiLoja[1].checked = false;

    };
    
    modal.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });

    form.addEventListener("click", (e) => {
      e.stopPropagation();
    })

    cancelButtons?.forEach(b => b.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'clique',
            'custom_section': 'lp-komea:modal-formulario-lista-de-espera',
            'custom_type': 'icone',
            'custom_title': 'fechar-modal'
        });
    }));

    listaEsperaSucessButton.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
      window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                        event: 'callback',
                                        custom_section: 'lp-komea:modal-formulario-lista-de-espera',
                                        custom_type: 'entrar-na-lista-de-espera',
                                        custom_title: 'sucesso'
                                    });
    })

    cadastroSucessButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                        event: 'callback',
                                        custom_section: 'lp-komea:modal-formulario-lista-de-espera',
                                        custom_type: 'cadastro-confirmado',
                                        custom_title: 'sucesso'
                                    });
      window.location.href = 'http://app.lojaintegrada.com.br/public/assinar';
    });

    inputRadios.forEach(radio => {
      radio.addEventListener("change", (e:any) => {
        const currentTarget = e.currentTarget;
        if (currentTarget.value == "sim") {
          temLoja = true;
          (urlInput.parentElement as HTMLElement).style.display = "block";
          

        } else {
          temLoja = false;
          (urlInput.parentElement as HTMLElement).style.display = "none";
        }
      });
    })
    
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (currentPage == 1) {
            let validated = true;

            if (!possuiLoja[0].checked && !possuiLoja[1].checked) {
                const errorMessage = possuiLoja[0].parentElement?.parentElement?.parentElement?.querySelector(".error") as HTMLElement;
                errorMessage.classList.remove("hidden");
                errorMessage.innerText = "Escolha uma opção";
                possuiLoja[0].style.borderColor = "#F57E77";
                validated = false;
            }

            if (nameInput.value.length < 3) {
                const errorMessage = nameInput.parentElement?.querySelector(".error") as HTMLElement;
                errorMessage.classList.remove("hidden");
                errorMessage.innerText = "Seu nome precisa ser maior que 2 caracteres";
                nameInput.style.borderColor = "#F57E77";
                validated = false;
            }
            if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                const errorMessage = emailInput.parentElement?.querySelector(".error") as HTMLElement;
                errorMessage.classList.remove("hidden");
                errorMessage.innerText = "Preencha um e-mail válido";
                emailInput.style.borderColor = "#F57E77";
                validated = false;
            }
            if (nomeLojaInput.value == "") {
                const errorMessage = nomeLojaInput.parentElement?.querySelector(".error") as HTMLElement;
                errorMessage.classList.remove("hidden");
                errorMessage.innerText = "Preencha esse campo obrigatório";
                nomeLojaInput.style.borderColor = "#F57E77";
                validated = false;
            }

            if (urlInput.value == "" && temLoja) {
                const errorMessage = urlInput.parentElement?.querySelector(".error") as HTMLElement;
                errorMessage.classList.remove("hidden");
                errorMessage.innerText = "Preencha esse campo obrigatório";
                urlInput.style.borderColor = "#F57E77";
                validated = false;
            }

            if (dddInput.value.length < 2 || telefoneInput.value.length < 8) {
                const errorMessage = dddInput.parentElement?.parentElement?.querySelector(".error") as HTMLElement;
                errorMessage.classList.remove("hidden");
                errorMessage.innerText = "Preencha um número válido";
                dddInput.style.borderColor = "#F57E77";
                telefoneInput.style.borderColor = "#F57E77";
                validated = false;
            }

            if (validated) {
                
                const formData = new FormData(e.target as HTMLFormElement); // Obtém os dados do formulário.
                const data: any = {};
                formData.forEach((value, key) => {
                    data[key] = value; // Popula o objeto com os pares chave-valor do formulário.
                });
                
                page1.classList.add("hidden");
                if (data.possui_loja == "sim") page2.classList.remove("hidden");
                else page2WithoutStore.classList.remove("hidden");
                currentPage = 2;

                //monta o objeto a ser enviado par ao hubspot
                const objectToSend = {
                    firstname: data.name,
                    email: data.email,
                    phone: `${data.ddd}${data.telefone}`,
                    company: data.nome_loja,
                    website: data.url_loja,
                    voce_ja_tem_conta_na_loja_integrada_komea_vs_final: data.possui_loja,
                    "LEGAL_CONSENT.subscription_type_8418940": data.email_subscription == "on"
                };
                //envia os dados para o hubspot
                // const hutk = document.cookie.replace(/(?:(?:^|.;\s)hubspotutk\s=\s([^;]).$)|^.*$/, "$1");
                // const context = {
                //     "hutk": hutk,
                //     "pageUri": window.location.href,
                //     "pageName": document.title
                // };
                // fetch('/live/invoke/site/actions/sendToHubspot.ts', {
                //     body: JSON.stringify({ fields: objectToSend, formGuid: '1a346d40-a4e7-440c-911e-298c06baf026', portalId: '7112881', context: context }),
                //     method: 'POST',
                //     headers: { 'content-type': 'application/json' }
                // }).then((r) => r.json()).then((r) => {
                //     console.log(r);
                //     inlineMessage.innerText = r.Success ? "Obrigado! seus dados foram enviados, em breve entraremos em contato!" : "Erro ao enviar";
                // });

                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                 'event':'clique',
                                    'custom_section': 'lp-komea:modal-formulario-lista-de-espera',
                                    'custom_type': 'botao',
                                    'custom_title':'entrar-na-lista-de-espera'
                                });

                if (data.possui_loja == "sim") {
                  window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event':'interacao',
                            'custom_section': 'lp-komea:modal-formulario-lista-de-espera',
                            'custom_type': 'checkbox',
                            'custom_title':'sim'  
                        });
                } else {
                  window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event':'interacao',
                            'custom_section': 'lp-komea:modal-formulario-lista-de-espera',
                            'custom_type': 'checkbox',
                            'custom_title':'ainda-nao'  
                        });
                }

                const url =
                    `https://api.hsforms.com/submissions/v3/integration/submit/7112881/1a346d40-a4e7-440c-911e-298c06baf026`;

                const formData2 = {
                    submittedAt: Date.now(),
                    skipValidation: true,
                    fields: Object.entries(objectToSend).map((entry) => ({
                        "objectTypeId": "0-1",
                        "name": entry[0],
                        "value": entry[1],
                    })),
                };

                try {
                    const response = fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData2),
                    }).then(r => r.json().then(r => {
                      console.log('response: ',r)
                      if (r.status == 'error') {
                        inlineMessage.innerText = r.message;
                        page2.classList.add("hidden");
                        page2WithoutStore.classList.add("hidden");
                        errorPage?.classList.remove("hidden");
                      }
                    }));
                } catch (error) {
                    console.log("ERROR: ", error);
                    return { "Error": error };
                }

            }
        }

    });
};


const onKeyUp = () => {
    const target = event!.currentTarget as HTMLElement;
    let errorMessage = target.parentElement?.querySelector(".error") as HTMLElement | undefined;
    if (errorMessage) {
        errorMessage.classList.add("hidden");
    }
    else {
        errorMessage = target.parentElement?.parentElement?.querySelector(".error") as HTMLElement | undefined;
        errorMessage?.classList.add("hidden");
    }
    target.style.borderColor = "";
};

function radioDataLayer(custom_title: string) {
  window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event':'interacao',
                            'custom_section': 'lp-komea:modal-formulario-lista-de-espera',
                            'custom_type': 'checkbox',
                            'custom_title': custom_title
                        });
}

export function CustomRadio({ name, value, type, custom_title }: {
    value?: string;
    name: string;
    type?: string;
    custom_title?: string;
}) {
    return <>
    <input type={type || "radio"} name={name} value={value} class="hidden peer" hx-on:change={custom_title ? useScript(radioDataLayer, custom_title) : ""}/>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="peer-checked:hidden">
              <rect x="0.5" y="1.21094" width="23" height="23" rx="7.5" stroke="#CFD3D5"/>
              </svg>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden peer-checked:block">
              <rect x="0.5" y="1.21094" width="23" height="23" rx="7.5" stroke="#00B7B5"/>
              <rect x="2" y="2.71094" width="20" height="20" rx="6" fill="#00B7B5"/>
              <path d="M16 9.71094L10.5 15.2109L8 12.7109" stroke="#B7FBDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
  </>;
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
  title?: RichText;
  titleTextProps?: TextProps;
  text?: RichText;
  textProps?: TextProps;
  emailConsent?: RichText;
  emailConsentTextProps?: TextProps;
}

export default function CustomerAdvisoryBoardModal({title, titleTextProps, text, textProps, emailConsent, emailConsentTextProps}:Props) {
    const labelClass = "mb-2 text-transparent group-focus-within:text-[#00363A] transition-colors text-xs";
    const inputClass = "rounded-lg outline-none border py-2 px-4 text-[#5F6E82] placeholder:text-[#CBCBC1] border-[#5F6E82] focus:border-[#00363A] w-full mb-1.5";
    const selectOptionClass = "px-2.5 py-2 hover:bg-[#00B7B5] hover:text-white cursor-pointer";
    return <div id="waitlist-form" class="fixed z-[60] top-0 left-0 w-screen max-h-screen h-screen bg-black bg-opacity-50 flex justify-center items-center hidden">
    <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}/>
    <form class="max-w-[582px] w-full h-fit p-5 lg:px-20 flex flex-col justify-center bg-white max-h-screen overflow-auto rounded-[20px] animate-pop-up relative" style={{ animationDuration: "0.3s" }}>

      <button class="cancelButton absolute top-4 right-5 hover:scale-110 transition-transform">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0.375C12.1075 0.375 9.27986 1.23274 6.87479 2.83976C4.46972 4.44677 2.5952 6.73089 1.48827 9.40325C0.381337 12.0756 0.091713 15.0162 0.656022 17.8532C1.22033 20.6902 2.61323 23.2961 4.65857 25.3414C6.70391 27.3868 9.30984 28.7797 12.1468 29.344C14.9838 29.9083 17.9244 29.6187 20.5968 28.5117C23.2691 27.4048 25.5532 25.5303 27.1602 23.1252C28.7673 20.7201 29.625 17.8926 29.625 15C29.6209 11.1225 28.0788 7.40492 25.3369 4.66309C22.5951 1.92125 18.8775 0.379095 15 0.375ZM20.2959 18.7041C20.4005 18.8086 20.4834 18.9327 20.5399 19.0692C20.5965 19.2058 20.6256 19.3522 20.6256 19.5C20.6256 19.6478 20.5965 19.7942 20.5399 19.9308C20.4834 20.0673 20.4005 20.1914 20.2959 20.2959C20.1914 20.4005 20.0673 20.4834 19.9308 20.5399C19.7942 20.5965 19.6478 20.6256 19.5 20.6256C19.3522 20.6256 19.2058 20.5965 19.0692 20.5399C18.9327 20.4834 18.8086 20.4005 18.7041 20.2959L15 16.5905L11.2959 20.2959C11.1914 20.4005 11.0673 20.4834 10.9308 20.5399C10.7942 20.5965 10.6478 20.6256 10.5 20.6256C10.3522 20.6256 10.2058 20.5965 10.0692 20.5399C9.93268 20.4834 9.80859 20.4005 9.70407 20.2959C9.59954 20.1914 9.51663 20.0673 9.46006 19.9308C9.4035 19.7942 9.37438 19.6478 9.37438 19.5C9.37438 19.3522 9.4035 19.2058 9.46006 19.0692C9.51663 18.9327 9.59954 18.8086 9.70407 18.7041L13.4095 15L9.70407 11.2959C9.49297 11.0848 9.37438 10.7985 9.37438 10.5C9.37438 10.2015 9.49297 9.91516 9.70407 9.70406C9.91516 9.49297 10.2015 9.37437 10.5 9.37437C10.7985 9.37437 11.0848 9.49297 11.2959 9.70406L15 13.4095L18.7041 9.70406C18.8086 9.59954 18.9327 9.51663 19.0692 9.46006C19.2058 9.40349 19.3522 9.37437 19.5 9.37437C19.6478 9.37437 19.7942 9.40349 19.9308 9.46006C20.0673 9.51663 20.1914 9.59954 20.2959 9.70406C20.4005 9.80859 20.4834 9.93267 20.5399 10.0692C20.5965 10.2058 20.6256 10.3522 20.6256 10.5C20.6256 10.6478 20.5965 10.7942 20.5399 10.9308C20.4834 11.0673 20.4005 11.1914 20.2959 11.2959L16.5905 15L20.2959 18.7041Z" fill="#00363A"/>
        </svg>
      </button>


      <div class="page1">
        <div class="text-[#00363A] text-[32px] leading-none font-bold mb-5 text-center" style={{...titleTextProps}} dangerouslySetInnerHTML={{__html: title || ""}}/>

        <div class="text-center text-[#5F6E82] text-sm leading-none mb-5" style={{...textProps}} dangerouslySetInnerHTML={{__html: text || ""}}/>
        <p class="mb-2 text-base text-[#00363A]">Você já tem conta na Loja Integrada?</p>
        <div class="mb-5">
          <div class="flex gap-5" hx-on:click={useScript(onKeyUp)}>
            <label class="flex gap-2">
              <CustomRadio name="possui_loja" value="sim" custom_title="sim"/>
              Sim
            </label>
            <label class="flex gap-2">
              <CustomRadio name="possui_loja" value="nao" custom_title="ainda-nao"/>
              Não
            </label>
          </div>
          <p class="error text-[#F57E77] text-xs hidden mt-2"/>
        </div>

        <label class="group nameField">
          <p class={labelClass}>Nome</p>
          <input type="text" name="name" placeholder="Nome" class={inputClass} hx-on:keyup={useScript(onKeyUp)}/>
          <p class="error text-[#F57E77] text-xs hidden"/>
        </label>
        <label class="group">
          <p class={labelClass}>E-mail</p>
          <input type="text" name="email" placeholder="E-mail" class={inputClass} hx-on:keyup={useScript(onKeyUp)}/>
          <p class="error text-[#F57E77] text-xs hidden"/>
        </label>
        <label class="group">
          <p class={labelClass}>Nome da Loja</p>
          <input type="text" name="nome_loja" placeholder="Nome da Loja" class={inputClass} hx-on:keyup={useScript(onKeyUp)}/>
          <p class="error text-[#F57E77] text-xs hidden"/>
        </label>
        <label class="group">
          <p class={labelClass}>Url da loja</p>
          <input type="text" name="url_loja" placeholder="Url da loja" class={inputClass} hx-on:keyup={useScript(onKeyUp)}/>
          <p class="error text-[#F57E77] text-xs hidden"/>
        </label>

        <label class="group">
          <p class={` mb-2 group-focus-within:text-[#00363A] transition-colors text-xs text-[#5F6E82]`}>Celular / WhatsApp</p>
          <div class="flex gap-1.5">
            <input type="number" name="ddd" placeholder="11" class={`max-w-[50px] ${inputClass} pr-0.5`} hx-on:keyup={useScript(onKeyUp)}/>
            <input type="tel" name="telefone" placeholder="959498761" class={inputClass} hx-on:keyup={useScript(onKeyUp)}/>
          </div>
          <p class="error text-[#F57E77] text-xs hidden"/>
        </label>

        <label class="flex gap-2 items-center text-sm leading-none">
          <CustomRadio name="email_subscription" type="checkbox" custom_title="aceito-recebimento"/>
          <div style={{...emailConsentTextProps}} dangerouslySetInnerHTML={{__html: emailConsent || ""}}/>
        </label>

        <div class="flex w-full gap-5 justify-center mt-5">
          <button type="submit" style={{letterSpacing: '-0.3px'}} class="py-[14px] px-5 text-center text-sm bg-[#00363A] rounded-full font-semibold text-white hover:scale-105 transition-all nextButton">
            Entrar na lista de espera
          </button>
        </div>
      </div>

      {/* <div class="page2 mb-10 hidden">
        <label class="group">
          <div class="relative w-full">
            <p class={labelClass}>Faturamento médio mensal</p>
            <input readonly name="faturamento_medio" value="Faturamento médio mensal" class={`!mb-0 ${inputClass} cursor-pointer min-h-[42px]`} hx-on:click={useScript(openAndCloseDropdown)}/>
              <div class="absolute dropDownDiv hidden w-full bg-white py-5 px-4 border border-[#CFD3D4] flex flex-col top-full rounded-br-lg rounded-bl-lg">
                <p hx-on:click={useScript(dropDownSelect, "Acima de R$ 500K")} class={selectOptionClass}>Acima de R$ 500K</p>
                <p hx-on:click={useScript(dropDownSelect, "Entre R$ 200K e R$ 500K")} class={selectOptionClass}>Entre R$ 200K e R$ 500K</p>
                <p hx-on:click={useScript(dropDownSelect, "Entre R$ 100K e R$ 199K")} class={selectOptionClass}>Entre R$ 100K e R$ 199K</p>
                <p hx-on:click={useScript(dropDownSelect, "Entre R$ 51K e R$ 99K")} class={selectOptionClass}>Entre R$ 51K e R$ 99K</p>
                <p hx-on:click={useScript(dropDownSelect, "Até R$ 50K")} class={selectOptionClass}>Até R$ 50K</p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-4 top-[34px]">
              <path d="M6 9L12 15L18 9" stroke="#5F6E82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
          <p class="error text-[#F57E77] text-xs hidden mt-1.5"/>
        </label>
      </div> */}

      <div class="page2 flex flex-col items-center hidden">
        <h2 style={{fontFamily: 'Lektorat Display var'}} class="font-bold text-[32px] text-[#00363A] bg-[#EEFC58] px-5 py-0 mb-6">Acesso garantido!</h2>
        <p class=" text-[#5F6E82] text-base font-normal mb-10 text-center leading-tight" style={{letterSpacing: '-0.3px'}}>
          Em breve você receberá atualizações<br/>
          sobre o seu acesso à Komea<br/><br/>
          <span class="font-bold">Spoiler:</span> seu e-commerce vai<br/>
          começar a trabalhar com você.
        </p>

        <button style={{letterSpacing: '-0.3px'}} class="py-[14px] px-5 text-center text-sm bg-[#00363A] rounded-full font-semibold text-white hover:scale-105 transition-all listaEsperaSucessButton">
            Voltar a navegação
        </button>
      </div>

      <div class="page2WithoutStore flex flex-col items-center hidden">
        <h2 style={{fontFamily: 'Lektorat Display var'}} class="font-bold text-[32px] text-[#00363A] bg-[#EEFC58] px-5 py-0 mb-6">Cadastro confirmado</h2>
        <p class=" text-[#5F6E82] text-base font-normal mb-10 text-center leading-tight" style={{letterSpacing: '-0.3px'}}>
          Você está na sua lista de interessados para testar<br/>
          a Komea, mas lembre-se para usar o KOMEA,<br/>
          você precisa ter sua loja ativa na Loja Integrada —<br/>
          e o melhor momento para isso é agora.
        </p>

        <button 
          style={{letterSpacing: '-0.3px'}} 
          class="py-[14px] px-5 text-center text-sm bg-[#00363A] rounded-full font-semibold text-white hover:scale-105 transition-all cadastroSucessButton">
            Criar minha loja agora
        </button>
      </div>

      <div class="errorPage flex flex-col items-center hidden">
        <h2 style={{fontFamily: 'Lektorat Display var'}} class="font-bold text-[32px] text-[#00363A] bg-[#EEFC58] px-5 py-0 mb-6">Erro</h2>
        <p class="inlineMessage text-[#5F6E82] text-base font-normal mb-10 text-center leading-tight" style={{letterSpacing: '-0.3px'}}>
          
        </p>
      </div>

    </form>
  </div>;
}
