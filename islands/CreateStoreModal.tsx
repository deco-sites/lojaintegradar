import { useState, useEffect, useCallback, useMemo } from "preact/hooks";

// Utilitário de debounce para validações
const debounce = (func: Function, wait: number) => {
    let timeout: number;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Hook otimizado do MutationObserver com controle de ativação
const useMutationObserver = (
    domNodeSelector: string,
    observerOptions: MutationObserverInit,
    cb: MutationCallback,
    enabled: boolean = true
) => {
    useEffect(() => {
        if (!enabled) return;

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
    }, [domNodeSelector, observerOptions, cb, enabled]);
};

export interface Props {
    googleAccountButton?: boolean;
}

const CreateStoreModal = ({ googleAccountButton }: Props) => {
    // Estado de controle do modal otimizado
    const [isOpen, setIsOpen] = useState(false);

    // Estados de dados do plano
    const [getPlanId, setGetPlanId] = useState('');
    const [getPeriod, setGetPeriod] = useState('');
    const [getCoupon, setGetCoupon] = useState('');

    // Estados do formulário
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

    // Captura UTMs de forma otimizada (useMemo em vez de useEffect)
    const getUtms = useMemo(() => {
        if (typeof window === 'undefined') return '';

        const params = new URLSearchParams(window.location.search);
        const utmParams = new URLSearchParams();

        params.forEach((value, key) => {
            if (key.startsWith('utm_')) {
                utmParams.append(key, value);
            }
        });

        return utmParams.toString();
    }, []);

    // Validação otimizada com useMemo em vez de useEffect
    const validated = useMemo(() => {
        if (!formData.termos || !formData.nome || !formData.email ||
            !formData.senha || !formData.confirmacao_senha) return false;

        return !Object.values(errors).some(error => error !== "");
    }, [formData, errors]);

    // Carrega scripts externos apenas quando modal está aberto
    useEffect(() => {
        if (!isOpen) return;

        // Carrega reCAPTCHA dinamicamente
        const recaptchaScript = document.createElement('script');
        recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
        recaptchaScript.async = true;
        recaptchaScript.id = 'recaptcha-script';
        
        if (!document.getElementById('recaptcha-script')) {
            document.body.appendChild(recaptchaScript);
        }

        // Carrega Google Sign-In apenas se necessário
        if (googleAccountButton) {
            const gsiScript = document.createElement('script');
            gsiScript.src = 'https://accounts.google.com/gsi/client';
            gsiScript.async = true;
            gsiScript.id = 'gsi-script';
            
            if (!document.getElementById('gsi-script')) {
                document.body.appendChild(gsiScript);
            }
        }
    }, [isOpen, googleAccountButton]);

    // Função de validação com debounce
    const validateField = useCallback(
        debounce((name: string, value: any) => {
            const newErrors = { ...errors };

            if (name === "nome") {
                newErrors.nome = value.length < 3 ? "Seu nome precisa ser maior que 2 caracteres" : "";
            }

            if (name === "email") {
                newErrors.email = !/\S+@\S+\.\S+/.test(value) ? "Preencha um e-mail válido" : "";
            }

            if (name === 'senha') {
                const hasMinLength = value.length >= 8;
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /\d/.test(value);

                if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
                    newErrors.senha = 'A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma letra minúscula.';
                } else {
                    newErrors.senha = '';
                }

                if (value !== formData.confirmacao_senha && formData.confirmacao_senha) {
                    newErrors.confirmacao_senha = "As senhas não coincidem";
                } else if (value === formData.confirmacao_senha) {
                    newErrors.confirmacao_senha = "";
                }
            }

            if (name === "confirmacao_senha") {
                newErrors.confirmacao_senha = value !== formData.senha ? "As senhas não coincidem" : "";
            }

            setErrors(newErrors);
        }, 300),
        [errors, formData.senha, formData.confirmacao_senha]
    );

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleCheckboxChange = (e: any) => {
        setFormData(prev => {
            const newTermos = !prev.termos;
            setErrors(prevErrors => ({
                ...prevErrors,
                termos: newTermos ? "" : "Você precisa concordar com os termos"
            }));
            return { ...prev, termos: newTermos };
        });
    };

    // Controle de abertura/fechamento otimizado sem manipulação DOM direta
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Detecta abertura do modal
    useEffect(() => {
        const checkModalVisibility = () => {
            const modal = document.getElementById("createStoreModal");
            if (modal && !modal.classList.contains('hidden')) {
                setIsOpen(true);
            }
        };

        checkModalVisibility();
        const interval = setInterval(checkModalVisibility, 500);

        return () => clearInterval(interval);
    }, []);

    // Handler do MutationObserver otimizado
    const handler = useCallback((mutationsList: MutationRecord[]) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-planid') {
                const modal = mutation.target as HTMLElement;
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

    // MutationObserver ativo apenas quando modal está aberto
    useMutationObserver('#createStoreModal', { attributes: true, attributeFilter: ['data-planid'] }, handler, isOpen);

    const handleKeyDown = useCallback((e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }, []);

    // URL do formulário otimizada
    const formAction = useMemo(() => {
        const baseUrl = 'https://app.lojaintegrada.com.br/public/assinar';
        const params = new URLSearchParams({
            periodo: getPeriod,
            plano_id: getPlanId,
        });

        if (getCoupon) params.append('cupom', getCoupon);
        if (getUtms) {
            const utmEntries = new URLSearchParams(getUtms);
            utmEntries.forEach((value, key) => params.append(key, value));
        }

        return `${baseUrl}?${params.toString()}`;
    }, [getPeriod, getPlanId, getCoupon, getUtms]);

    return (
        <div
            id="createStoreModal"
            className={`${isOpen ? 'flex' : 'hidden'} fixed z-[60] inset-0 bg-black bg-opacity-50 items-center justify-center`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
        >
            <div
                className="relative mx-[10px] flex flex-col items-center p-6 w-full max-w-[550px] lg:mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                style={{ animation: 'pop-up 0.3s ease-out' }}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                    onClick={handleClose}
                    aria-label="Fechar modal"
                >
                    ✕
                </button>

                {googleAccountButton && isOpen && (
                    <>
                        <div className="my-5 relative text-on-base-2 text-f7 leading-4 tracking-4 w-full">
                            <div className="absolute w-full h-[2px] bg-white z-10"></div>
                            <div className="absolute w-full h-[2px] bg-white z-10 bottom-0"></div>
                            <div className="absolute w-[5px] h-full bg-white z-10 left-[calc(50%+105px)]"></div>
                            <div className="absolute w-[5px] h-full bg-white z-10 right-[calc(50%+106px)]"></div>
                            <div
                                id="g_id_onload"
                                data-client_id="1091824353523-i8sdgbl0143713a07vvlpsdd5uoobi2p.apps.googleusercontent.com"
                                data-context="signin"
                                data-ux_mode="popup"
                                data-login_uri="https://app.lojaintegrada.com.br/public/login/google"
                                data-auto_prompt="false"
                                data-state='{"source":"google_account_creation"}'
                                data-key="app.lojaintegrada.com.br"
                            ></div>
                            <div
                                className="g_id_signin"
                                data-type="standard"
                                data-shape="rectangular"
                                data-theme="filled_white"
                                data-text="continue_with"
                                data-size="large"
                                data-locale="pt-BR"
                                data-click_listener="signWithGoogle"
                                data-logo_alignment="center"
                            ></div>
                        </div>
                        <p className="w-full text-center text-sm">Ou crie com seu E-mail</p>
                    </>
                )}

                <form
                    action={formAction}
                    id="modal-no-check"
                    method="POST"
                    className="w-full flex flex-col items-center justify-center"
                    onKeyDown={handleKeyDown}
                >
                    <input type="hidden" name="gcaptcha_site" value="6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_" />

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold text-[#371e56]">
                            Nome
                        </label>
                        <input
                            name="nome"
                            value={formData.nome}
                            onInput={handleInputChange}
                            type="text"
                            className={`mt-1 w-full p-2 border ${errors.nome ? "border-red-500" : "border-gray-300"} rounded-[80px] transition-colors`}
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
                            className={`mt-1 w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-[80px] transition-colors`}
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
                            className="mt-1 w-full p-2 border border-gray-300 rounded-[80px] transition-colors"
                            placeholder="Senha"
                            required
                        />
                        <p className={`text-gray-500 text-xs mt-1 transition-colors ${errors.senha && "text-red-500"}`}>
                            Mínimo de 8 caracteres, contendo um número, uma letra maiúscula e uma letra minúscula
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
                            className="mt-1 w-full p-2 border border-gray-300 rounded-[80px] transition-colors"
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
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                name="termos"
                                checked={formData.termos}
                                onChange={handleCheckboxChange}
                                required
                            />
                            <span className="ml-2 text-xs text-gray-600">
                                Ao clicar, você concorda com os{" "}
                                <a href="https://lojaintegrada.com.br/termos-de-uso" target="_blank" rel="noopener noreferrer" className="text-[#0C9898] font-bold">
                                    Termos de Uso
                                </a>{" "}
                                e a{" "}
                                <a href="https://lojaintegrada.com.br/privacidade/" target="_blank" rel="noopener noreferrer" className="text-[#0C9898] font-bold">
                                    Política de Privacidade
                                </a>
                                .
                            </span>
                        </label>
                    </div>

                    <div className="w-full max-w-[450px] mt-6">
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                function onSubmitModalForm(token) {
                                    console.log("recaptcha submited");
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                        'event': 'callback_cadastro_lead_institucional'
                                    });
                                    setTimeout(() => {
                                        document.getElementById('modal-no-check').submit();
                                    }, 300);
                                }
                                `
                            }}
                        />
                        <button
                            id="input-form-modal_no_check"
                            className={`w-full py-3 bg-[#0c9898] text-white font-bold rounded-md g-recaptcha btn-captcha transition-all ${!validated && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                            type="submit"
                            data-sitekey="6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_"
                            data-callback="onSubmitModalForm"
                            disabled={!validated}
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
