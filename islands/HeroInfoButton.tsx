function HeroInfoButton({ buttonText, buttonPlanId }) {

    const handleClick = () => {
        const getModal = document.getElementById("createStoreModal");

        if (getModal) {
            getModal.classList.add("flex");
            getModal.classList.remove("hidden");
            getModal.setAttribute("data-planId", buttonPlanId ?? '');
        }
    }

    return (
        <button onClick={handleClick} class="bg-primary-content py-3 w-full max-w-[156px] rounded-lg">
            <a class="text-[#003037] text-base text-center font-bold">{buttonText}</a>
        </button>
    )
}

export default HeroInfoButton