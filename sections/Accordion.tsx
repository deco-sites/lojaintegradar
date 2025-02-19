import FlexibleButtons from "site/islands/FlexibleButtons.tsx";
import { Button } from "site/types/types.ts";
interface Props {
    hideSection?: boolean;
    questions?: Questions[]
    buttons?: Button[]
}

interface Questions {
    /**
 * @format rich-text
 */
    question?: string;
    /**
 * @format rich-text
 */
    answer?: string;
}

function Accordion({ hideSection, questions, buttons }: Props) {
    if (hideSection) return <></>
    return (
        <div id="accordionSection" className="bg-base-300">
            <div className="join join-vertical w-full px-4 flex mx-auto xl:px-0 py-[60px] lg:py-40 max-w-[768px]">
                <div data-aos="zoom-in" className="flex flex-col mb-12 md:mb-20">
                    <span className="text-primary-content text-[50px] md:text-[80px] font-normal font-instrument max-w-[215px] md:max-w-[unset] text-center mx-auto">Perguntas frequentes</span>
                    <span className="text-center text-base md:text-[18px] text-primary-content max-w-[305px] md:max-w-[unset] mx-auto">Encontre respostas para suas dúvidas mais comuns aqui.</span>
                </div>
                {questions?.map((list, index) => (
                    <div data-aos="zoom-in" className="collapse collapse-arrow join-item border-bar">
                        <input type="radio" name="my-accordion-4" />
                        {list.question && <div className="collapse-title text-primary-content text-base md:text-[18px] font-bold lg:py-[20px]" dangerouslySetInnerHTML={{ __html: list.question }}
                        ></div>}
                        {list.answer && <div className="collapse-content">
                            <p className="text-primary-content text-sm md:text-base" dangerouslySetInnerHTML={{ __html: list.answer }}
                            ></p>
                        </div>}
                    </div>
                ))}
                <div className="flex flex-col gap-[40px] w-full justify-center !mt-12 lg:!mt-[81px]">
                    <span className="text-2xl font-semibold text-primary-content text-center">Ainda tem dúvidas?</span>
                    <div class="flex items-center justify-center gap-4 flex-wrap">  {buttons?.map((button, index) => (
                        <FlexibleButtons key={index} {...button} />
                    ))}</div>
                </div>
            </div>
        </div>
    )
}

export default Accordion