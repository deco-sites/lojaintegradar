import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

const onLoad = () => {
  console.log("Window loaded");
};



export interface Props {
  title?: string;
}

export default function AutomaticCarousel({ title }: Props) {
  const rootId = useId();
  return <div class="h-[400vw] relative">
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
    />
    <div class="">
      <div class="carousel flex w-full">
        <div class="min-w-[942px] h-[729px] bg-green-500" />
        <div class="min-w-[942px] h-[729px] bg-blue-500" />
        <div class="min-w-[942px] h-[729px] bg-red-500" />
        <div class="min-w-[942px] h-[729px] bg-purple-500" />
      </div>
    </div>
  </div>
}