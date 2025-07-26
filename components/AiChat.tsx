import { useScript } from "@deco/deco/hooks";
import { useId } from "site/sdk/useId.ts";

const onLoad = (AiChatComponentId: string, aiName: string, messageClass: string, aiNameClass: string) => {
  const AiChat = document.getElementById(AiChatComponentId) as HTMLElement;
  const form = AiChat.querySelector("form") as HTMLElement;
  const sendMessageButton = AiChat.querySelector(".sendMessageButton") as HTMLButtonElement;
  const containerPrimeiraMensagem = AiChat.querySelector(".firstMessage") as HTMLElement;
  const errorMessage = AiChat.querySelector(".error") as HTMLElement;
  const AiInput = AiChat.querySelector(".AiInput") as HTMLInputElement;
  const messagesParentContainer = AiChat.querySelector(".messagesParentContainer") as HTMLElement;
  const optionSelector = AiChat.querySelector(".optionSelector") as HTMLElement;
  const typingCircles = AiChat.querySelector(".typingCircles") as HTMLElement;
  const yesButton = optionSelector.querySelector(".yesButton") as HTMLButtonElement;
  const noButton = optionSelector.querySelector(".noButton") as HTMLButtonElement;
  const suggestedQuestions = AiChat.querySelectorAll(".suggestedQuestions") as NodeListOf<HTMLButtonElement>;
  const suggestedQuestionsContainer = AiChat.querySelector(".suggestedQuestionsContainer") as HTMLElement;

  const objToSendToHubspot = {
    firstname: "",
    email: "",
    voce_ja_conhece_a_loja_integrada_: "Ainda não",
    "LEGAL_CONSENT.subscription_type_8418940": false
  };

  const buttonStatus = {
    gettingName: 'gettingName',
    gettingEmail: 'gettingEmail',
    gettingKnowingAbout: 'gettingKnowingAbout',
    sendingMessages: 'sendingMessages'
  }
  let currentButtonStatus = buttonStatus.gettingName;

  // String recebida com HTML embutido
  const primeiraMensagem = `👋 E aí, tudo certo? Aqui é o Alfredo (versão Agente).<br/>
    Bora bater um papo sobre varejo, marca, vendas e inteligência artificial?<br/><br/>
    Antes de começar, me conta rapidinho:<br/>
    <span class="font-bold">Qual o seu nome?</span>`;

  function renderUserMessage(message: string) {
    const newUserMessage = document.createElement("p");
    newUserMessage.textContent = message;
    newUserMessage.classList.add("text-[#5F6E82]", "bg-[#E4F3F380]", "px-5", "py-2.5", "rounded-full", "mt-12", "mb-7", "self-end", "animate-pop-in", "text-sm", "lg:text-base");
    messagesParentContainer.appendChild(newUserMessage);
  }
  
  function renderAiMessage(message: string) {
    const newAiNameContainer = document.createElement("p");
    const newMessageContainer = document.createElement("div");
    newMessageContainer.className = messageClass;
    newAiNameContainer.className = aiNameClass;
    newAiNameContainer.textContent = aiName;
    messagesParentContainer.appendChild(newAiNameContainer)
    messagesParentContainer.appendChild(newMessageContainer);
    digitarMensagem(newMessageContainer, message);
  }

  const sendMessageButtonClick = () => {
    if (currentButtonStatus == buttonStatus.gettingName) {
      if (AiInput.value.length < 3) {
        errorMessage.classList.remove("hidden");
        errorMessage.innerText = "Seu nome precisa ser maior que 2 caracteres";
      } else {
        objToSendToHubspot.firstname = AiInput.value;
        currentButtonStatus = buttonStatus.gettingEmail;
        AiInput.placeholder = "Digite aqui seu e-mail";
        renderUserMessage(AiInput.value);
        renderAiMessage("Oi " + objToSendToHubspot.firstname + ", e qual o seu e-mail?");
        AiInput.value = "";
        AiInput.focus();
      }
    } else if (currentButtonStatus == buttonStatus.gettingEmail) {
      if (!/\S+@\S+\.\S+/.test(AiInput.value)) {
        errorMessage.classList.remove("hidden");
        errorMessage.innerText = "Preencha um e-mail válido";
      } else {
        currentButtonStatus = buttonStatus.gettingKnowingAbout;
        objToSendToHubspot.email = AiInput.value;
        AiInput.placeholder = "";
        renderUserMessage(AiInput.value);
        AiInput.disabled = true;
        sendMessageButton.disabled = true;
        AiInput.value = "";
        const newAiNameContainer = document.createElement("p");
        newAiNameContainer.className = aiNameClass;
        newAiNameContainer.textContent = aiName;
        messagesParentContainer.appendChild(newAiNameContainer)
        messagesParentContainer.appendChild(optionSelector);
        optionSelector.classList.remove("hidden");
        (optionSelector.querySelector("span") as HTMLElement).textContent = objToSendToHubspot.firstname;
        messagesParentContainer.scrollTop = messagesParentContainer.scrollHeight;
      }
    } else if (currentButtonStatus == buttonStatus.gettingKnowingAbout) {
      AiInput.disabled = false;
      sendMessageButton.disabled = false;
      AiInput.focus();
      currentButtonStatus = buttonStatus.sendingMessages;
      renderAiMessage("Boa! agora vamos começar, o que você gostaria de perguntar?");
      messagesParentContainer.scrollTop = messagesParentContainer.scrollHeight;
      showSuggestedQuestions();
      const url =
                    `https://api.hsforms.com/submissions/v3/integration/submit/7112881/7eecb79c-fc2d-41c5-8f16-cb8e6e22cec9`;

                const formData2 = {
                    submittedAt: Date.now(),
                    skipValidation: true,
                    fields: Object.entries(objToSendToHubspot).map((entry) => ({
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
                        console.log('error', r);
                        alert("erro ao enviar dados" + r.status,)
                      } 
                    }));
                } catch (error) {
                    console.log("ERROR: ", error);
                    return { "Error": error };
                }
    } else if (currentButtonStatus == buttonStatus.sendingMessages) {
      if (AiInput.value.length > 0) {
        sendMessage(AiInput.value);
      }
    }
  }

  function sendMessage(message: string) {
    renderUserMessage(message);
    typingCircles.classList.remove("!hidden");
    messagesParentContainer.scrollTop = messagesParentContainer.scrollHeight;
    sendMessageToApi(message);
    AiInput.focus();
    AiInput.value = "";
  }

  //sendMessageButton.addEventListener("click", sendMessageButtonClick);
  form.addEventListener("submit", (e:SubmitEvent) => {
    e.preventDefault();
    sendMessageButtonClick();
  })

  yesButton.addEventListener("click", (e) => {
    (e.currentTarget as HTMLElement).querySelector(".unchecked")?.classList.add("hidden");
    (e.currentTarget as HTMLElement).querySelector(".checked")?.classList.remove("hidden");
    yesButton.disabled = true;
    noButton.disabled = true;
    objToSendToHubspot.voce_ja_conhece_a_loja_integrada_ = "Sim";
    sendMessageButtonClick();
  });

  noButton.addEventListener("click", (e) => {
    (e.currentTarget as HTMLElement).querySelector(".unchecked")?.classList.add("hidden");
    (e.currentTarget as HTMLElement).querySelector(".checked")?.classList.remove("hidden");
    yesButton.disabled = true;
    noButton.disabled = true;
    objToSendToHubspot.voce_ja_conhece_a_loja_integrada_ = "Ainda não";
    sendMessageButtonClick();
  });

  AiInput.addEventListener("change", () => {
    errorMessage.classList.add("hidden");
  });

  AiInput.addEventListener("keyup", () => {
    hideSuggestedQuestions();
  });

  async function aiMock(): Promise<{ output: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ output: "Resposta de teste" });
      }, 1000);
    });
  }
  async function sendMessageToApi(input: string) {
    const url = 'https://www.lojaintegrada.com.br/li-rag/v1/chat';

    const payload = {
      history: [],
      input
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      // const data = await aiMock();
      console.log('Resposta da API:', data.output);
      renderAiMessage(data.output);
    } catch (error) {
      console.error('Erro na requisição:', error);
      renderAiMessage('Erro na requisição:' + error);
    } finally {
      typingCircles.classList.add("!hidden");
    }
  }

  suggestedQuestions.forEach(question => question.addEventListener("click", (e: any) => {
    sendMessage(e.currentTarget.innerText);
    hideSuggestedQuestions();
  }))

  function hideSuggestedQuestions() {
    suggestedQuestionsContainer.classList.add("absolute", "opacity-0", "pointer-events-none");
  }

  function showSuggestedQuestions() {
    suggestedQuestionsContainer.classList.remove("absolute", "opacity-0", "pointer-events-none");
  }

  function digitarMensagem(container: HTMLElement, mensagem: string) {
    // Converte a string HTML para elementos reais
    const temp = document.createElement("div");
    temp.innerHTML = mensagem;
    const nodes = temp.childNodes;

    let i = 0;

    function digitarNode(node: any, callback: any) {
      if (node.nodeType === Node.TEXT_NODE) {

        let texto = node.textContent;
        let j = 0;
        function digitarLetra() {
          if (j < texto.length) {
            container.innerHTML += texto[j];
            j++;
            setTimeout(digitarLetra, 10);
            messagesParentContainer.scrollTop = messagesParentContainer.scrollHeight;
          } else {
            callback();
          }
        }

        digitarLetra();
      } else {
        // Se for uma tag (ex: <br>, <span>), adiciona diretamente
        const clone = node.cloneNode(true);
        container.appendChild(clone);
        callback();
      }
    }

    function processarProximoNode() {
      if (i < nodes.length) {
        digitarNode(nodes[i], () => {
          i++;
          processarProximoNode();
        });
      }
    }

    processarProximoNode();
  }

  digitarMensagem(containerPrimeiraMensagem, primeiraMensagem);
};

export interface Props {
  aiName?: string;
  suggestedQuestions?: string[];
}

export default function AiChat({ aiName = 'Agente Alfredo', suggestedQuestions = [] }: Props) {
  const sectionId = useId();
  const aiNameClass = "text-sm text-[#5F6E82] font-medium mb-1";
  const messageClass = "text-sm lg:text-base text-[#5F6E82] font-normal leading-[140%]";

  return <div id={sectionId} class="rounded-2xl w-full lg:w-[826px] max-h-[313px] min-h-[313px] lg:max-h-[445px] lg:min-h-[445px] bg-white px-5 pb-8 flex flex-col justify-between">
    <div class="messagesParentContainer carousel !overflow-y-auto !overflow-x-hidden flex flex-col flex-1 px-4 mb-2.5 my-5">
      <p class={aiNameClass}>{aiName}</p>
      <div class={"firstMessage " + messageClass}>
      </div>

      <div class="bg-[#FBFAF9] rounded px-5 py-2.5 pb-7 lg:mb-7 self-start font-semibold text-[#5F6E82] leading-[140%] optionSelector hidden">
        <p class="text-sm "><span></span>, você conhece a Loja Integrada?</p>
        <p class="flex gap-1 items-center pb-3 mb-3 border-b border-[#f1f1f1]">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="12" height="12" rx="6" fill="#D6D6D6"/>
            <path d="M8.57157 4.78564L5.03585 8.21422L3.42871 6.65577" stroke="#8C939D" stroke-width="1.14286" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-xs font-normal text-[#5F6E82]">selecione uma opção</span>
        </p>
        <button class="flex gap-2.5 items-center mb-3 yesButton">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="unchecked" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.4" y="0.4" width="13.2" height="13.2" rx="6.6" stroke="#5F6E82" stroke-width="0.8"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="checked hidden" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="14" rx="7" fill="#28C3C3"/>
            <path d="M9.57157 5.28564L6.03585 8.71422L4.42871 7.15577" stroke="#00363A" stroke-width="1.14286" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span>Sim</span>
        </button>
        <button class="flex gap-2.5 items-center noButton">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="unchecked" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.4" y="0.4" width="13.2" height="13.2" rx="6.6" stroke="#5F6E82" stroke-width="0.8"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="checked hidden" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="14" rx="7" fill="#28C3C3"/>
            <path d="M9.57157 5.28564L6.03585 8.71422L4.42871 7.15577" stroke="#00363A" stroke-width="1.14286" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Não</span>
        </button>
      </div>
    </div>

    <div class="relative">
      <div class="typingCircles bottom-5 left-14 flex !hidden">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    {suggestedQuestions.length > 0 && <div class="px-7 mb-7 relative">
      <div class="bg-white bottom-full transition-opacity duration-1000 absolute opacity-0 pointer-events-none suggestedQuestionsContainer">
        <p class="text-[#5F6E82] font-medium text-sm mb-2.5">Perguntas sugeridas:</p>
        <div class="flex lg:flex-wrap overflow-x-scroll lg:overflow-x-hidden gap-x-1.5 gap-y-3">
          {suggestedQuestions.map(question => (
            <button class="suggestedQuestions whitespace-nowrap border border-[#5F6E82] hover:border-[#0C9898] rounded-xl px-2.5 py-3 text-xs hover:text-[#0C9898] text-[#5F6E82] hover:scale-100 hover:font-normal">
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>}

    <div  class="h-[58px] px-4 border-t border-[#EEEEEE]">
      <form class="mt-5 flex">
        <input 
          class="AiInput focus:outline-none focus:ring-0 flex-1 text-[#5F6E82] text-sm lg:text-base" 
          placeholder="Digite aqui seu nome para começar" />
        <button type="submit" value="" class="sendMessageButton hover:scale-100 group">
          <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18.5" cy="18.8655" r="17.5" class="text-[#00363A] fill-current group-hover:text-[#0C9898] group-disabled:text-[#D6D6D6]" />
            <path d="M17.7228 15.3079L13.9283 19.0166C13.7028 19.2422 13.4379 19.3503 13.1334 19.3408C12.8289 19.3312 12.564 19.2136 12.3385 18.9879C12.1128 18.7623 12 18.4973 12 18.1931C12 17.8886 12.1128 17.6235 12.3385 17.3979L18.0164 11.7037C18.242 11.4782 18.5124 11.3655 18.8276 11.3655C19.1427 11.3655 19.4131 11.4782 19.6388 11.7037L25.3166 17.3979C25.5423 17.6235 25.6551 17.8886 25.6551 18.1931C25.6551 18.4973 25.5423 18.7623 25.3166 18.9879C25.0912 19.2136 24.8262 19.3264 24.5217 19.3264C24.2173 19.3264 23.9523 19.2136 23.7268 18.9879L19.9896 15.2507V25.2321C19.9896 25.5554 19.8815 25.8252 19.6654 26.0413C19.4494 26.2574 19.1797 26.3655 18.8562 26.3655C18.5327 26.3655 18.2629 26.2574 18.047 26.0413C17.8309 25.8252 17.7228 25.5554 17.7228 25.2321V15.3079Z" fill="#FBFAF9" />
          </svg>
        </button>
      </form>
      <p class="error text-[#F57E77] text-xs hidden"/>
    </div>      

    {/* <div dangerouslySetInnerHTML={{__html: `
        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
        <script>
          hbspt.forms.create({
            portalId: "7112881",
            formId: "7eecb79c-fc2d-41c5-8f16-cb8e6e22cec9",
            region: "na1"
          });
        </script>
      `}}/> */}
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, sectionId, aiName, messageClass, aiNameClass) }}
    />  
    </div >   

}
