"use client";

import Image from "next/image";
import { type ReactNode, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: ReactNode;
};

export function ImageLightbox({ src, alt, width, height, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function closeOnBackdrop(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  return <div className="image-lightbox" data-component="ImageLightbox">
    <button className="image-lightbox-trigger" type="button" aria-label={`Enlarge image: ${alt}`} onClick={() => dialogRef.current?.showModal()}>
      {children}
    </button>
    <dialog ref={dialogRef} className="image-lightbox-dialog" aria-label="Expanded image" onClick={closeOnBackdrop} onKeyDown={(event) => {
      if (event.key === "Escape") event.currentTarget.close();
    }}>
      <button className="image-lightbox-close" type="button" aria-label="Close image" onClick={() => dialogRef.current?.close()}>×</button>
      <Image unoptimized src={src} alt={alt} width={width} height={height} />
    </dialog>
  </div>;
}
