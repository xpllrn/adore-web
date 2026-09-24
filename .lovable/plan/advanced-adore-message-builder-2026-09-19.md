# Advanced Adore Message Builder

## Goal
Replace the current basic Embed page with a full Discord message studio inspired by the live Adore builder, while preserving this site's charcoal surfaces, smooth borders, floating navigation, and responsive spacing.

## Editor layout
- Use a focused two-column workspace on desktop and a stacked workspace on phones and tablets.
- Keep the editor and live Discord preview visible and easy to scan without introducing a footer or unrelated sections.
- Add an **Embed / Container** segmented mode selector, plus clear and undo-friendly controls.

## Shared message tools
- Editable message content above the rich message, with character counts.
- Live Discord-style preview using the Adore profile and sample variable values.
- Editable generated command code with **Copy** and **Load** actions.
- Searchable variable browser grouped into Server, Member, Channel, and Date & Time.
- Up to five configurable link buttons.
- Optional webhook URL panel, presented locally without sending data from this frontend-only version.

## Embed mode
- Title, description, accent colour, author name/icon/link, thumbnail, main image, footer text/icon, and timestamp.
- Add, edit, reorder, inline-toggle, and remove up to 25 fields.
- Preview all configured content and media safely as it changes.

## Container mode
- Accent colour plus ordered Components V2 blocks.
- Add, edit, reorder, and remove text, section, separator, image, and gallery blocks.
- Sections support either a thumbnail or link-button accessory.
- Gallery blocks support multiple image URLs and descriptions.
- Preview the container structure in a Discord-like message surface.

## Responsive behavior and validation
- Use compact controls and stacked panels on small phones, with no clipped labels or horizontal page overflow.
- Keep fixed actions and headings stable using shrink-safe grids.
- Verify editing, mode switching, adding/removing/reordering blocks, variable insertion, code copy/load, clear, and previews at phone, tablet, and desktop widths.
