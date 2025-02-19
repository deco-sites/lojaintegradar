import HeroTab from "../islands/HeroTab.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Button } from "site/types/types.ts";

export interface Props {
  hideSection?: boolean;
  title?: Title;
  subTitle?: Subtitle;
  /**
   * @title Botões dos tabs
   */
  buttons?: Buttons[];
  finalButtons?: Button[];
}

interface Title {
  /**
* @format rich-text
*/
  desktop?: string;
  /**
* @format rich-text
*/
  mobile?: string;
}

interface Subtitle {
  /**
* @format rich-text
*/
  desktop?: string;
  /**
* @format rich-text
*/
  mobile?: string;
}

export interface Buttons {
  highlight?: boolean;
  /**
* @format rich-text
*/
  text?: string;
  /**
* @format rich-text
*/
  content?: string;
  /**
* @format rich-text
*/
  magicNumbers?: string;
  /**
* @format rich-text
*/
  secondMagicNumbers?: string;
  /**
* @format rich-text
*/
  magicNumbersMobile?: string;
  /**
* @format rich-text
*/
  secondMagicNumbersMobile?: string;
  image?: ImageWidget;
  imageMobile?: ImageWidget;
}

function HeroTabs(props: Props) {
  if (props.hideSection) return <></>
  return (
    <div id="heroTabSection" class="bg-base-300 px-[10px] py-[60px] lg:pb-[124px] lg:pt-[160px]">
      <HeroTab {...props} />
    </div>
  )
}

export default HeroTabs