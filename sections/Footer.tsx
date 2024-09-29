import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx";

interface Props {
  cards?: {
    icon?: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
    title?: Title;
    textContent?: TextContent;
    button?: {
      buttonText?: string;
      buttonUrl?: string;
    };
  }[];
  logoImage?: {
    image?: ImageWidget;
    width?: number;
    height?: number;
    extraText?: string;
  };
  newsletter?: {
    title?: string;
  };
  socials?: {
    image?: {
      image?: ImageWidget;
      width?: number;
      height?: number;
      link?: string;
    };
  }[];
  /**
   * @format rich-text
   */
  policies?: Policies[];
}

interface Title {
  /**
   * @format rich-text
   */
  desktop?: string;
  /**
   * @format rich-text
   */
  mobile?: string;
}

interface TextContent {
  /**
   * @format rich-text
   */
  desktop?: string;
  /**
   * @format rich-text
   */
  mobile?: string;
}

interface Policies {
  /**
   * @format rich-text
   */
  text?: string;
}

function Footer({ cards, logoImage, newsletter, socials, policies }: Props) {
  return (
    <div
      style="background-image: url('/bg-footer.png'); background-repeat: no-repeat; background-size: 100% 100%;"
      class="bg-base-300 pt-[93px] px-[10px] pb-[40px]"
    >
      <div class="customContainer">
        <ul data-aos="fade-up" class="flex flex-col gap-[60px] md:gap-[42px] md:flex-row w-full">
          {cards?.map((card) => (
            <li class="flex flex-col gap-[10px] bg-primary-content w-full max-w-[501px] rounded-[30px] py-[30px] justify-center pl-12 pr-10">
              <div class="flex items-center gap-[10px]">
                {" "}
                {card.icon?.image && (
                  <Image
                    src={card.icon?.image}
                    alt="Card footer icon"
                    height={card.icon?.height}
                    width={card.icon?.width || 27}
                    class=""
                  />
                )}
                {card.title?.desktop && (
                  <span
                    class="hidden lg:block"
                    dangerouslySetInnerHTML={{
                      __html: card.title?.desktop,
                    }}
                  ></span>
                )}
                {card.title?.mobile && (
                  <span
                    class="lg:hidden"
                    dangerouslySetInnerHTML={{
                      __html: card.title?.mobile,
                    }}
                  ></span>
                )}
              </div>

              {card.textContent?.desktop && (
                <span
                  class="hidden lg:block"
                  dangerouslySetInnerHTML={{
                    __html: card.textContent?.desktop,
                  }}
                ></span>
              )}
              {card.textContent?.mobile && (
                <span
                  class="lg:hidden"
                  dangerouslySetInnerHTML={{
                    __html: card.textContent?.mobile,
                  }}
                ></span>
              )}

              <button class="flex items-center justify-center gap-[10px] bg-[#371E55] rounded-lg w-full max-w-[176px]">
                <a
                  class="text-base text-primary-content py-[10px] flex items-center gap-[10px]"
                  href={card.button?.buttonUrl}
                >
                  {card.button?.buttonText}  <Icon class="" size={19} id="DiagonalArrow" strokeWidth={1} />
                </a>
              </button>
            </li>
          ))}
        </ul>
        <div data-aos="zoom-in" class="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:mt-20">
          <div class="flex flex-col gap-[21px] mb-[30px] mt-[60px] lg:flex-row lg:mb-0 lg:mt-0 lg:order-2 lg:w-[51%] lg:items-center">
            {newsletter?.title && (
              <span
                class="text-base font-semibold text-primary-content"
                dangerouslySetInnerHTML={{
                  __html: newsletter?.title,
                }}
              ></span>
            )}

            <div class="w-full relative max-w-[471px]">
              <input
                class="bg-primary-content px-[6px] w-full rounded-xl py-4"
                placeholder="Digite seu email aqui"
              />
              <button class="absolute top-[5px] right-2 flex items-center justify-center gap-[10px] bg-[#371E55] rounded-lg w-full max-w-[176px] text-base text-primary-content py-[10px]">
                Fazer parte
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-[15px] mb-[30px] lg:mb-0 lg:order-1">
            {logoImage?.image && (
              <Image
                src={logoImage?.image}
                alt="Footer Logo Image"
                height={logoImage?.height}
                width={logoImage?.width || 230}
                class=""
              />
            )}
            {logoImage?.extraText && (
              <span
                class="text-sm text-primary-content"
                dangerouslySetInnerHTML={{
                  __html: logoImage?.extraText,
                }}
              ></span>
            )}
          </div>

          <ul class="flex gap-5 mb-[40px] lg:mb-0 lg:order-3">
            {socials?.map((item) => (
              <li>
                <a href={item.image?.link}>
                  {" "}
                  {item.image?.image && (
                    <Image
                      src={item.image?.image}
                      alt="Footer Logo Image"
                      height={item.image?.height || 26}
                      width={item.image?.width || 26}
                      class=""
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul class="flex flex-wrap gap-5 colorFooterBorder border-t-[1px] border-solid pt-[30px] mt-10">
          {policies?.map((item) => {
            return (
              item.text && (
                <li
                  class="no-underline"
                  dangerouslySetInnerHTML={{
                    __html: item.text,
                  }}
                ></li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
