import Image from "next/image";

type Props = {
  src: string;
  kind: "image" | "video";
  alt?: string;
  caption: string;
};

export function CaseStudyMedia({ src, kind, alt = "", caption }: Props) {
  return (
    <figure className={`case-media case-media-${kind}`}>
      <div className="case-media-frame">
        {kind === "video" ? (
          <video src={src} controls playsInline preload="metadata">
            Your browser does not support this video.
          </video>
        ) : (
          <Image unoptimized src={src} alt={alt} width={1500} height={900} />
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
