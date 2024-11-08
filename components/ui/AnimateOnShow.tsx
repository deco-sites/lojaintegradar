import type { ComponentChildren } from "preact";
import { useId } from "site/sdk/useId.ts";
import { JSX } from 'preact';
import { useScript } from "@deco/deco/hooks";
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
};
export interface Props {
    divClass?: string;
    children: ComponentChildren;
    delay?: number;
    animation?: string;
    animationDuration?: string;
    id?: string;
    style?: JSX.CSSProperties;
}
export default function FadeDown({ id, children, divClass = "", delay = 0, animationDuration, animation = 'animate-fade-down', style }: Props) {
    if (!id)
        id = useId();
    return <div id={id} class={divClass} style={{ animationDuration, ...style }}>
        <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, delay, animation) }}/>
        {children}
    </div>;
}
