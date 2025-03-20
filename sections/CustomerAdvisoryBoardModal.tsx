import { useScript } from "deco/hooks/useScript.ts";

const onLoad = () => {
  const modal = document.getElementById("customerAdvisoryBoardModal") as HTMLElement;
  const form = modal.querySelector("form") as HTMLElement;
  const cancelButton = modal?.querySelector(".cancelButton");
  const nextButton = modal?.querySelector(".nextButton");

  const page1 = modal.querySelector(".page1") as HTMLElement;
  const page2 = modal.querySelector(".page2") as HTMLElement;
  const page3 = modal.querySelector(".page3") as HTMLElement;
  const page4 = modal.querySelector(".page4") as HTMLElement;

  const progressBar = modal.querySelector(".progressBar") as HTMLElement;
  const formStep = modal.querySelector(".formStep") as HTMLElement;

  const fields = modal.querySelectorAll("label");

  const nameInput = modal.querySelector('input[name="name"]') as HTMLInputElement;
  const emailInput = modal.querySelector('input[name="email"]') as HTMLInputElement;
  const dddInput = modal.querySelector('input[name="ddd"]') as HTMLInputElement;
  const telefoneInput = modal.querySelector('input[name="telefone"]') as HTMLInputElement;
  // const nomeLojaInput = modal.querySelector('input[name="nome_loja"]') as HTMLInputElement;
  // const urlInput = modal.querySelector('input[name="url_loja"]') as HTMLInputElement;
  // const segmentoInput = modal.querySelector('input[name="segmento"]') as HTMLInputElement; 
  // const tempoAtuacaoInput = modal.querySelector('input[name="tempo_atuacao"]') as HTMLInputElement; 
  // const faturamentoMedioInput = modal.querySelector('select[name="faturamento_medio"]') as HTMLInputElement; 
  // const participouAntesInput = modal.querySelector('input[name="participou_antes"]') as HTMLInputElement; 

  let currentPage = 1;

  const closeModal = () => {
    modal.style.display = "none";

    fields.forEach(field => {
      const input = field.querySelector("input");
      if (input) input.value = "";
    });

    page1.classList.remove("hidden");
    page2.classList.add("hidden");
    page3.classList.add("hidden");
    progressBar.style.width = ("33%");
    currentPage = 1;
    formStep.textContent = "Etapa 1 "
    cancelButton?.classList.remove("hidden");
  }

  cancelButton?.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentPage == 1) {
      let validated = true;

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

      if (dddInput.value.length < 2 || telefoneInput.value.length < 8) {
        const errorMessage = dddInput.parentElement?.parentElement?.querySelector(".error") as HTMLElement;
        errorMessage.classList.remove("hidden");
        errorMessage.innerText = "Preencha um número válido";
        dddInput.style.borderColor = "#F57E77";
        telefoneInput.style.borderColor = "#F57E77";
        validated = false;
      }

      if (validated) {
        page1.classList.add("hidden");
        page2.classList.remove("hidden");
        progressBar.style.width = ("66%");
        currentPage = 2;
        formStep.textContent = "Etapa 2 "
      }
    } else if (currentPage == 2) {
      page2.classList.add("hidden");
      page3.classList.remove("hidden");
      progressBar.style.width = ("100%");
      currentPage = 3;
      formStep.textContent = "Etapa 3 "
    } else if (currentPage == 3) {

      page3.classList.add("hidden");
      page4.classList.remove("hidden");
      currentPage = 4;
      cancelButton?.classList.add("hidden");

      const inlineMessage = modal.querySelector(".inlineMessage") as HTMLElement;

      const formData = new FormData(e.target as HTMLFormElement); // Obtém os dados do formulário.
  
      const data:any = {};
      formData.forEach((value, key) => {
        data[key] = value; // Popula o objeto com os pares chave-valor do formulário.
      });

      //monta o objeto a ser enviado par ao hubspot
      const objectToSend = {
        firstname: data.name,
        email: data.email,
        mobilephone: `${data.ddd}${data.telefone}`,
        company: data.nome_loja,
        url_da_loja: data.url_loja,
        segmento_loja: data.segmento,
        tempo_de_atuacao_no_ecommerce: data.tempo_atuacao,
        pd__faturamento_mensal_no_ecommerce: data.faturamento_medio,
        ja_participou_de_testes_ou_pesquisas_com_a_equipe_da_loja_integrada_: data.participou_antes,
        quais_sao_suas_maiores_dores_ou_desafios_hoje_na_plataforma_: data.dores
      }

      //envia os dados para o hubspot
      const hutk = document.cookie.replace(/(?:(?:^|.;\s)hubspotutk\s=\s([^;]).$)|^.*$/, "$1");
      const context = {
          "hutk": hutk,
          "pageUri": window.location.href,
          "pageName": document.title
      };
      fetch('/live/invoke/site/actions/sendTcoUserData.ts', {
          body: JSON.stringify({ fields: objectToSend, formGuid: '4d3d5f57-9dac-4b07-9565-8a4b196d4b13', portalId: '7112881', context: context }),
          method: 'POST',
          headers: { 'content-type': 'application/json' }
      }).then((r) => r.json()).then((r) => {
        console.log(r)
        inlineMessage.innerText = r.Success ? "Enviado" : "Erro ao enviar";
      });
    } else if (currentPage == 4) {
      closeModal();
    }
  });
};

const onKeyUp = () => {
  const target = event!.currentTarget as HTMLElement;
  let errorMessage = target.parentElement?.querySelector(".error") as HTMLElement | undefined;
  if (errorMessage) {
    errorMessage.classList.add("hidden");
  } else {
    errorMessage = target.parentElement?.parentElement?.querySelector(".error") as HTMLElement | undefined;
    errorMessage?.classList.add("hidden");
  }
  target.style.borderColor = "#5F6E82";
};

export function CustomRadio({name, value}: {value: string, name: string}) {
  return <>
    <input type="radio" name={name} value={value} class="hidden peer" />
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="peer-checked:hidden">
              <rect x="0.5" y="1.21094" width="23" height="23" rx="7.5" stroke="#CFD3D5"/>
              </svg>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden peer-checked:block">
              <rect x="0.5" y="1.21094" width="23" height="23" rx="7.5" stroke="#00B7B5"/>
              <rect x="2" y="2.71094" width="20" height="20" rx="6" fill="#00B7B5"/>
              <path d="M16 9.71094L10.5 15.2109L8 12.7109" stroke="#B7FBDB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
  </>
}

export default function CustomerAdvisoryBoardModal() {
  const labelClass = "mb-2 text-transparent group-focus-within:text-[#00B7B5] transition-colors text-xs";
  const inputClass = "rounded-lg outline-none border py-2 px-4 text-[#5F6E82] placeholder:text-[#CBCBC1] border-[#5F6E82] focus:border-[#00B7B5] w-full mb-1.5";

  return <div
    id="customerAdvisoryBoardModal"
    class="fixed z-[60] top-0 left-0 w-screen max-h-screen h-screen bg-black bg-opacity-50 flex justify-center pt-[8vh] hidden">
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
    />
    <form id="customerAdvisoryBoardModalForm" class="max-w-[582px] w-full h-fit p-5 lg:p-20 bg-white max-h-screen overflow-auto rounded-[20px] animate-pop-up" style={{ animationDuration: "0.3s" }}>

      <h2 class="text-[#00363A] text-[22px] font-bold mb-6">Preencha o formulário para participar</h2>

      <p class="text-[#5F6E82] w-full text-right mb-4">
        <span class="text-[#00B7B5] formStep">Etapa 1 </span>
        de 3
      </p>

      <div class="h-1.5 bg-[#F2F4F5] w-full rounded-md relative mb-11">
        <div class="h-3 bg-[#00B7B5] w-[33%] rounded-md top-[-50%] absolute transition-all duration-500 progressBar" />
      </div>

      <div class="mb-10 page1">
        <label class="group nameField">
          <p class={labelClass}>Nome</p>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            class={inputClass}
            hx-on:keyup={useScript(onKeyUp)}
          />
          <p class="error text-[#F57E77] text-xs hidden" />
        </label>
        <label class="group">
          <p class={labelClass}>E-mail</p>
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            class={inputClass}
            hx-on:keyup={useScript(onKeyUp)}
          />
          <p class="error text-[#F57E77] text-xs hidden" />
        </label>
        <label class="group">
          <p class={` mb-2 group-focus-within:text-[#00B7B5] transition-colors text-xs text-[#5F6E82]`}>Celular / WhatsApp</p>
          <div class="flex gap-1.5">
            <input
              type="number"
              name="ddd"
              placeholder="11"
              class={`max-w-[50px] ${inputClass} pr-0.5`}
              hx-on:keyup={useScript(onKeyUp)}
            />
            <input
              type="tel"
              name="telefone"
              placeholder="959498761"
              class={inputClass}
              hx-on:keyup={useScript(onKeyUp)}
            />
          </div>
          <p class="error text-[#F57E77] text-xs hidden" />
        </label>
      </div>

      <div class="page2 mb-10 hidden">
        <label class="group">
          <p class={labelClass}>Nome da Loja</p>
          <input
            type="text"
            name="nome_loja"
            placeholder="Nome da Loja"
            class={inputClass}
          />
        </label>

        <label class="group">
          <p class={labelClass}>Url da loja</p>
          <input
            type="text"
            name="url_loja"
            placeholder="Url da loja"
            class={inputClass}
          />
        </label>

        <label class="group">
          <p class={labelClass}>Segmento</p>
          <input
            type="text"
            name="segmento"
            placeholder="Segmento"
            class={inputClass}
          />
        </label>

        <label class="group">
          <p class={labelClass}>Tempo de atuação no e-commerce</p>
          <input
            type="text"
            name="tempo_atuacao"
            placeholder="Tempo de atuação no e-commerce"
            class={inputClass}
          />
        </label>

        <label class="group">
          <p class={labelClass}>Faturamento médio mensal</p>
          <select name="faturamento_medio" class={`${inputClass} min-h-[42px]`}>
            <option value="">Faturamento médio mensal</option>
            <option value="Acima de R$ 500K">Acima de R$ 500K</option>
            <option value="Entre R$ 200K e R$ 500K">Entre R$ 200K e R$ 500K</option>
            <option value="Entre R$ 100K e R$ 199K">Entre R$ 100K e R$ 199K</option>
            <option value="Entre R$ 51K e R$ 99K">Entre R$ 51K e R$ 99K</option>
            <option value="Até R$ 50K">Até R$ 50K</option>
          </select>
        </label>
      </div>

      <div class="page3 mb-10 hidden">
          <p class="mb-6">Já participou de testes ou pesquisas com a equipeda Loja Integrada?</p>
          <div class="flex gap-5 mb-6">
            <label class="flex gap-5">
              <CustomRadio name="participou_antes" value="sim" />
              Sim
            </label>
            <label class="flex gap-5">
              <CustomRadio name="participou_antes" value="nao" />
              Não
            </label>
          </div>

          <label>
            <p class="text-[#5F6E82]">Quais sao suas maiores dores ou desafios
            hoje na plataforma?</p>
            <textarea name="dores" class={`${inputClass} h-40`}/>
          </label>
      </div>

      <div class="page4 mb-10 hidden">
        <p class="inlineMessage text-[#00363A] text-[22px] font-bold mb-6">Enviando...</p>
      </div>

      <div class="flex w-full gap-5">
        <button class="py-4 text-center border border-[#00363A] rounded-lg font-semibold text-[#00363A] flex-grow hover:scale-105 transition-all cancelButton">
          Cancelar
        </button>
        <button type="submit" class="py-4 text-center bg-[#00363A] rounded-lg font-semibold text-white flex-grow hover:scale-105 transition-all nextButton">
          Continuar
        </button>
      </div>

      {/* <script dangerouslySetInnerHTML={{
        __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
  <script>
    hbspt.forms.create({
      portalId: "7112881",
      formId: "4d3d5f57-9dac-4b07-9565-8a4b196d4b13",
      region: "na1"
    });
  </script>`}} /> */}
    </form>
  </div>
}