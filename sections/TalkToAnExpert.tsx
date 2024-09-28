import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Button {
  /**
   * @title Texto
   */
  label?: string;
  url?: string;
  /**
   * @title Cor do texto
   * @format color-input
   */
  textColor?: string;
  /**
   * @title Cor do fundo
   * @format color-input
   */
  backgroundColor?: string;
}

interface ImageProps {
  /**
   * @title Imagem
   */
  src?: ImageWidget;
  /**
   * @title Texto alternativo
   */
  alt?: string;
  /**
   * @title Largura
   */
  width?: number;
  /**
   * @title Altura
   */
  height?: number;
}

interface Props {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Cor do titulo
   * @format color-input
   */
  titleColor?: string;
  /**
   * @title Subtítulo
   * @format textarea
   */
  subtitle?: string;
  /**
   * @title Cor do subtítulo
   * @format color-input
   */
  subtitleColor?: string;
  /**
   * @title Botão
   */
  button?: Button;
  /**
   * @title Cor do fundo
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @title Imagem da Esquerda
   */
  leftImage?: ImageProps;
  /**
   * @title Imagem da Direita
   */
  rightImage?: ImageProps;
}

export default function TalkToAnExpert({
  title = "O Monstro da Indecisão ainda te deixa com medo de mudar?",
  titleColor = "#371E55",
  subtitle = "Então talvez esteja na hora de você tirar algumas dúvidas.",
  subtitleColor = "#371E55",
  button = {
    label: "Fale com um especialista",
    url: "#",
    textColor: "#FFFFFF",
    backgroundColor: "#371E55",
  },
  backgroundColor = "#ffc19f",
  leftImage = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
    alt: "Imagem da esquerda",
    width: 389,
    height: 310,
  },
  rightImage = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
    alt: "Imagem da direita",
    width: 315,
    height: 310,
  },
}: Props) {
  return (
    <div
      class="overflow-clip"
      style={{ backgroundColor }}
    >
      <div class="container flex items-center md:justify-center p-8 relative min-h-[310px]">
        {leftImage.src && (
          <Image
            src={leftImage.src}
            alt={leftImage.alt}
            width={leftImage.width || 389}
            height={leftImage.height}
            class="h-full w-auto object-contain absolute top-0 bottom-0 hidden md:block left-[-15%] xl:left-0"
          />
        )}
        <div class="md:text-center max-w-[261px] sm:max-w-[50%] md:max-w-[500px] z-[1]">
          <h2 style={{ color: titleColor }} class="text-2xl font-bold ">
            {title}
          </h2>
          <p style={{ color: subtitleColor }} class="text-lg">{subtitle}</p>
          {button.label && (
            <a
              href={button.url}
              class="px-5 flex justify-center items-center h-12 rounded-lg w-fit ml-0 md:ml-auto mx-auto mt-5 text-lg"
              style={{
                backgroundColor: button.backgroundColor,
                color: button.textColor,
              }}
            >
              {button.label}
            </a>
          )}
        </div>
        {rightImage.src && (
          <Image
            src={rightImage.src}
            alt={rightImage.alt}
            width={rightImage.width || 315}
            height={rightImage.height}
            class="h-full w-auto object-contain absolute top-0 bottom-0 right-0 md:right-[-15%] xl:right-0"
          />
        )}
      </div>
    </div>
  );
}
