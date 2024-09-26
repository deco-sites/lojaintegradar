import { useState } from "preact/hooks";
import TalkModal from "site/islands/TalkModal.tsx";

interface Props {
    initialButtons?: {
        text?: string;
        link?: string;
        changeType?: boolean;
        openForm?: boolean;
    }[];
}

function HeaderInitialButtons({ initialButtons }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = (button: any) => {
        if (button.openForm) {
            setIsModalOpen(true);
        } else {
            window.location.href = button.link;
        }
    };

    return (
        <>
            {initialButtons?.map((button) => (
                <button
                    class={
                        button.changeType
                            ? "background-df border-[1px] border-solid border-primary-content w-full min-w-[281px] rounded-lg text-center font-bold text-[18px] text-primary-content h-[48px]"
                            : "bg-primary-content w-full rounded-lg text-center font-bold text-[18px] text-base-300 h-[48px] min-w-[157px]"
                    }
                    onClick={() => handleButtonClick(button)}
                >
                    {button?.text}
                </button>
            ))}

            {isModalOpen && (
                <TalkModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
        </>
    );
}

export default HeaderInitialButtons;
