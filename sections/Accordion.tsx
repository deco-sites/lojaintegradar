interface Props {
    questions?: Questions[]
    button?: {
        buttonText?: string;
        buttonLink?: string;
    }
}

interface Questions {
    question?: string;
    answer?: string;
}

function Accordion({ questions, button }: Props) {
    return (
        <div className="bg-base-300">
            <div className="join join-vertical w-full px-4 flex mx-auto xl:px-0 py-[60px] lg:py-40 max-w-[768px]">
                <div className="flex flex-col mb-12 md:mb-20">
                    <span className="text-primary-content text-[50px] md:text-[80px] font-normal mb-5 font-instrument max-w-[215px] md:max-w-[unset] text-center mx-auto">Perguntas frequentes</span>
                    <span className="text-center text-base md:text-[18px] text-primary-content max-w-[305px] md:max-w-[unset] mx-auto">Encontre respostas para suas dúvidas mais comuns aqui.</span>
                </div>
                {questions?.map((list, index) => (
                    <div className="collapse collapse-arrow join-item border-[#E8E8E8] border-b-[1px] border-solid">
                        <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
                        <div className="collapse-title text-primary-content text-base md:text-[18px] font-bold">{list.question}</div>
                        <div className="collapse-content">
                            <p className="text-primary-content text-sm md:text-base">{list.answer}</p>
                        </div>
                    </div>
                ))}
                <div className="flex flex-col gap-[40px] w-full justify-center !mt-12 lg:!mt-[81px]">
                    <span className="text-2xl font-semibold text-primary-content text-center">Ainda tem dúvidas?</span>
                    <button className="bg-primary-content w-full mx-auto rounded-lg text-center font-bold text-[18px] text-base-300 h-[48px] min-w-[169px] max-w-[169px]"><a href={button?.buttonLink}>{button?.buttonText}</a></button>
                </div>
            </div>
        </div>
    )
}

export default Accordion