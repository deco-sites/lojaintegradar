import { useState, useEffect, useCallback } from "preact/hooks";
import { CreateStoreFormProps } from "../../sections/CreateStoreHero.tsx"
import { useId } from "site/sdk/useId.ts";

declare global {
    interface Window {
        grecaptcha: any;
    }
}

const CreateStoreForm = ({ planoId, periodo, backgroundColor, buttonText, agreeText1, agreeLink1, agreeLink2, agreeText2, agreeText3, nameCaption, namePlaceholder, passwordCaption, passwordPlaceholder, passwordText, confirmPasswordCaption, confirmPasswordPlaceholder, emailCaption, emailPlaceholder, inputsLabelColor, inputsTextColor, inputsBorderColor, inputsBellowTextColor, linksColor, buttonBackgroundColor, buttonTextColor }: CreateStoreFormProps) => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacao_senha: "",
    });

    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacao_senha: "",
    });

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute('6LfheeYUAAAAAI0qgRFQjLgyj3HmMp1TXLNK2R18', { action: 'submit' }).then((token: any) => {
                    const form = document.getElementById('createStoreFormRecaptcha') as HTMLFormElement | undefined;
                    form?.submit();
                });
            });
        }

    };

    return (
        <div id="createStoreFormDiv" className="inset-0 bg-opacity-50 items-center justify-center z-5">
            <div
                className="relative flex flex-col items-center p-12 w-full max-w-[460px] lg:mx-auto bg-white rounded-2xl shadow-md overflow-hidden text-[#371e56]"
                style={{ background: backgroundColor, color: inputsLabelColor }}
                id="createStoreFormContainer">

                <form
                    action={`https://app.lojaintegrada.com.br/public/assinar?periodo=${periodo || 'anual'}&plano_id=${planoId || '172'}`}
                    id="createStoreFormRecaptcha"
                    method="POST"
                    className="w-full flex flex-col items-center justify-center"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="gcaptcha_site" value="6LfheeYUAAAAAI0qgRFQjLgyj3HmMp1TXLNK2R18"></input>
                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold ">
                            {nameCaption || 'Nome'}
                        </label>
                        <input
                            name="nome"
                            value={formData.nome}
                            onInput={handleInputChange}
                            type="text"
                            className={`mt-1 w-full p-2 border text-black ${errors.nome ? "border-red-500" : "border-gray-300"
                                } rounded-md`}
                            placeholder={namePlaceholder || "Seu nome"}
                            style={{ color: inputsTextColor, borderColor: errors.nome ? "#ef4444 " : inputsBorderColor }}
                            required
                        />
                        {errors.nome && (
                            <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
                        )}
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold ">
                            {emailCaption || 'E-mail'}
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onInput={handleInputChange}
                            type="email"
                            className={`mt-1 w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-md`}
                            placeholder={emailPlaceholder || "Seu e-mail"}
                            style={{ color: inputsTextColor, borderColor: errors.email ? "#ef4444 " : inputsBorderColor }}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold ">
                            {passwordCaption || 'Senha'}
                        </label>
                        <input
                            name="senha"
                            value={formData.senha}
                            onInput={handleInputChange}
                            type="password"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            placeholder={passwordPlaceholder || "Senha"}
                            style={{ color: inputsTextColor, borderColor: inputsBorderColor }}
                            required
                        />
                        <p
                            className={`text-gray-500 text-xs mt-1 ${errors.senha && "text-red-500"}`}
                            style={{ color: errors.senha ? "#ef4444" : inputsBellowTextColor }}>
                            {passwordText || 'Mínimo de 8 caracteres, contendo um número, uma letra maiúscula e uma letra minúscula'}
                        </p>
                    </div>

                    <div className="mt-4 w-full max-w-[450px]">
                        <label className="block text-sm font-semibold ">
                            {confirmPasswordCaption || 'Confirme sua senha'}
                        </label>
                        <input
                            name="confirmacao_senha"
                            value={formData.confirmacao_senha}
                            onInput={handleInputChange}
                            type="password"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            placeholder={confirmPasswordPlaceholder || "Confirme sua senha"}
                            style={{ color: inputsTextColor, borderColor: inputsBorderColor }}
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
                            <input type="checkbox" className="form-checkbox" name="termos" required />
                            <span className="ml-2 text-xs text-gray-600">
                                {agreeText1}
                                <a href={agreeLink1?.href} target='_blank' className="text-[#0C9898] font-bold" style={{ color: linksColor }}>
                                    {agreeLink1?.text}
                                </a>
                                {agreeText2}
                                <a href={agreeLink2?.href} target='_blank' className="text-[#0C9898] font-bold" style={{ color: linksColor }}>
                                    {agreeLink2?.text}
                                </a>
                                {agreeText3}
                            </span>
                        </label>
                    </div>

                    <div className="w-full max-w-[450px] mt-6">
                        <script
                            src="https://www.google.com/recaptcha/api.js?v=1723036362098"
                            async
                            defer
                        ></script>
                        <script dangerouslySetInnerHTML={{
                            __html: `
                            function onSubmitFormRecaptcha(token) {
                                document.getElementById('createStoreFormRecaptcha').submit();
                            }

                            `}}></script>
                        <button
                            id="input-createStoreForm"
                            className="w-full py-3 bg-[#0c9898] text-white font-bold rounded-md g-recaptcha btn-captcha relative"
                            // type="submit"
                            // data-sitekey="6LfheeYUAAAAAI0qgRFQjLgyj3HmMp1TXLNK2R18"
                            // data-callback="onSubmitFormRecaptcha"
                            style={{ background: buttonBackgroundColor, color: buttonTextColor }}
                            onClick={handleSubmit}
                        >
                            {buttonText || 'Abrir minha loja agora'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStoreForm;
