import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
    title?: string;
    /**
* @title Imagem mobile
* @description Adicionar/alterar tamanhos das imagens que aparecem no mobile.
*/
    images?: {
        image?: ImageWidget;
        alt?: string;
        width?: number;
        height?: number;
    }[]
    /**
   * @title Imagem desktop
   * @description Adicionar/alterar tamanhos das imagens que aparecem no desktop.
   */
    imagesDesktop?: {
        image?: ImageWidget;
        alt?: string;
        width?: number;
        height?: number;
    }[]
}

function Partners({ title, images, imagesDesktop }: Props) {
    return (
        <div class="bg-base-300 px-4">
            <div class="customContainer flex flex-col lg:flex-row gap-10 justify-between items-center lg:pt-[60px] pb-[60px] lg:pb-[124px]">
                <span data-aos="fade-down" class="text-2xl text-primary-content font-light text-left">{title}</span>
                <div data-aos="fade-down" class="flex flex-wrap gap-7">
                    {images?.map((img) => (
                        <Image
                            src={img.image || ""}
                            alt={img.alt || ""}
                            height={img.height || 25}
                            width={img.width || 103}
                            class="lg:hidden"
                        />
                    ))}
                    {imagesDesktop?.map((img) => (
                        <Image
                            src={img.image || ""}
                            alt={img.alt || ""}
                            height={img.height || 25}
                            width={img.width || 103}
                            class="hidden lg:block"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Partners