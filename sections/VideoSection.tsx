import type { ImageWidget, VideoWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";
import { Head } from "$fresh/runtime.ts";

export interface GTM {
  customSection?: string;
  customType?: string;
  customTitle?: string;
}

const onClick = (embed = false) => {
  const parent = event!.currentTarget as HTMLElement;
  const overlayDiv = parent.querySelector(".overlayDiv") as HTMLElement || undefined;
  const thumbnail = parent.querySelector(".videoThumbnail") as HTMLElement || undefined;
  if (embed) {
    const embedVideo = parent.querySelector("iframe") as HTMLIFrameElement;
    embedVideo.src += "&autoplay=1";
    embedVideo.classList.remove("hidden");

  } else {
    const video = parent.querySelector("video") as HTMLVideoElement;
    video.classList.remove("hidden");
    video.muted = false;
    video.currentTime = 0;
    video.play();
    video.controls = true;
  }
  thumbnail.classList.add("hidden");
  overlayDiv.classList.add("hidden");
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    onPlayerStateChange: (event: any) => void;
    YT: typeof YT;
  }

  var YT: {
    Player: new (elementId: string, options: any) => any;
    PlayerState: {
      UNSTARTED: number;
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };
  };
}

export {}; 

const onLoad = (iframeId: string, gtmProps?: GTM) => {
  console.log("Window loaded");
   // Carrega a API do YouTube
              const tag = document.createElement('script');
              tag.src = "https://www.youtube.com/iframe_api";
              document.head.appendChild(tag);

              
              let player: any;
              
              // Detecta mudanças de estado
              window.onPlayerStateChange = function (event:any) {
                if (event.data === YT.PlayerState.PAUSED) {
                  console.log("Vídeo pausado");
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                      'event': 'video_pause',
                      'custom_section': gtmProps?.customSection,
                      'custom_type': gtmProps?.customType,
                      'custom_title': gtmProps?.customTitle
                  });
                } else if (event.data === YT.PlayerState.PLAYING) {
                  console.log("Vídeo em reprodução");
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                      'event': 'video_play',
                      'custom_section': gtmProps?.customSection,
                      'custom_type': gtmProps?.customType,
                      'custom_title': gtmProps?.customTitle
                  });
                }
              }
              // Função chamada quando a API estiver pronta
              window.onYouTubeIframeAPIReady = function () {
                console.log("api ready");
                player = new YT.Player(iframeId, {
                  events: {
                    'onStateChange': window.onPlayerStateChange
                  }
                });
                let lastLoggedPercent = 0;
  
                const interval = setInterval(() => {
                  if (player && typeof player.getCurrentTime === "function") {
                    const currentTime = player.getCurrentTime();
                    const duration = player.getDuration();
                    if (duration > 0) {
                      const percent = Math.floor((currentTime / duration) * 100);
                      if (percent !== lastLoggedPercent) {
                        lastLoggedPercent = percent;
                        console.log(`Progresso: ${percent}%`);
                        window.dataLayer = window.dataLayer || [];
                          window.dataLayer.push({
                            'event': 'video_progress',
                            'custom_section': gtmProps?.customSection,
                            'custom_type': gtmProps?.customType,
                            'custom_title': `progresso ${percent}% - ${gtmProps?.customTitle}`
                        });
                      }
                    }
                  }
                }, 1000); // verifica a cada segundo
              }

};

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BackgroundMedia {
  /** @format color-input */
  color?: string;
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
  postition?: "top" | "bottom";
  customHeight?: string;
  lcp?: boolean;
}

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface SectionProps {
  paddingTop?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginBottom?: string;
}

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
  use?: "video" | "embed";
  playButton?: IImage;
  thumbnailImage?: IImage;
  gtmProps?: GTM;
}

export interface Props {
  hideSection?: boolean;
  title?: RichText;
  titleTextProps?: TextProps;
  video?: IVideo;
  bottomImage?: IImage;
  bottomText?: RichText;
  bottomTextProps?: TextProps;
  backgroundMedia?: BackgroundMedia;
  sectionProps?: SectionProps;
}

export default function ({ hideSection = false, title, titleTextProps, video, sectionProps, bottomImage, bottomText, bottomTextProps, backgroundMedia }: Props) {
  if (hideSection) return <></>
  const backgroundMediaPlacement = {
    "top": "object-top",
    "center": "",
    "bottom": "object-bottom"
  }
  return <div style={{ ...sectionProps }} class="relative">
    <div class="max-w-[1280px] mx-auto flex flex-col items-center px-7 lg:px-0">
      {title && <div dangerouslySetInnerHTML={{ __html: title }} class="w-full mb-10 lg:mb-[60px]" style={{ ...titleTextProps }} />}


      <div class="relative rounded-[33px] overflow-hidden cursor-pointer flex justify-center group" hx-on:click={useScript(onClick, video?.use == "embed")}
        style={{ width: video?.width, height: video?.height }}>
        {video?.use == "video" && video?.src && <video width={"100%"} height={"100%"} autoPlay playsInline muted loading="lazy" loop
          class="object-cover mx-auto hidden"
          style={{ width: video.width || "1280px", height: video.height || "720px" }}>
          <source src={video.src} type="video/mp4" />
        </video>}
        {video?.use == "embed" && <div>
          <iframe
            hx-on:load={useScript(onLoad, video.src || 'youtubePlayer')}
            id={video.src || 'youtubePlayer'}
            width={"100%"}
            height={"100%"}
            src={video?.src}
            frameborder="0"
            class={`${video.thumbnailImage?.src && 'hidden'}`}
            style={{ width: video.width || "1280px", height: video.height || "720px" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
          />
        </div>
        }

        {video?.thumbnailImage?.src && <Image
          src={video.thumbnailImage.src}
          alt={video.thumbnailImage.alt || "Video thumbnail"}
          width={video.thumbnailImage.width || 972}
          height={video.thumbnailImage.height || 546}
          class="z-10 absolute top-0 left-0 h-full w-full object-cover videoThumbnail"
        />}

        {video?.playButton?.src && <div class="absolute z-20 w-full h-full top-0 left-0 flex items-center justify-center overlayDiv">
          <Image
            src={video.playButton.src}
            alt={video.playButton.alt || "Play Button"}
            width={video.playButton.width || 130}
            height={video.playButton.height || 130}
            class="object-contain group-hover:scale-110 transition-transform"
          />
        </div>}
      </div>

      {bottomImage?.src && <Image
        src={bottomImage.src}
        width={bottomImage.width || 260}
        height={bottomImage.height || 88}
        alt={bottomImage.alt || "Bottom image"}
        class="mt-[60px]"
      />}

      {bottomText && <div dangerouslySetInnerHTML={{ __html: bottomText }} class="w-full mt-10 lg:mt-[60px]" style={{ ...bottomTextProps }} />}
    </div>

    {backgroundMedia?.color && <div style={{ background: backgroundMedia.color }} class="absolute top-0 left-0 h-full w-full -z-50" />}
    {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
      src={backgroundMedia.image.src}
      alt={backgroundMedia.image.alt || "background image"}
      width={backgroundMedia.image.width || 1277}
      height={backgroundMedia.image.height || 630}
      class={`absolute -z-40 top-0 left-0 h-full w-full object-cover ${backgroundMediaPlacement[backgroundMedia.postition || 'center']}`}
      style={{ height: backgroundMedia.customHeight }}
      loading={backgroundMedia.lcp ? "eager" : "lazy"}
    />}
    {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading={backgroundMedia.lcp ? "eager" : "lazy"} loop
      class={`object-cover absolute -z-40 top-0 left-0 h-full w-full ${backgroundMediaPlacement[backgroundMedia.postition || 'center']}`}
      style={{ height: backgroundMedia.customHeight }}>
      <source src={backgroundMedia.video} type="video/mp4" />
    </video>}
  </div>
}