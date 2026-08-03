from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(r"C:\Users\shine\Documents\Portfolio Site\output\imagegen")
SOURCE = ROOT / "me-3d-transparent.png"
OUTPUT = ROOT / "me-3d-eyes-far-left-fixed.png"

# Iris centers in the untouched, centered-eye source.
IRISES = [
    (374, 420, 15),
    (509, 380, 15),
]
SHIFT = -9


def feathered_circle(cx: int, cy: int, radius: int, feather: float = 1.5):
    y, x = np.ogrid[:1448, :1086]
    distance = np.sqrt((x - cx) ** 2 + (y - cy) ** 2)
    return np.clip((radius + feather - distance) / feather, 0.0, 1.0)[..., None]


base = np.asarray(Image.open(SOURCE).convert("RGBA"), dtype=np.float32)
result = base.copy()

for cx, cy, radius in IRISES:
    # Remove the centered iris using nearby sclera sampled from its right side.
    fill = result.copy()
    sample_x = min(cx + radius + 5, result.shape[1] - 1)
    for y in range(cy - radius - 2, cy + radius + 3):
        fill[y, cx - radius - 2:cx + radius + 3] = result[y, sample_x]
    old_mask = feathered_circle(cx, cy, radius + 1, 2.0)
    result = result * (1.0 - old_mask) + fill * old_mask

    # Copy the original circular iris rigidly to the far-left position. This is
    # a translation, not a warp, so its geometry remains a true circle.
    shifted = np.roll(base, SHIFT, axis=1)
    new_mask = feathered_circle(cx + SHIFT, cy, radius, 1.25)
    result = result * (1.0 - new_mask) + shifted * new_mask

# Preserve the source alpha channel exactly.
result[..., 3] = base[..., 3]
Image.fromarray(np.clip(result, 0, 255).astype(np.uint8), "RGBA").save(OUTPUT)
print(f"Wrote {OUTPUT}")
