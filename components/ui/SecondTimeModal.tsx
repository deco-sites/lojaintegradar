import { HEROCSS } from "site/static/herocss.ts";
import CloseButtonModal from "./CloseButtonModal.tsx";

function SecondTimeModal() {

    return (
        <div id="SecondTimeModal" class="hidden w-screen heroCard fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
            <style dangerouslySetInnerHTML={{ __html: HEROCSS }}></style>
            <div class="bg-white p-6 rounded-lg relative w-full max-w-[501px] mx-3 md:mx-0 formContainer">
                <CloseButtonModal />
                {/* <script
                    charset="utf-8"
                    type="text/javascript"
                    src="//js.hsforms.net/forms/embed/v2.js"
                ></script>
                <script
                    charset="utf-8"
                    type="text/javascript"
                    src="/secondTimeModalForm.js"
                ></script> */}
            </div>
        </div>
    )
}

export default SecondTimeModal