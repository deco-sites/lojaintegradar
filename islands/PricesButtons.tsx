interface Props {
    highlight?: boolean;
    buttonText?: string;
    planId?: string;
}

function PricesButtons({ highlight, buttonText, planId }: Props) {

    const handleClick = () => {
        const getModal = document.getElementById("createStoreModal");

        if (getModal) {
            getModal.classList.add("flex");
            getModal.classList.remove("hidden");
            getModal.setAttribute("data-planId", planId ?? '');
        }
    }

    return (
        <>
            <button
                onClick={handleClick}
                class={`w-full rounded-[6px] ${highlight
                    ? "bg-[#003037] text-primary-content"
                    : "bg-primary-content text-[#003037] text-[13px] font-bold"} py-[10px] mt-3`}
            >
                {buttonText ?? "Assinar Plano"}
            </button>
        </>
    )
}

export default PricesButtons