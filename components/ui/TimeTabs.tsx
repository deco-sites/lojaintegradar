import { useScript } from "@deco/deco/hooks";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";


const onLoad = (rootId: string, interval: number) => {
    const parent = document.getElementById(rootId);
    const tabs = parent?.querySelectorAll(".collapse");

    let currentTab = 0;

    let intervalObj = setInterval(nextTab, interval * 1000);

    function changeToTab(index: number) {

        if (tabs) {
            const tab = tabs[index] as HTMLElement || undefined;
            tab.classList.remove("opacity-60");
            tabs.forEach((tab) => tab.removeAttribute("open"));
            tabs[index].setAttribute("open", "");
            //tab.focus({ preventScroll: true });
            const progressBar = tab.querySelector(".tabProgressBar") as HTMLElement || undefined;
            progressBar?.classList.add("animate-progress");

        }
    }

    changeToTab(currentTab);

    function nextTab() {
        if (tabs) {
            tabs[currentTab].querySelector(".tabProgressBar")?.classList.remove("animate-progress");
            tabs[currentTab].classList.add("opacity-60");
        }

        if (tabs) {
            if (currentTab == tabs.length - 1) currentTab = 0;
            else currentTab += 1;

            changeToTab(currentTab);
        }
    }

    tabs?.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs[currentTab].querySelector(".tabProgressBar")?.classList.remove("animate-progress");
            tabs[currentTab].classList.add("opacity-60");
            currentTab = index;
            clearInterval(intervalObj);
            intervalObj = setInterval(nextTab, (interval * 1000));
            changeToTab(index);
        })
    })
};

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface Tab {
    icon?: IImage;
    title?: RichText;
    contentText?: RichText;
}

export interface Props {
    tabs?: Tab[];
    interval?: number;
    /** @format color-input */
    progressBarColor?: string;
    /** @format color-input */
    progressBarBackgroundColor?: string;
}

export default function TimeTabs({ tabs, interval = 5, progressBarColor, progressBarBackgroundColor }: Props) {
    const id = useId();
    return <div id={id} class="mb-14">
        {tabs?.map((tab) => (<div
            className=" text-primary-content open collapse focus:outline-none rounded-none opacity-60"
        >
            <div className="collapse-title px-0 flex gap-4" id="collapseElement" >
                {tab.icon?.src && <Image
                    src={tab.icon.src}
                    alt={tab.icon.alt || "tab icon"}
                    width={tab.icon.width || 24}
                    height={tab.icon.height || 24}
                    class="self-start"
                />}
                <div class="text-xl" dangerouslySetInnerHTML={{ __html: tab.title || "" }} />
            </div>
            <div className="collapse-content px-0">
                <div class="text-base" dangerouslySetInnerHTML={{ __html: tab.contentText || "" }} />
                <div class="bg-secondary mt-6" style={{ background: progressBarBackgroundColor }}>
                    <div class="h-[1px] bg-primary tabProgressBar" style={{ animationDuration: interval + 's', background: progressBarColor }} />
                </div>
            </div>
        </div>))}
        <script
            type="module"
            dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, interval) }}
        />
    </div>
}