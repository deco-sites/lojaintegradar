export const CSS = `

ul {
  position: relative;
}

.hs-form-private {
  position: relative;
  background-color: var(--color-primary-content); /* bg-primary-content */
  display: flex; /* flex */
  flex-wrap: wrap;
  justify-content: space-between; /* justify-between */
  padding-top: 0.375rem; /* py-1.5 */
  padding-bottom: 0.375rem; /* py-1.5 */
  padding-right: 0.375rem; /* pr-1.5 */
  font-size: 1rem; /* text-base */
  color: var(--color-primary); /* text-primary */
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));
  border-radius: 0 0.75rem 0.75rem 0.75rem; /* rounded-xl */
  box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
}

.hs-input {
  width: 50%;
}

.actions {
  height: 47px;
}

.hs-button {
    --tw-bg-opacity: 1;
    background-color: var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));
    --tw-text-opacity: 1;
    color: var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)));
    cursor:pointer;
    transition: transform 0.2s ease-in-out;
    height: 100%;
    padding: 0px 30px 0px 30px;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    border-radius: 8px;
}

.hs-button:hover {
  transform: scale(1.15);
}

.hs-input {
  padding-left: 0.5rem; /* 2 * 0.25rem */
  outline: none;
  font-size: 0.875rem; /* text-sm */
}

.hs-input:focus {
  outline: none;
}

.hs-error-msg {
  --tw-text-opacity: 1;
    color: var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)));
}

.submitted-message {
  text-align: center;
}

.talkToSpecialistForm .hs-form-private {
  justify-content: center;
  border: none;
  background-color: transparent;
  padding: 10px;
}

.talkToSpecialistForm .hs-form-field {
  width: 100%;
  margin-bottom: 30px;
}

.talkToSpecialistForm .input {
  display: flex;
  align-items: center;
  background-color: transparent;
  width: 100%;
  border-radius: 10px;
  border: 1px solid;
  --tw-border-opacity: 1;
    border-color: var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));
}

.tcoEmailForm form {
  --tw-bg-opacity: 1;
    background-color: var(--fallback-pc,oklch(var(--pc)/var(--tw-bg-opacity)));
  border: none;
  border-radius: 10px;
  flex-wrap: nowrap;
}

.tcoEmailForm .hs-input {
  width: 100%;
}

.tcoEmailForm .input {
  border-radius: 10px;
}


.tcoEmailForm .hs-error-msg {
  position: absolute;
  top: 5px;
  left: 0;
  width: 200%;
}

.tcoEmailForm .hs_error_rollup {
  display: none;
}

@media (min-width: 768px) {
  .hs-input {
    width: auto;
    flex-grow: 1;
    padding-left: 1.75rem; /* 7 * 0.25rem */
    font-size: 1rem; /* text-base */
  }
}

`;
