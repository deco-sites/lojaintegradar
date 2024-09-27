import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "site/components/ui/AnimateOnShow.tsx";

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
        <div class="bg-base-300 py-[60px] px-4">
            <AnimateOnShow animation="animate-fade-right">
                <div class="customContainer flex flex-col lg:flex-row gap-10 justify-between items-center">
                    <span class="text-2xl text-primary-content font-light text-left">{title}</span>
                    <div class="flex flex-wrap gap-7">
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
            </AnimateOnShow>
        </div>
    )
}

export default Partners