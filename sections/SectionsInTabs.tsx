import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import { Section } from "deco/blocks/section.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "@deco/deco/hooks";

const onClick = (rootId: string, tabIndex: number, tabs: SectionTab[]) => {
    const parent = document.getElementById(rootId) as HTMLElement;
    const tabsElements = parent.querySelectorAll(".sectionTab");
    const sections = parent.querySelectorAll(".sectionContainer");

    tabsElements.forEach((tabElement) => { 
        const element = tabElement as HTMLElement; 
        element.style.color = tabs[tabIndex].titleDisabledColor || "";
        element.style.background = tabs[tabIndex].titleDisabledBackgroundColor || ""; 
    });

    const selectedTab = tabsElements[tabIndex] as HTMLElement;
    selectedTab.style.color = tabs[tabIndex].titleColor || "";
    selectedTab.style.background = tabs[tabIndex].titleBackgroundColor || "";

    sections.forEach((section) => section.classList.add("hidden"));
    sections[tabIndex].classList.remove("hidden");
  };
  
/** @title {{title}} */
export interface SectionTab {
    title: string;
    /** @format color-input */
    titleColor?: string;
    /** @format color-input */
    titleDisabledColor?: string;
    /** @format color-input */
    titleBackgroundColor?: string;
    /** @format color-input */
    titleDisabledBackgroundColor?: string;
    titleFont?: string;
    section?: Section;
}

export interface Props {
    id?: string;
    sectionTabs?: SectionTab[];
}

export default function SectionInTabs({ id, sectionTabs = [] }: Props) {
    const rootId = useId();
    return <div id={id} class="pt-[71px] lg:pt-[120px]">
        <div id={rootId}>
            <ul class="flex justify-center flex-wrap px-7 gap-3 lg:gap-14 pb-7">
                {sectionTabs.map((tab, index) => {
                    const titleBackgroundColor = index == 0 ? tab.titleBackgroundColor : tab.titleDisabledBackgroundColor ;
                    const textColor = index == 0 ? tab.titleColor : tab.titleDisabledColor;
                    return <li>
                        <a 
                            hx-on:click={useScript(onClick, rootId, index, sectionTabs)} 
                            class={`sectionTab block cursor-pointer py-2.5 px-3.5 rounded-full font-normal text-lg lg:text-[32px]`}
                            style={{background: titleBackgroundColor, fontFamily: tab.titleFont, color: textColor}}
                        >
                            {tab.title}
                        </a>
                    </li>
                })}
            </ul>
            <div>
                {sectionTabs.map((sectionTab, index) => (
                    <div class={`${index && 'hidden'} sectionContainer`}>
                        {sectionTab.section && <sectionTab.section.Component  {...sectionTab.section.props} />}
                    </div>
                ))}
            </div>
        </div>
    </div>
}