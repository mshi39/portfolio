import Image from "next/image";

type ImageMediaProps = {
  src: string;
  kind: "image";
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type VideoMediaProps = {
  src: string;
  kind: "video";
  caption: string;
};

type Props = ImageMediaProps | VideoMediaProps;

export function CaseStudyMedia(props: Props) {
  return (
    <figure className={`case-media case-media-${props.kind}`}>
      <div className="case-media-frame">
        {props.kind === "video" ? (
          <video src={props.src} controls playsInline preload="metadata">
            Your browser does not support this video.
          </video>
        ) : (
          <Image unoptimized src={props.src} alt={props.alt} width={props.width} height={props.height} />
        )}
      </div>
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}
