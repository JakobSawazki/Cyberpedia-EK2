"""Prüft lokale HTML-Verweise, Seitentitel, Sprache und doppelte IDs."""

from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent


class PageChecker(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.references: list[str] = []
        self.language: str | None = None
        self.in_title = False
        self.title = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "html":
            self.language = values.get("lang")
        if values.get("id"):
            self.ids.append(values["id"] or "")
        if tag in {"a", "link"} and values.get("href"):
            self.references.append(values["href"] or "")
        if tag in {"img", "script", "source"}:
            reference = values.get("src") or values.get("srcset")
            if reference:
                self.references.append(reference.split()[0])
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title += data


def main() -> int:
    errors: list[str] = []
    pages = sorted(ROOT.glob("*.html"))

    for page in pages:
        checker = PageChecker()
        checker.feed(page.read_text(encoding="utf-8"))
        duplicate_ids = sorted({value for value in checker.ids if checker.ids.count(value) > 1})
        if duplicate_ids:
            errors.append(f"{page.name}: doppelte IDs {duplicate_ids}")
        if checker.language != "de":
            errors.append(f"{page.name}: Sprachattribut ist nicht 'de'")
        if not checker.title.strip():
            errors.append(f"{page.name}: Seitentitel fehlt")

        for reference in checker.references:
            if reference.startswith(("http://", "https://", "mailto:", "#", "data:")):
                continue
            local_path = reference.split("#", 1)[0].split("?", 1)[0]
            if local_path and not (ROOT / local_path).exists():
                errors.append(f"{page.name}: lokale Referenz fehlt: {reference}")

    print(f"Geprüfte HTML-Dateien: {len(pages)}")
    if errors:
        print(f"Fehler: {len(errors)}")
        print("\n".join(errors))
        return 1
    print("HTML- und Asset-Prüfung: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
