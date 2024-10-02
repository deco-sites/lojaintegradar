interface ButtonProps {
    type: "createStoreForm" | "ctaForm" | "link";
    text?: string;
    planId?: string;
    link?: string;
    changeType?: boolean;
}

function FlexibleButton({ text = "", type, planId, link, changeType }: ButtonProps) {

    const handleClick = () => {
        if (type === "createStoreForm") {
            const getModal = document.getElementById("createStoreModal");
            if (getModal) {
                getModal.classList.add("flex");
                getModal.classList.remove("hidden");
                getModal.setAttribute("data-planId", planId ?? "");
            }
        } else if (type === "ctaForm") {
            const getTalkModal = document.getElementById("talkModal");
            if (getTalkModal) {
                getTalkModal.classList.add("flex");
                getTalkModal.classList.remove("hidden");
            }
        } else if (link) {
            window.location.href = link;
        }
    };

    const buttonClass = changeType
        ? "background-df border-[1px] border-solid border-primary-content w-fit px-[30px] rounded-lg text-center font-bold text-[18px] h-[48px]"
        : "bg-primary-content w-fit px-[30px] rounded-lg text-center font-bold text-[18px] h-[48px]";

    const textClass =
        changeType
            ? "text-primary-content font-bold text-[18px] text-center"
            : "text-[#003037] text-[18px] text-center font-bold";

    return (
        <>
            <button onClick={handleClick} class={buttonClass}>
                <a href={link && link}><span class={textClass}>{text}</span></a>
            </button>
        </>
    );
}

export default FlexibleButton;
