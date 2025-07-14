import { useState, useEffect, useCallback } from "preact/hooks";

const useMutationObserver = (domNodeSelector: string, observerOptions: MutationObserverInit, cb: MutationCallback) => {
    useEffect(() => {
        const targetNode = document.querySelector(domNodeSelector);
        if (!targetNode) {
            console.error(`Element with selector "${domNodeSelector}" not found`);
            return;
        }

        const observer = new MutationObserver(cb);
        observer.observe(targetNode, observerOptions);

        return () => {
            observer.disconnect();
        };
    }, [domNodeSelector, observerOptions, cb]);
};


const CreateStoreModal = () => {
    const [getPlanId, setGetPlanId] = useState('');
    const [getPeriod, setGetPeriod] = useState('');
    const [getCoupon, setGetCoupon] = useState('');

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacao_senha: "",
        termos: false,
    });

    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacao_senha: "",
        termos: "",
    });

    const [validated, setValidated] = useState(false);
    useEffect(() => {
        if (formData.termos == false || formData.nome == "" || formData.email == "" || formData.senha == "" || formData.confirmacao_senha == "") return setValidated(false);
        if (errors.termos != "") return setValidated(false);
        if (errors.nome != "") return setValidated(false);
        if (errors.email != "") return setValidated(false);
        if (errors.senha != "") return setValidated(false);
        if (errors.confirmacao_senha != "") return setValidated(false);
        setValidated(true);
    }, [errors]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validações
        if (name === "nome" && value.length < 3) {
            setErrors({
                ...errors,
                nome: "Seu nome precisa ser maior que 2 caracteres",
            });
        } else if (name === "nome") {
            setErrors({ ...errors, nome: "" });
        }

        if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
            setErrors({ ...errors, email: "Preencha um e-mail válido" });
        } else if (name === "email") {
            setErrors({ ...errors, email: "" });
        }

        if (name === 'senha') {
            const hasMinLength = value.length >= 8;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);

            let senha_erro = '';
            let confirmacao_senha_erro = '';

            if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber)
                senha_erro = 'A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma letra minúscula.';
            if (value !== formData.confirmacao_senha)
                confirmacao_senha_erro = "As senhas não coincidem";

            setErrors({ ...errors, confirmacao_senha: confirmacao_senha_erro, senha: senha_erro })
        }

        if (name === "confirmacao_senha" && value !== formData.senha) {
            setErrors({ ...errors, confirmacao_senha: "As senhas não coincidem" });
        } else if (name === "confirmacao_senha") {
            setErrors({ ...errors, confirmacao_senha: "" });
        }
    };

    const handleCheckboxChange = (e: any) => {
        setFormData(prev => {
            if (prev.termos == true) setErrors(prev => ({ ...prev, termos: "Você precisa concordar com os termos" }));
            else setErrors(prev => ({ ...prev, termos: "" }));
            return { ...prev, termos: !prev.termos }
        });
    }

    const handleClose = () => {
        const getModal = document.getElementById("createStoreModal");
        if (getModal) {
            getModal.classList.add("hidden");
            getModal.classList.remove("flex");
        }
    }

    const handler = useCallback((mutationsList: MutationRecord[]) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-planid') {
                const modal = document.getElementById("createStoreModal");
                const newPlanId = modal?.getAttribute("data-planid") || '';
                const newPeriod = modal?.getAttribute("data-period") || 'anual';
                const newCoupon = modal?.getAttribute("data-coupon") || '';
                setGetPlanId(newPlanId);
                setGetPeriod(newPeriod);
                setGetCoupon(newCoupon);
                break;
            }
        }
    }, []);

    useMutationObserver('#createStoreModal', { attributes: true, attributeFilter: ['data-planid'] }, handler);

    const validateForm = () => {
        const { nome, email, senha, confirmacao_senha } = formData;
        let hasError = false;

        if (nome.length < 3) {
            setErrors(prev => ({ ...prev, nome: "Seu nome precisa ser maior que 2 caracteres" }));
            hasError = true;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors(prev => ({ ...prev, email: "Preencha um e-mail válido" }));
            hasError = true;
        }

        if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[a-z]/.test(senha) || !/\d/.test(senha)) {
            setErrors(prev => ({ ...prev, senha: 'A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma letra minúscula.' }));
            hasError = true;
        }

        if (confirmacao_senha !== senha) {
            setErrors(prev => ({ ...prev, confirmacao_senha: "As senhas não coincidem" }));
            hasError = true;
        }

        return !hasError;
    };

    const sendDataLayerEvent = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'callback_cadastro_lead_institucional'
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            await sendDataLayerEvent();
            setTimeout(() => {
                e.target.submit();
            }, 300)
        } else {
            console.error("Erros de validação encontrados, o formulário não será enviado.");
        }
    };

    function handleKeyDown(e: any): void {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    return (
        <div id="createStoreModal" className="hidden fixed z-[60] inset-0 bg-black bg-opacity-50 items-center justify-center z-5">
            <div className="relative mx-[10px] flex flex-col items-center p-6 w-full max-w-[550px] lg:mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-pop-up" style={{ animationDuration: '0.3s' }}>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={handleClose}
                >
                    X
                </button>

                <form
                    action={`https://app.lojaintegrada.com.br/public/assinar?periodo=${getPeriod}&plano_id=${getPlanId}${getCoupon && `&cupom=${getCoupon}`}`}
                    id="modal-no-check"
                    data-gtm-form-interact-id="0"
                    method="POST"
                    className="w-full flex flex-col items-center justify-center"
                    onSubmit={handleSubmit}
                    onKeyDown={handleKeyDown}
                >
                    <input type="hidden" name="gcaptcha_site" value="6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_"></input>
                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold text-[#371e56]">
                            Nome
                        </label>
                        <input
                            name="nome"
                            value={formData.nome}
                            onInput={handleInputChange}
                            type="text"
                            className={`mt-1 w-full p-2 border ${errors.nome ? "border-red-500" : "border-gray-300"
                                } rounded-[80px]`}
                            placeholder="Seu nome"
                            required
                        />
                        {errors.nome && (
                            <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
                        )}
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold text-[#371e56]">
                            E-mail
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onInput={handleInputChange}
                            type="email"
                            className={`mt-1 w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-[80px]`}
                            placeholder="Seu e-mail"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold text-[#371e56]">
                            Senha
                        </label>
                        <input
                            name="senha"
                            value={formData.senha}
                            onInput={handleInputChange}
                            type="password"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-[80px]"
                            placeholder="Senha"
                            required
                        />
                        <p className={`text-gray-500 text-xs mt-1 ${errors.senha && "text-red-500"}`}>
                            Mínimo de 8 caracteres, contendo um número, uma letra maiúscula e
                            uma letra minúscula
                        </p>
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold text-[#371e56]">
                            Confirme sua senha
                        </label>
                        <input
                            name="confirmacao_senha"
                            value={formData.confirmacao_senha}
                            onInput={handleInputChange}
                            type="password"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-[80px]"
                            placeholder="Confirme sua senha"
                            required
                        />
                        {errors.confirmacao_senha && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmacao_senha}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" name="termos" onChange={handleCheckboxChange} required />
                            <span className="ml-2 text-xs text-gray-600">
                                Ao clicar, você concorda com os{" "}
                                <a href="https://lojaintegrada.com.br/termos-de-uso" target="_blank" className="text-[#0C9898] font-bold">
                                    Termos de Uso
                                </a>{" "}
                                e a{" "}
                                <a href="https://lojaintegrada.com.br/privacidade/" target="_blank" className="text-[#0C9898] font-bold">
                                    Política de Privacidade
                                </a>
                                .
                            </span>
                        </label>
                    </div>

                    <div className="w-full max-w-[450px] mt-6">

                        <script dangerouslySetInnerHTML={{
                            __html: `
                            function onSubmitModalForm(token) {
                                console.log("recaptcha submited");
                                document.getElementById('modal-no-check').submit();
                            }
                            `}}></script>
                        <button
                            id="input-form-modal_no_check"
                            className={`w-full py-3 bg-[#0c9898] text-white font-bold rounded-md g-recaptcha btn-captcha relative ${!validated && 'pointer-events-none'}`}
                            type="submit"
                            data-sitekey="6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_"
                            data-callback="onSubmitModalForm"
                        >
                            Abrir minha loja agora
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStoreModal;
