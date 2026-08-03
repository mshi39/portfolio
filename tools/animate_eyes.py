from pathlib import Path

import numpy as np
from PIL import Image


SOURCE = Path(r"C:\Users\shine\Documents\Portfolio Site\output\imagegen\me-3d-transparent.png")
OUTPUT = Path(r"C:\Users\shine\Documents\Portfolio Site\output\imagegen\me-3d-eyes-left-to-right.png")

# Eye regions in the 1086 x 1448 source. The deformation fades to zero at
# each region's edge, keeping the eyelids and face perfectly stationary.
EYES = [
    (336, 390, 415, 447),
    (474, 351, 551, 410),
]


def shift_eye(image: np.ndarray, box: tuple[int, int, int, int], shift: float) -> None:
    x0, y0, x1, y1 = box
    patch = image[y0:y1, x0:x1].copy()
    height, width = patch.shape[:2]

    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    wx = np.sin(np.pi * xx / (width - 1)) ** 2
    wy = np.sin(np.pi * yy / (height - 1)) ** 4
    source_x = np.clip(xx - shift * wx * wy, 0, width - 1)

    left = np.floor(source_x).astype(np.int32)
    right = np.minimum(left + 1, width - 1)
    amount = (source_x - left)[..., None]
    rows = np.arange(height)[:, None]
    warped = patch[rows, left] * (1.0 - amount) + patch[rows, right] * amount
    image[y0:y1, x0:x1] = np.clip(warped, 0, 255).astype(np.uint8)


base = np.asarray(Image.open(SOURCE).convert("RGBA"), dtype=np.uint8)
frames: list[Image.Image] = []

# 41 keyframes cover t=0 through t=4. The midpoint (frame 20) is copied
# directly from the source so the exact supplied image is shown at 2 seconds.
for index in range(41):
    if index == 20:
        frame = base.copy()
    else:
        frame = base.copy()
        displacement = -11.0 + 22.0 * (index / 40.0)
        for eye in EYES:
            shift_eye(frame, eye, displacement)
    frames.append(Image.fromarray(frame, "RGBA"))

durations = [50] + [100] * 39 + [50]
frames[0].save(
    OUTPUT,
    save_all=True,
    append_images=frames[1:],
    duration=durations,
    loop=0,
    lossless=True,
    method=6,
)

print(f"Wrote {OUTPUT}")
print(f"Frames: {len(frames)}; duration: {sum(durations)} ms; size: {frames[0].size}")

