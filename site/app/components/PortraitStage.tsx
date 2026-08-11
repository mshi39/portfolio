import Image from "next/image";

type PortraitStageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  ariaLabel?: string;
};

export function PortraitStage({ src, alt, width, height, priority, ariaLabel = alt }: PortraitStageProps) {
  return <div className="portrait-stage" data-component="PortraitStage" aria-label={ariaLabel}>
    <span className="shape shape-star" aria-hidden="true">✦</span><span className="shape shape-dot" aria-hidden="true" /><span className="shape shape-ring" aria-hidden="true" />
    <Image unoptimized src={src} alt={alt} width={width} height={height} priority={priority} className="portrait" />
  </div>;
}
