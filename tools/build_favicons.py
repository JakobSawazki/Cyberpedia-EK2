"""Create the raster favicon variants from the generated master artwork."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SOURCE = ASSETS / "cyberpedia-favicon-source.png"


def resized(image: Image.Image, size: int) -> Image.Image:
    return image.resize((size, size), Image.Resampling.LANCZOS)


with Image.open(SOURCE) as master:
    master = master.convert("RGB")
    resized(master, 512).save(
        ASSETS / "cyberpedia-favicon.png", format="PNG", optimize=True
    )
    resized(master, 32).save(
        ASSETS / "cyberpedia-favicon-32.png", format="PNG", optimize=True
    )
    resized(master, 256).save(
        ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
