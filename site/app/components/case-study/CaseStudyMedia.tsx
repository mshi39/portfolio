import Image from "next/image";
import { ImageLightbox } from "./ImageLightbox";

type ImageMediaProps = {
  src: string;
  kind: "image";
  alt: string;
  caption: string;
  width: number;
  height: number;
  expandable?: boolean;
};

type VideoMediaProps = {
  src: string;
  kind: "video";
  caption: string;
};

type Props = ImageMediaProps | VideoMediaProps;

export function CaseStudyMedia(props: Props) {
  return (
    <figure className={`case-media case-media-${props.kind}`} data-component="CaseStudyMedia">
      <div className="case-media-frame">
        {props.kind === "video" ? (
          <video src={props.src} autoPlay loop muted controls playsInline preload="metadata">
            Your browser does not support this video.
          </video>
        ) : (
          props.expandable ? (
            <ImageLightbox src={props.src} alt={props.alt} width={props.width} height={props.height}>
              <Image unoptimized src={props.src} alt={props.alt} width={props.width} height={props.height} />
            </ImageLightbox>
          ) : <Image unoptimized src={props.src} alt={props.alt} width={props.width} height={props.height} />
        )}
      </div>
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}
