export const HEROCSS = `
.heroCard .hbspt-form form {
justify-content: center;
align-items: center;
    flex-direction: column;
    gap: 18px;
}

.heroCard .hs-form-field {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 375px;
}

.heroCard .input {
border: 1px solid #828CA0 !important;
border-radius: 8px;
max-width: 375px;
width: 100%;
}

.heroCard label {
color: #003037;
font-size: 16px;
font-weight: 700;
margin-bottom: 10px;
display: block;
width: 100%;
text-align: left;
}

.heroCard .hs-submit {
border-radius: 8px;
border: 1px solid #FFFFFF;
background: #003037;
font-size: 18px;
color: #FFFFFF;
font-weight: 700;
position: unset;
max-width: 156px;
margin-right: auto;
height: 48px;
display: flex;
justify-content: center;
align-items: center;
}

.heroCard input {
height: 100%;
}

.heroCard .hs-email .input {
    max-height: 48px;
    height: 48px;
    border-radius: 8px;
}

.heroCard .hs-email .input input {
max-height: 48px;
    height: 48px;
}

.hs_seu_negocio_tem_uma_loja_virtual_ .input{
    padding: 0;
    border: none !important;
}

.hs_seu_negocio_tem_uma_loja_virtual_ select{
    width: 100%;
    height: 100%;
    border: 1px solid #828CA0;
    border-radius: 8px;
}

@media screen and (min-width: 640px) {
.heroCard .hs-submit {
margin-left: 38px;
}
}

.heroCard .hs-submit input {
    font-size: 18px;
    color: #FFFFFF;
    font-weight: 700;
}

.heroCard .hs-submit .actions {
width: unset;
justify-content: center;
text-align: center;
}

.heroCard .hs-submit .actions::before {
display: none;
}
`