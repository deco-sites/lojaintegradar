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
            tab.focus();
            const progressBar = tab.querySelector(".tabProgressBar") as HTMLElement || undefined;
            progressBar?.classList.add("animate-progress");

        }
    }

    changeToTab(currentTab);

    function nextTab() {
        //if (tabs) tabs[currentTab].querySelector(".tabProgressBar")?.classList.remove("animate-progress")
        const allProgressBar = parent?.querySelectorAll(".tabProgressBar");
        if (allProgressBar) allProgressBar.forEach(bar => bar.classList.remove("animate-progress"));
        if (tabs) {
            if (currentTab == tabs.length - 1) currentTab = 0;
            else currentTab += 1;

            changeToTab(currentTab);
        }
    }

    tabs?.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            currentTab = index;
            tabs[index].classList.remove("animate-progress");
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
}

export default function TimeTabs({ tabs, interval = 5 }: Props) {
    const id = useId();
    return <div id={id} class="mb-14">
        {tabs?.map((tab, index) => (<div
            tabIndex={0}
            id={id + index}
            className=" text-primary-content open collapse focus:outline-none rounded-none"
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
                <div class="bg-gray-500 mt-6">
                    <div class="h-[1px]  bg-red-600 tabProgressBar" style={{ animationDuration: interval + 's' }} />
                </div>
            </div>
        </div>))}
        <script
            type="module"
            dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, interval) }}
        />
    </div>
}