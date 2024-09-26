import { HEROCSS } from "site/static/herocss.ts";

export interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}

function TalkModal({ isModalOpen, setIsModalOpen }: Props) {
    if (!isModalOpen) return null;

    return (
        <div class="heroCard fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <style dangerouslySetInnerHTML={{ __html: HEROCSS }}></style>
            <div class="bg-white p-6 rounded-lg relative w-full max-w-[501px] mx-3 md:mx-0">
                <button
                    class="absolute top-2 right-2 text-black"
                    onClick={() => setIsModalOpen(false)}
                >
                    X
                </button>
                <script
                    charset="utf-8"
                    type="text/javascript"
                    src="//js.hsforms.net/forms/embed/v2.js"
                ></script>
                <script
                    charset="utf-8"
                    type="text/javascript"
                    src="/heroCardForm.js"
                ></script>
            </div>
        </div>
    )
}

export default TalkModal