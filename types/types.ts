export interface Button {
    /**
     * @title Função do botão
     * @description createStoreForm irá abrir um modal para criação de loja, ctaForm abrirá o modal para envio de info, e link para redirecionamento
     */
    type: "createStoreForm" | "ctaForm" | "link";
    text?: string;
    /**
     * @title URL do redirecionamento
     * @description Apenas incluir link nesse campo caso a opção de link na função do botão seja escolhida
     */
    link?: string;
    /**
     * @title Tipo do botão
     * @description Altera a estilização do botão para uma outra já setada previamente
     */
    changeType?: boolean;
    /**
     * @title ID do plano
     * @description Insira o ID do plano para o form do modal de criação de loja
     */
    planId?: string;
}
