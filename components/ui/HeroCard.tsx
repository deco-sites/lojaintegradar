import Image from "apps/website/components/Image.tsx";
import type { Props } from "../../sections/HeroCard.tsx";
import FlexibleButtons from "site/islands/FlexibleButtons.tsx";

function HeroCard({
    cardBackgroundImage,
    secondImage,
    plan,
    title,
    subTitle,
    buttons,
    extraText,
}: Props) {

    return (
        <>
            <div data-aos="fade-up" class="customContainer">
                <div class="w-full relative max-w-[637px] lg:max-w-[1256px] mx-auto px-[10px]">
                    {cardBackgroundImage?.desktop && (
                        <Image
                            src={cardBackgroundImage?.desktop}
                            alt={"gradient background"}
                            height={cardBackgroundImage.heightDesktop || 579}
                            width={cardBackgroundImage.widthDesktop || 1256}
                            class="relative mx-auto hidden lg:block"
                            style={{ minHeight: cardBackgroundImage.heightDesktop || 579 }}
                        />
                    )}
                    {cardBackgroundImage?.mobile && (
                        <Image
                            src={cardBackgroundImage?.mobile}
                            alt={"card background"}
                            height={cardBackgroundImage.heightMobile || 637}
                            width={cardBackgroundImage.widthMobile || 420}
                            class="relative w-full mx-auto lg:hidden rounded-lg"
                            style={{ minHeight: cardBackgroundImage.heightMobile || 637, maxHeight: cardBackgroundImage.heightMobile || 637 }}
                        />
                    )}

                    {secondImage?.desktop && (
                        <Image
                            src={secondImage?.desktop}
                            alt={"gradient background"}
                            height={secondImage.heightDesktop || 680}
                            width={secondImage.widthDesktop || 500}
                            class="mx-auto hidden lg:block absolute bottom-0 right-0 min-w-[500px] min-h-[640px]"
                        />
                    )}
                    {secondImage?.mobile && (
                        <Image
                            src={secondImage?.mobile}
                            alt={"card background"}
                            height={secondImage.heightMobile || 226}
                            width={secondImage.widthMobile || 261}
                            class="lg:hidden absolute bottom-0 right-2/4 translate-x-1/2"
                            style={{ minHeight: secondImage.heightMobile || 226 }}
                        />
                    )}

                    <div class="flex flex-col w-[97%] lg:w-[unset] gap-6 lg:gap-[40px] absolute top-3 lg:top-[50px] left-2 lg:left-[50px] min-w-[280px] px-[10px] xl:px-0">
                        <div class="flex gap-1">
                            {plan.title && <span dangerouslySetInnerHTML={{ __html: plan.title }} class="w-full text-base font-semibold text-primary-content lg:hidden">

                            </span>
                            }
                            {plan.titleDesktop && <span dangerouslySetInnerHTML={{ __html: plan.titleDesktop }} class="hidden lg:block w-full text-base font-semibold text-primary-content">

                            </span>
                            }
                            {plan.discount && <span class="flex items-center bg-[#AA82C8] text-[#371E55] text-xs font-semibold px-[7px] py-[1px] rounded-[122px]">
                                {plan.discount}
                            </span>
                            }
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
                        <div class="flex items-center justify-center lg:justify-normal gap-4 flex-wrap">  {buttons?.map((button, index) => (
                            <FlexibleButtons key={index} {...button} />
                        ))}</div>
                        <span class="text-sm text-primary-content hidden lg:block">
                            {extraText}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroCard;
