import { useState, useEffect, useCallback, useMemo } from "preact/hooks";
import { CreateStoreFormProps } from "../../sections/CreateStoreHero.tsx";
import { useScript } from "deco/hooks/useScript.ts";

// Utilitário de debounce
const debounce = (func: Function, wait: number) => {
  let timeout: number;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const CreateStoreForm = ({
  googleAccountButton,
  googleAccountBelowText,
  planoId,
  periodo,
  backgroundColor,
  buttonText,
  agreeText1,
  agreeLink1,
  agreeLink2,
  agreeText2,
  agreeText3,
  nameCaption,
  namePlaceholder,
  passwordCaption,
  passwordPlaceholder,
  passwordText,
  confirmPasswordCaption,
  confirmPasswordPlaceholder,
  emailCaption,
  emailPlaceholder,
  inputsLabelColor,
  inputsTextColor,
  inputsBorderColor,
  inputsBellowTextColor,
  linksColor,
  buttonBackgroundColor,
  buttonTextColor
}: CreateStoreFormProps) => {
  
  // Estados
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Captura UTMs de forma otimizada (useMemo)
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

  // Validação otimizada com useMemo
  const validated = useMemo(() => {
    if (!formData.termos || !formData.nome || !formData.email ||
        !formData.senha || !formData.confirmacao_senha) return false;
    
    return !Object.values(errors).some(error => error !== "");
  }, [formData, errors]);

  // Validação com debounce
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

  const validateForm = () => {
    const { nome, email, senha, confirmacao_senha } = formData;
    let hasError = false;

    const newErrors = { ...errors };

    if (nome.length < 3) {
      newErrors.nome = "Seu nome precisa ser maior que 2 caracteres";
      hasError = true;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Preencha um e-mail válido";
      hasError = true;
    }

    if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[a-z]/.test(senha) || !/\d/.test(senha)) {
      newErrors.senha = 'A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma letra minúscula.';
      hasError = true;
    }

    if (confirmacao_senha !== senha) {
      newErrors.confirmacao_senha = "As senhas não coincidem";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const sendCallbackEvent = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'callback_cadastro_lead_institucional',
      'user_data': {
        nome: formData.nome,
        email: formData.email,
      }
    });
  }, [formData.nome, formData.email]);

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (validateForm()) {
      setIsSubmitting(true);
      sendCallbackEvent();
      
      // Pequeno delay para garantir que o dataLayer foi enviado
      setTimeout(() => {
        e.target.submit();
      }, 100);
    } else {
      console.error("Erros de validação encontrados, o formulário não será enviado.");
    }
  }, [isSubmitting, formData, sendCallbackEvent]);

  const handleKeyDown = useCallback((e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }, []);

  // URL do formulário otimizada
  const formAction = useMemo(() => {
    const baseUrl = 'https://app.lojaintegrada.com.br/public/assinar';
    const params = new URLSearchParams({
      periodo: periodo || 'anual',
      plano_id: planoId || '172',
    });

    if (getUtms) {
      const utmEntries = new URLSearchParams(getUtms);
      utmEntries.forEach((value, key) => params.append(key, value));
    }

    return `${baseUrl}?${params.toString()}`;
  }, [periodo, planoId, getUtms]);

  return (
    <div id="createStoreFormDiv" className="inset-0 bg-opacity-50 items-center justify-center z-5">
      <div
        className="relative flex flex-col items-center p-12 w-full max-w-[460px] lg:mx-auto bg-white rounded-2xl shadow-md overflow-hidden text-[#371e56]"
        style={{ 
          background: backgroundColor, 
          color: inputsLabelColor, 
          minHeight: "clamp(500px, 580px, 90vh)" 
        }}
        id="createStoreFormContainer"
      >
        {/* Script do Google carregado CONDICIONALMENTE */}
        {googleAccountButton && (
          <script src="https://accounts.google.com/gsi/client" async defer></script>
        )}

        {googleAccountButton && (
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
              
              {/* Container com altura reservada para evitar CLS */}
              <div style={{ minHeight: "44px", display: "flex", justifyContent: "center" }}>
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
                  style={{ width: "100%", minHeight: "44px" }}
                ></div>
              </div>
            </div>
            <p className="w-full text-center text-sm">{googleAccountBelowText}</p>
          </>
        )}

        <form
          action={formAction}
          id="createStoreFormRecaptcha"
          method="POST"
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <input type="hidden" name="gcaptcha_site" value="6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_" />

          {/* Campo Nome */}
          <div className="mt-4 w-full max-w-[450px]">
            <label className="block text-sm font-semibold">
              {nameCaption || 'Nome'}
            </label>
            <input
              name="nome"
              value={formData.nome}
              onInput={handleInputChange}
              type="text"
              className={`mt-1 w-full p-2 border text-black rounded-md transition-colors`}
              placeholder={namePlaceholder || "Seu nome"}
              style={{ 
                color: inputsTextColor, 
                borderColor: errors.nome ? "#ef4444" : inputsBorderColor 
              }}
              required
            />
            {/* Espaço reservado para mensagem de erro */}
            <div style={{ minHeight: "20px", marginTop: "4px" }}>
              {errors.nome && (
                <p className="text-red-500 text-xs">{errors.nome}</p>
              )}
            </div>
          </div>

          {/* Campo Email */}
          <div className="mt-4 w-full max-w-[450px]">
            <label className="block text-sm font-semibold">
              {emailCaption || 'E-mail'}
            </label>
            <input
              name="email"
              value={formData.email}
              onInput={handleInputChange}
              type="email"
              className={`mt-1 w-full p-2 border rounded-md transition-colors`}
              placeholder={emailPlaceholder || "Seu e-mail"}
              style={{ 
                color: inputsTextColor, 
                borderColor: errors.email ? "#ef4444" : inputsBorderColor 
              }}
              required
            />
            <div style={{ minHeight: "20px", marginTop: "4px" }}>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Campo Senha */}
          <div className="mt-4 w-full max-w-[450px]">
            <label className="block text-sm font-semibold">
              {passwordCaption || 'Senha'}
            </label>
            <input
              name="senha"
              value={formData.senha}
              onInput={handleInputChange}
              type="password"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md transition-colors"
              placeholder={passwordPlaceholder || "Senha"}
              style={{ color: inputsTextColor, borderColor: inputsBorderColor }}
              required
            />
            <div style={{ minHeight: "36px", marginTop: "4px" }}>
              <p
                className={`text-xs transition-colors`}
                style={{ color: errors.senha ? "#ef4444" : inputsBellowTextColor }}
              >
                {passwordText || 'Mínimo de 8 caracteres, contendo um número, uma letra maiúscula e uma letra minúscula'}
              </p>
            </div>
          </div>

          {/* Campo Confirmação de Senha */}
          <div className="mt-4 w-full max-w-[450px]">
            <label className="block text-sm font-semibold">
              {confirmPasswordCaption || 'Confirme sua senha'}
            </label>
            <input
              name="confirmacao_senha"
              value={formData.confirmacao_senha}
              onInput={handleInputChange}
              type="password"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md transition-colors"
              placeholder={confirmPasswordPlaceholder || "Confirme sua senha"}
              style={{ color: inputsTextColor, borderColor: inputsBorderColor }}
              required
            />
            <div style={{ minHeight: "20px", marginTop: "4px" }}>
              {errors.confirmacao_senha && (
                <p className="text-red-500 text-xs">
                  {errors.confirmacao_senha}
                </p>
              )}
            </div>
          </div>

          {/* Termos */}
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
                {agreeText1}
                <a
                  href={agreeLink1?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold"
                  style={{ color: linksColor }}
                >
                  {agreeLink1?.text}
                </a>
                {agreeText2}
                <a
                  href={agreeLink2?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold"
                  style={{ color: linksColor }}
                >
                  {agreeLink2?.text}
                </a>
                {agreeText3}
              </span>
            </label>
          </div>

          {/* Botão Submit */}
          <div className="w-full max-w-[450px] mt-6">
            <script
              type="module"
              dangerouslySetInnerHTML={{
                __html: useScript(() => {
                  globalThis.onSubmitFormRecaptcha = (token: string) => {
                    document.getElementById('createStoreFormRecaptcha')?.submit();
                  };
                })
              }}
            />
            <button
              id="input-createStoreForm"
              className={`w-full py-3 font-bold rounded-md g-recaptcha btn-captcha relative transition-all ${
                (!validated || isSubmitting) && 'opacity-50 cursor-not-allowed pointer-events-none'
              }`}
              type="submit"
              data-sitekey="6LdRdTErAAAAAJTiQW_hUzJxve5303X3lyy1UjA_"
              data-callback="onSubmitFormRecaptcha"
              style={{ background: buttonBackgroundColor, color: buttonTextColor }}
              disabled={!validated || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : (buttonText || 'Abrir minha loja agora')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoreForm;
