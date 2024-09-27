import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import TalkModal from "site/components/ui/TalkModal.tsx";
import type { Props } from "../../sections/HeroCard.tsx";


function HeroCard({
    cardBackgroundImage,
    secondImage,
    plan,
    title,
    subTitle,
    button,
    extraText,
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div class="customContainer">
                <div class="w-full relative max-w-[420px] lg:max-w-[1256px] mx-auto px-[10px]">
                    {cardBackgroundImage?.desktop && (
                        <Image
                            src={cardBackgroundImage?.desktop}
                            alt={"gradient background"}
                            height={579}
                            width={1256}
                            class="relative mx-auto hidden lg:block"
                            style={{ minHeight: 579 }}
                        />
                    )}
                    {cardBackgroundImage?.mobile && (
                        <Image
                            src={cardBackgroundImage?.mobile}
                            alt={"card background"}
                            height={342}
                            width={420}
                            class="relative mx-auto lg:hidden rounded-lg"
                            style={{ minHeight: 353 }}
                        />
                    )}

                    {secondImage?.desktop && (
                        <Image
                            src={secondImage?.desktop}
                            alt={"gradient background"}
                            height={680}
                            width={500}
                            class="mx-auto hidden lg:block absolute bottom-0 right-0 w-[500px] h-[640px]"
                        />
                    )}
                    {secondImage?.mobile && (
                        <Image
                            src={secondImage?.mobile}
                            alt={"card background"}
                            height={500}
                            width={360}
                            class="lg:hidden absolute bottom-0 right-0 w-[250px] h-[300px] pr-[10px]"
                            style={{ minHeight: 300 }}
                        />
                    )}

                    <div class="flex flex-col gap-[10px] lg:gap-[40px] absolute top-3 lg:top-[50px] left-2 lg:left-[50px] min-w-[280px] px-[10px] xl:px-0">
                        <div class="flex gap-1">
                            <span class="text-base font-semibold text-primary-content">
                                {plan.title}
                            </span>
                            <span class="flex items-center bg-[#AA82C8] text-[#371E55] text-xs font-semibold px-[7px] py-[1px] rounded-[122px]">
                                {plan.discount}
                            </span>
                        </div>
                        {title?.desktop && (
                            <span
                                class="hidden lg:block font-instrument leading-[66px]"
                                dangerouslySetInnerHTML={{ __html: title?.desktop }}
                            ></span>
                        )}
                        {title?.mobile && (
                            <span
                                class="lg:hidden font-instrument leading-8"
                                dangerouslySetInnerHTML={{ __html: title?.mobile }}
                            ></span>
                        )}
                        {subTitle?.desktop && (
                            <span
                                class="hidden lg:block"
                                dangerouslySetInnerHTML={{ __html: subTitle?.desktop }}
                            ></span>
                        )}
                        {subTitle?.mobile && (
                            <span
                                class="lg:hidden"
                                dangerouslySetInnerHTML={{ __html: subTitle?.mobile }}
                            ></span>
                        )}
                        <button
                            class="rounded-lg bg-primary-content py-3 w-full min-w-[156px] max-w-[156px] lg:max-w-[225px]"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span class="text-base lg:text-[18px] font-bold text-center text-[#003037]">
                                {button?.buttonText}
                            </span>
                        </button>
                        <span class="text-sm text-primary-content hidden lg:block">
                            {extraText}
                        </span>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <TalkModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
        </>
    );
}

export default HeroCard;
