import Image from "site/components/ui/SmartImage.tsx";
import { isWindows } from "std/_util/os.ts";
import { useScript } from "@deco/deco/hooks";
const onLoad = () => {
    // Pega a altura total do documento
    const documentHeight = document.documentElement.scrollHeight;
    // Aplica essa altura à div
    const GridOverlay = document.getElementById('GridOverlay') as HTMLElement;
    GridOverlay.style.height = documentHeight + 'px';
    const followingMouseImage = document.getElementById('followingMouseImage') as HTMLElement;
    document.addEventListener('mousemove', (evento) => {
        const x = evento.clientX; // Coordenada X do mouse
        const y = evento.clientY + globalThis.scrollY; // Coordenada Y do mouse
        followingMouseImage.style.left = `${x - 100}px`;
        followingMouseImage.style.top = `${y - 100}px`;
    });
};
export interface Props {
    /** @format color-input */
    linesColor?: string;
    /** @format color-input */
    mouseShineColor?: string;
}
export default function GridOverlay({ linesColor, mouseShineColor }: Props) {
    const SvgBackground = `<svg width="1440" height="5204" viewBox="0 0 1440 5204" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="1">
      <path opacity="1" d="M0 855L1440 854.999" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M0 1942L1440 1942" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M0 3029L1440 3029" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M0 4116L1440 4116" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M0 5203L1440 5203" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M1 6432L1.00004 -1394" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M329 6432L329 -1394" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M657 6432L657 -1394" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M985 6432L985 -1394" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
      <path opacity="1" d="M1313 6432L1313 -1394" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68" />
    </g>
  </svg>`;
    const SvgBackgroundMobile = `<svg xmlns="http://www.w3.org/2000/svg" width="349" height="7661" viewBox="0 0 349 7661" fill="none">
<g opacity="0.4">
<path opacity="0.5" d="M0 98.5003L1440 98.4994" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 218.501L1440 218.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 380.502L1440 380.501" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0.5 7826L0.500037 0.000740051" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M87.5 7826L87.5 0.000740051" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M174.5 7826L174.5 0.000740051" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M261.5 7826L261.5 0.000740051" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M348.5 7826L348.5 0.000740051" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 0.493317L1440 0.492428" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 330.494L1440 330.493" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 660.495L1440 660.494" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 990.496L1440 990.495" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 1320.5L1440 1320.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 1650.5L1440 1650.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 1980.5L1440 1980.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 2310.5L1440 2310.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 2640.5L1440 2640.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 2970.5L1440 2970.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 3300.5L1440 3300.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 3630.5L1440 3630.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 3960.5L1440 3960.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 4290.5L1440 4290.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 4620.51L1440 4620.5" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 4950.51L1440 4950.51" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 5280.51L1440 5280.51" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 5610.51L1440 5610.51" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 5940.51L1440 5940.51" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
<path opacity="0.5" d="M0 6270.51L1440 6270.51" stroke="#00363A" stroke-width="0.780437" stroke-dasharray="4.68 4.68"/>
</g>
</svg>
`;
    return <div id="GridOverlay" class="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center overflow-hidden">
    <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}/>
    <div class="h-full w-full flex justify-center relative" style={{ background: linesColor || 'rgba(0,0,0,0.3)' }}>
      <div id="followingMouseImage" class="bg-red-600 h-[200px] w-[200px] absolute rounded-full blur-xl" style={{ background: mouseShineColor || 'linear-gradient(white, rgb(0, 255, 193), rgb(0, 140, 232))' }}/>
    </div>
    <style dangerouslySetInnerHTML={{
            __html: `
        #GridOverlay {
          mask: url('data:image/svg+xml;utf8,${encodeURIComponent(SvgBackgroundMobile)}');
          mask-position: calc(50% + 0px) calc(0% - 0px);
        }

        @media (min-width: 1024px) {
          #GridOverlay {
            mask: url('data:image/svg+xml;utf8,${encodeURIComponent(SvgBackground)}');
            mask-position: calc(50% + 62px) calc(0% - 60px);
          }
        }
        `
        }}/>
  </div>;
}
