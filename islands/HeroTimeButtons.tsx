export interface ButtonProps {
    type: "one" | "two" | "link";
    text?: string;
    link?: string;
    changeType?: boolean;
}

function HeroTimeButtons({ text = "", type, link, changeType }: ButtonProps) {

    const handleClick = () => {
        if (type === "one") {
            const getModalOne = document.getElementById("TimeModal");
            if (getModalOne) {
                getModalOne.classList.add("flex");
                getModalOne.classList.remove("hidden");
            }
        } else if (type === "two") {
            const getModalTwo = document.getElementById("SecondTimeModal");
            if (getModalTwo) {
                getModalTwo.classList.add("flex");
                getModalTwo.classList.remove("hidden");
            }
        } else if (link) {
            window.location.href = link;
        }
    };

    const buttonClass = changeType
        ? "background-df w-fit px-[30px] rounded-lg text-center font-bold text-[18px] h-[48px]"
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

export default HeroTimeButtons;
