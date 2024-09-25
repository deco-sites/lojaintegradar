import { useScript } from "deco/hooks/useScript.ts";
import type { ComponentChildren } from "preact";
import { useId } from "site/sdk/useId.ts";

const onLoad = (rootId: string, delay: number, animation: string) => {
    const element = document.getElementById(rootId) as HTMLElement;

    element.classList.add("opacity-0");

    document.addEventListener('DOMContentLoaded', () => {
        const fadeUp = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add(animation);
                        entry.target.classList.remove("opacity-0");
                    }, delay);
                }
            });
        });

        fadeUp.observe(element);
    });
}

export interface Props {
    divClass?: string;
    children: ComponentChildren;
    delay?: number;
    animation?: string;
    animationDuration?: string;
}

export default function FadeDown({ children, divClass = "", delay = 0, animationDuration, animation = 'animate-fade-down' }: Props) {
    const id = useId();
    return <div id={id} class={divClass} style={{ animationDuration }}>
        <script
            type="module"
            dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, delay, animation) }}
        />
        {children}
    </div>
}