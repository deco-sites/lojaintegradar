import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "deco/hooks/useScript.ts";

const onChange = () => {
    const element = event!.currentTarget as HTMLInputElement;
    const arrow = element.parentElement?.querySelector(".collapse-arrow") as HTMLElement;
    
    const secondaryHeaderItems = element.parentElement?.querySelectorAll(".secondaryHeaderItem");

    if (element.checked) {
        arrow.style.transform = 'rotate(-180deg)';
        secondaryHeaderItems?.forEach((header) => header.classList.remove("hidden"));
    }
    else {
        arrow.style.transform = 'rotate(0deg)';
        secondaryHeaderItems?.forEach((header) => header.classList.add("hidden"));
    }
}

export interface IImage {
    src?: ImageWidget;
    alt?: string;
}

/** @title {{text}} */
export interface HeaderItem {
    text?: string;
    bold?: boolean;
    textPosition?: 'left' | 'center' | 'right';
}

/** @title {{topCaption}} {{text}} {{caption}} {{use}} */
export interface RowItem {
    text?: string;
    topCaption?: string;
    /** @title Bottom Caption */
    caption?: string;
    use?: 'no icon' | 'check icon' | 'cross icon';
    href?: string;
    textPosition?: 'left' | 'center' | 'right';
}

export interface Row {
    items: RowItem[];
}

export interface Collapse {
    headerItems: HeaderItem[];
    rows: Row[];
    checkIcon?: IImage;
    crossIcon?: IImage;
}

export interface Props {
    caption?: string;
    title?: string;
    collapses: Collapse[];
}

export default function CollapseGroup({ caption, title, collapses }: Props) {
    return <div class="mt-32 lg:px-24 text-primary leading-[120%] hidden md:block">
        <h3 class="text-center text-neutral-content text-2xl font-semibold">{caption}</h3>
        <h2 class="text-center text-2xl font-semibold mt-2.5 mb-5">{title}</h2>
        {collapses.map((collapse) => (<div className="collapse border border-base-200 rounded-[10px] mt-[30px]">
            <input type="checkbox" hx-on:change={useScript(onChange)}/>
            <div className="collapse-title text-xl font-medium flex px-7">
                {collapse.headerItems.map((headerItem) => (<div 
                    class={`text-center ${headerItem.textPosition == "left" && '!text-left'} ${headerItem.textPosition == "right" && '!text-right'} px-1 break-words min-w-0 leading-[120%] ${headerItem.bold ? 'text-lg lg:text-xl font-semibold' : 'text-base lg:text-lg font-normal secondaryHeaderItem hidden'}`} 
                    style={{ width: `${100 / collapse.headerItems.length}%` }}
                >
                    {headerItem.text}
                </div>))}

                <div class="absolute top-6 right-4 transition-all duration-300 collapse-arrow">
                <svg width="22" height="12" viewBox="0 0 22 12" class="text-primary fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5768 9.32973L12.0148 0.873093C11.8815 0.754835 11.7232 0.661005 11.5488 0.596982C11.3745 0.532958 11.1876 0.5 10.9988 0.5C10.81 0.5 10.6231 0.532958 10.4488 0.596982C10.2744 0.661005 10.1161 0.754835 9.98284 0.873093L0.420826 9.32973C0.151376 9.56803 -4.01512e-09 9.89124 0 10.2282C4.01512e-09 10.5653 0.151376 10.8885 0.420826 11.1268C0.690277 11.3651 1.05573 11.4989 1.43679 11.4989C1.81785 11.4989 2.1833 11.3651 2.45275 11.1268L11 3.56759L19.5472 11.1278C19.8167 11.3661 20.1821 11.5 20.5632 11.5C20.9443 11.5 21.3097 11.3661 21.5792 11.1278C21.8486 10.8895 22 10.5663 22 10.2293C22 9.89229 21.8486 9.56909 21.5792 9.33079L21.5768 9.32973Z" />
                </svg>

                </div>

            </div>
            <div className="collapse-content px-0">
                {collapse.rows.map((row) => (<div class="flex px-7 border-t border-t-base-200">
                    {row.items.map((rowItem) => (<div class="px-1 py-7 break-words flex flex-col items-center justify-center" style={{ width: `${100 / row.items.length}%` }}>
                        {rowItem.topCaption && <p class={`text-xs lg:text-sm font-normal w-full ${rowItem.textPosition == "center" && 'text-center'} ${rowItem.textPosition == "right" && 'text-right'} `}>{rowItem.topCaption}</p>}
                        {rowItem.use == 'check icon' && collapse.checkIcon && collapse.checkIcon.src && <Image height={18} width={18} src={collapse.checkIcon.src} alt={collapse.checkIcon.alt || "check icon"} />}
                        {rowItem.use == 'cross icon' && collapse.crossIcon && collapse.crossIcon.src && <Image height={18} width={18} src={collapse.crossIcon.src} alt={collapse.crossIcon.alt || "cross icon"} />}
                        {rowItem.text && <a class={`text-sm lg:text-base font-semibold w-full ${rowItem.textPosition == "center" && 'text-center'} ${rowItem.textPosition == "right" && 'text-right'} ${rowItem.href && 'underline'} `} href={rowItem.href} target="_blank">{rowItem.text}</a>}
                        {rowItem.caption && <p class={`text-xs lg:text-sm font-normal w-full ${!rowItem.text && 'mt-4'} ${rowItem.textPosition == "center" && 'text-center'} ${rowItem.textPosition == "right" && 'text-right'} `}>{rowItem.caption}</p>}
                    </div>))}
                </div>))}
            </div>
        </div>))}
    </div>
}