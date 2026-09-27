import type { EmbedState } from "@/types/embed";

export interface ParsedEmbedField {
  name: string;
  value: string;
  inline: boolean;
}

export interface ParsedEmbed {
  name: string;
  title: string;
  description: string;
  color: string;
  fields: ParsedEmbedField[];
  footer: string;
  authorName: string;
  thumbnail: string;
  image: string;
  buttonsNote: string;
}

export interface ParseResult {
  embeds: ParsedEmbed[];
  parsedCount: number;
  skippedCount: number;
  skippedSections: string[];
}

export interface SerializeOptions {
  originalMarkdown?: string | undefined;
  colorFormat?: "0x" | "#" | undefined;
  includeRedesignSection?: boolean | undefined;
}

/**
 * Strips surrounding quotes or backticks and treats "none", "n/a", etc. as empty string.
 */
export function cleanValue(val: string): string {
  let cleaned = val.trim();
  if (
    (cleaned.startsWith("`") && cleaned.endsWith("`") && cleaned.length >= 2) ||
    (cleaned.startsWith('"') && cleaned.endsWith('"') && cleaned.length >= 2) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'") && cleaned.length >= 2)
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  if (/^none\.?$/i.test(cleaned) || /^n\/?a$/i.test(cleaned) || /^nil$/i.test(cleaned)) {
    return "";
  }
  return cleaned;
}

/**
 * Normalizes color strings:
 * - "0x9DD2A8" -> "#9DD2A8"
 * - "#9DD2A8" -> "#9DD2A8"
 * - "9DD2A8" -> "#9DD2A8"
 * - "none", "None", "" -> ""
 */
export function parseColor(rawColor: string): string {
  let val = rawColor.trim();
  val = val.replace(/^[`"']+|[`"']+$/g, "").trim();

  if (!val || /^none\.?$/i.test(val) || /^n\/?a$/i.test(val) || /^nil$/i.test(val)) {
    return "";
  }

  // Handle 0xHEX
  if (/^0x[0-9a-fA-F]{1,8}$/i.test(val)) {
    const hex = val.slice(2).toUpperCase();
    return `#${hex.padStart(6, "0")}`;
  }

  // Handle #HEX
  if (/^#[0-9a-fA-F]{3,8}$/i.test(val)) {
    return `#${val.slice(1).toUpperCase()}`;
  }

  // Handle raw hex without prefix (6 or 3 characters)
  if (/^[0-9a-fA-F]{6}$/i.test(val) || /^[0-9a-fA-F]{3}$/i.test(val)) {
    return `#${val.toUpperCase()}`;
  }

  // Handle decimal numbers (e.g. 10343080)
  if (/^\d{4,8}$/.test(val)) {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 0xffffff) {
      return `#${num.toString(16).padStart(6, "0").toUpperCase()}`;
    }
  }

  return val;
}

/**
 * Formats a color for markdown output:
 * Defaults to 0x format (e.g. 0x9DD2A8) or # format, or "None" if empty.
 */
export function formatColor(color: string, format: "0x" | "#" = "0x"): string {
  const trimmed = color.trim();
  if (!trimmed || /^none$/i.test(trimmed)) {
    return "None";
  }

  const hex = trimmed.replace(/^0x/i, "").replace(/^#/, "").toUpperCase();
  if (!hex) return "None";

  if (format === "0x") {
    return `0x${hex}`;
  }
  return `#${hex}`;
}

/**
 * Parses a single embed field line in various formats:
 * - `Name` → `Value` (inline)
 * - `Name` -> `Value`
 * - `Name`: `Value`
 * - Name → Value (inline)
 */
export function parseFieldLine(rawLine: string): ParsedEmbedField | null {
  const line = rawLine.trim();
  if (!line) return null;

  // Check inline marker: (inline) or [inline] or inline keyword
  const inline = /\((?:inline)\)|\[(?:inline)\]|\binline\b/i.test(line);

  const cleaned = line
    .replace(/\((?:inline)\)|\[(?:inline)\]|\binline\b/i, "")
    .replace(/^[-*+•]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .trim();

  if (!cleaned) return null;

  // Case 1: `Name` separator `Value` or `Name` separator Value
  const backtickMatch = cleaned.match(/^`([^`]+)`\s*(?:→|->|=>|—|:|-)\s*(.*)$/);
  if (backtickMatch) {
    const name = backtickMatch[1]?.trim() || "";
    let value = backtickMatch[2]?.trim() || "";
    if (value.startsWith("`") && value.endsWith("`") && value.length >= 2) {
      value = value.slice(1, -1).trim();
    }
    if (!name || /^none\.?$/i.test(name)) return null;
    return { name, value: cleanValue(value), inline };
  }

  // Case 2: Unquoted name with separator: Name → Value
  const separatorMatch = cleaned.match(/^([^→\->=>—:]+?)\s*(?:→|->|=>|—|:)\s*(.*)$/);
  if (separatorMatch) {
    let name = separatorMatch[1]?.trim() || "";
    let value = separatorMatch[2]?.trim() || "";
    if (name.startsWith("`") && name.endsWith("`") && name.length >= 2) {
      name = name.slice(1, -1).trim();
    }
    if (value.startsWith("`") && value.endsWith("`") && value.length >= 2) {
      value = value.slice(1, -1).trim();
    }
    if (!name || /^none\.?$/i.test(name)) return null;
    return { name, value: cleanValue(value), inline };
  }

  // Case 3: Just `Name` with no value
  const singleBacktick = cleaned.match(/^`([^`]+)`$/);
  if (singleBacktick) {
    const name = singleBacktick[1]?.trim() || "";
    if (!name || /^none\.?$/i.test(name)) return null;
    return { name, value: "", inline };
  }

  return null;
}

/**
 * Parses Thumbnail/Image string which may contain one or both assets.
 */
export function parseThumbnailAndImage(raw: string): { thumbnail: string; image: string } {
  const cleaned = cleanValue(raw);
  if (!cleaned) {
    return { thumbnail: "", image: "" };
  }

  let thumbnail = "";
  let image = "";

  const thumbMatch = cleaned.match(/thumbnail:\s*([^\s,|]+)/i);
  const imgMatch = cleaned.match(/image:\s*([^\s,|]+)/i);

  if (thumbMatch || imgMatch) {
    if (thumbMatch && thumbMatch[1]) thumbnail = cleanValue(thumbMatch[1]);
    if (imgMatch && imgMatch[1]) image = cleanValue(imgMatch[1]);
    return { thumbnail, image };
  }

  const urls = cleaned.match(/https?:\/\/[^\s,)]+/g) || [];
  if (urls.length >= 2) {
    thumbnail = urls[0] || "";
    image = urls[1] || "";
  } else if (urls.length === 1) {
    const url = urls[0] || "";
    if (/\bimage\b/i.test(cleaned)) {
      image = url;
    } else {
      thumbnail = url;
    }
  } else {
    if (/\bimage\b/i.test(cleaned)) {
      image = cleaned;
    } else {
      thumbnail = cleaned;
    }
  }

  return { thumbnail, image };
}

interface RawSection {
  name: string;
  level: number;
  headerLine: string;
  lines: string[];
}

/**
 * Splits markdown into sections starting with `## ` or `### `,
 * or raw numbered commands (e.g. `1. Coinflip`) / helper signatures (e.g. `embeds.success`),
 * ignoring `Your redesign:` headings.
 */
function splitSections(markdown: string): RawSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: RawSection[] = [];
  let currentSection: RawSection | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Ignore redesign fill-in blanks (with or without ###)
    if (/^(?:#{2,3}\s+)?your\s+redesign\b/i.test(trimmed)) {
      if (currentSection) {
        currentSection.lines.push(line);
      }
      continue;
    }

    // Skip section category banners that are purely navigation/dividers
    if (
      /^(?:GAMBLING|MONEY|BUSINESS|MARKET\s*\/\s*STOCKS\s*\/\s*STORE|Shared\s+helper\s+styles)$/i.test(
        trimmed,
      )
    ) {
      continue;
    }

    const mdMatch = trimmed.match(/^(#{2,3})\s+(.+)$/);
    const numMatch = trimmed.match(/^(\d+\.\s+.+)$/);
    const helperMatch = trimmed.match(/^(embeds\..*|interaction_embed\b.*|ConfirmView\b.*)$/i);

    if (mdMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        name: mdMatch[2]?.trim() || "",
        level: mdMatch[1]?.length || 2,
        headerLine: line,
        lines: [],
      };
    } else if (numMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        name: numMatch[1]?.trim() || "",
        level: 2,
        headerLine: line,
        lines: [],
      };
    } else if (helperMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        name: helperMatch[1]?.trim() || "",
        level: 2,
        headerLine: line,
        lines: [],
      };
    } else if (currentSection) {
      currentSection.lines.push(line);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Leniently parses an embed reference markdown document.
 * Returns parsed embeds along with parsed vs skipped counts and names of skipped sections.
 */
export function parseEmbedMarkdown(markdown: string): ParseResult {
  const sections = splitSections(markdown);
  const embeds: ParsedEmbed[] = [];
  const skippedSections: string[] = [];

  for (const section of sections) {
    const sectionLines = section.lines;

    // Find the **Current:** block start
    const currentBlockIdx = sectionLines.findIndex((line) =>
      /\*{0,2}current\*{0,2}\s*:/i.test(line),
    );

    // If no explicit Current: block, check if there are key-value lines directly in the section
    const startIdx = currentBlockIdx !== -1 ? currentBlockIdx + 1 : 0;

    let title = "";
    let description = "";
    let color = "";
    let authorName = "";
    let footer = "";
    let thumbnail = "";
    let image = "";
    let buttonsNote = "";
    const fields: ParsedEmbedField[] = [];
    let foundEmbedKey = false;

    // Check if the Current marker line itself has content after the colon (single-line style)
    let isSingleLineStyle = false;
    if (currentBlockIdx !== -1) {
      const currentLine = sectionLines[currentBlockIdx] ?? "";
      const trimmedLine = currentLine.trim();
      const currentMarkerMatch = trimmedLine.match(
        /^(?:[-*•]\s*)?\*{0,2}current\*{0,2}\s*:\s*(.*)$/i,
      );
      if (currentMarkerMatch && currentMarkerMatch[1]) {
        // Strip closing markdown asterisks and surrounding whitespace
        const afterColon = currentMarkerMatch[1].replace(/^\*+|\*+$/g, "").trim();
        if (afterColon.length > 0) {
          isSingleLineStyle = true;
          foundEmbedKey = true;

          // Extract color token (0xHEX or #HEX) with existing parseColor
          const colorMatch = afterColon.match(/`?(0x[0-9a-fA-F]{3,8}|#[0-9a-fA-F]{3,8})`?/i);
          if (colorMatch && colorMatch[1]) {
            color = parseColor(colorMatch[1]);
          }

          // Extract first Discord emote token (<:name:id> or <a:name:id>, strip backticks) and use as description
          const emoteMatch = afterColon.match(/`?(<a?:[a-zA-Z0-9_~-]+:\d+>)`?/);
          if (emoteMatch && emoteMatch[1]) {
            description = emoteMatch[1].replace(/`/g, "").trim();
          }

          if (!description) {
            const descPart = afterColon.replace(/^color\s+[^,;]+[,;]?\s*/i, "").trim();
            description = cleanValue(descPart);
          }

          // Leave title/fields/footer/author empty
        }
      }
    }

    if (!isSingleLineStyle) {
      let i = startIdx;
      let inFields = false;

      while (i < sectionLines.length) {
        const rawLine = sectionLines[i] ?? "";
        const line = rawLine.trim();

        // Stop current block if we hit a redesign header or next section heading or divider
        if (
          /^(?:#{2,3}\s+)?your\s+redesign\b/i.test(line) ||
          /^---+\s*$/.test(line) ||
          /^\d+\.\s+/i.test(line) ||
          /^embeds\..*$/i.test(line)
        ) {
          break;
        }

        // Split middot-separated key:value segments (e.g. Color: None · Footer: none)
        const segments = line.includes(" · ") ? line.split(" · ") : [line];

        for (const seg of segments) {
          const kv = seg.trim().match(/^(?:[-*•]\s+)?([^:=]+?)(?::|=)\s*(.*)$/);
          if (kv && kv[1]) {
            const rawKey = kv[1].trim().toLowerCase();
            const val = (kv[2] || "").trim();

            if (rawKey === "title") {
              title = cleanValue(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "description") {
              const descLines = [cleanValue(val)];
              while (
                i + 1 < sectionLines.length &&
                /^\s{2,}/.test(sectionLines[i + 1] ?? "") &&
                !/^(?:[-*•]\s+)?[A-Za-z0-9/ _-]+:/.test((sectionLines[i + 1] ?? "").trim()) &&
                !/^#{2,3}\s+/i.test(sectionLines[i + 1] ?? "")
              ) {
                i++;
                descLines.push((sectionLines[i] ?? "").trim());
              }
              description = cleanValue(descLines.filter(Boolean).join("\n"));
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "color" || rawKey === "colour" || rawKey === "accent") {
              color = parseColor(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "author" || rawKey === "author name") {
              authorName = cleanValue(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "footer") {
              footer = cleanValue(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "thumbnail/image") {
              const res = parseThumbnailAndImage(val);
              thumbnail = res.thumbnail;
              image = res.image;
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "thumbnail") {
              thumbnail = cleanValue(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey === "image") {
              image = cleanValue(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (
              rawKey === "buttons/view" ||
              rawKey === "buttons" ||
              rawKey === "view" ||
              rawKey === "button"
            ) {
              buttonsNote = cleanValue(val);
              foundEmbedKey = true;
              inFields = false;
            } else if (rawKey.startsWith("fields")) {
              foundEmbedKey = true;
              inFields = true;
              if (val && !/^none\.?$/i.test(val)) {
                const field = parseFieldLine(val);
                if (field) fields.push(field);
              }
            } else if (
              /^(win|loss|suspense|template|step|public|victim|disbursed|fully repaid|partial|active|defaulted|confirm|sold|empty|genuine|counterfeit|holdings|catalog|purchase|note)/i.test(
                rawKey,
              )
            ) {
              // Sub-state line e.g. "Win (~3334): no title; description ...; color 0x9DD2A8"
              foundEmbedKey = true;
              inFields = false;

              const isShowcase = /^(win|successful|holdings|genuine|fully repaid|disbursed|catalog|active|step 1)/i.test(
                rawKey,
              );

              const descMatch = val.match(/description\s+([^;]+(?:;(?!\s*color)[^;]+)*)/i);
              if (descMatch && descMatch[1] && (!description || isShowcase)) {
                description = cleanValue(descMatch[1]);
              }

              const titleMatch = val.match(/title\s+([^;]+)/i);
              if (titleMatch && titleMatch[1] && (!title || isShowcase)) {
                title = cleanValue(titleMatch[1]);
              }

              const colorMatch = val.match(/color\s+([^\s;]+)/i);
              if (colorMatch && colorMatch[1] && (!color || isShowcase)) {
                color = parseColor(colorMatch[1]);
              }

              const noteMatch = val.match(/note\s+([^;]+)/i);
              if (noteMatch && noteMatch[1] && (!description || isShowcase)) {
                description = cleanValue(noteMatch[1]);
              }
            }
          } else if (inFields) {
            const field = parseFieldLine(seg);
            if (field) fields.push(field);
          }
        }

        i++;
      }
    }

    // Has parseable embed data?
    // Must have at least found an embed key or non-empty embed content
    const hasData =
      foundEmbedKey ||
      Boolean(
        title ||
        description ||
        color ||
        fields.length > 0 ||
        footer ||
        authorName ||
        thumbnail ||
        image ||
        buttonsNote,
      );

    if (hasData) {
      embeds.push({
        name: section.name,
        title,
        description,
        color,
        fields,
        footer,
        authorName,
        thumbnail,
        image,
        buttonsNote,
      });
    } else {
      skippedSections.push(section.name);
    }
  }

  return {
    embeds,
    parsedCount: embeds.length,
    skippedCount: skippedSections.length,
    skippedSections,
  };
}

export const parseEmbeds = parseEmbedMarkdown;

/**
 * Formats a single embed's **Current:** block.
 */
function formatCurrentBlock(embed: ParsedEmbed, colorFormat: "0x" | "#" = "0x"): string {
  const lines: string[] = ["**Current:**"];

  lines.push(`- Title: ${embed.title ? embed.title : "None"}`);
  lines.push(`- Description: ${embed.description ? embed.description : "None"}`);
  lines.push(`- Color: ${formatColor(embed.color, colorFormat)}`);
  lines.push(`- Author: ${embed.authorName ? embed.authorName : "None"}`);

  let thumbImage = "None";
  if (embed.thumbnail && embed.image) {
    thumbImage = `Thumbnail: ${embed.thumbnail}, Image: ${embed.image}`;
  } else if (embed.thumbnail) {
    thumbImage = embed.thumbnail;
  } else if (embed.image) {
    thumbImage = `Image: ${embed.image}`;
  }
  lines.push(`- Thumbnail/Image: ${thumbImage}`);

  lines.push(`- Footer: ${embed.footer ? embed.footer : "None"}`);

  if (embed.fields.length > 0) {
    lines.push("- Fields:");
    for (const f of embed.fields) {
      const inlineTag = f.inline ? " (inline)" : "";
      lines.push(`  - \`${f.name}\` → \`${f.value}\`${inlineTag}`);
    }
  } else {
    lines.push("- Fields: None");
  }

  lines.push(`- Buttons/View: ${embed.buttonsNote ? embed.buttonsNote : "None"}`);

  return lines.join("\n");
}

/**
 * Updates existing markdown by replacing the **Current:** blocks of matching sections,
 * keeping redesign blocks and non-embed sections intact.
 */
export function updateEmbedMarkdown(
  originalMarkdown: string,
  embeds: ParsedEmbed[],
  options?: SerializeOptions,
): string {
  const colorFormat = options?.colorFormat ?? "0x";
  const embedMap = new Map<string, ParsedEmbed>();
  for (const embed of embeds) {
    embedMap.set(embed.name.trim().toLowerCase(), embed);
  }

  const lines = originalMarkdown.split(/\r?\n/);
  const outputLines: string[] = [];
  const handledEmbeds = new Set<string>();

  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();
    const mdHeading = trimmed.match(/^(#{2,3})\s+(.+)$/);
    const numHeading = trimmed.match(/^(\d+\.\s+.+)$/);
    const helperHeading = trimmed.match(/^(embeds\..*|interaction_embed\b.*|ConfirmView\b.*)$/i);
    const isRedesign = /^(?:#{2,3}\s+)?your\s+redesign\b/i.test(trimmed);

    let sectionName = "";
    if (!isRedesign) {
      if (mdHeading && mdHeading[2]) sectionName = mdHeading[2].trim();
      else if (numHeading && numHeading[1]) sectionName = numHeading[1].trim();
      else if (helperHeading && helperHeading[1]) sectionName = helperHeading[1].trim();
    }

    if (sectionName) {
      outputLines.push(line);
      const matchedEmbed = embedMap.get(sectionName.toLowerCase());

      if (matchedEmbed) {
        handledEmbeds.add(sectionName.toLowerCase());

        // Scan ahead to find **Current:** block in this section
        let j = i + 1;
        let foundCurrent = false;

        while (j < lines.length) {
          const nextLine = lines[j] ?? "";
          const nextTrimmed = nextLine.trim();
          const nextMd = nextTrimmed.match(/^(#{2,3})\s+(.+)$/);
          const nextNum = nextTrimmed.match(/^(\d+\.\s+.+)$/);
          const nextHelper = nextTrimmed.match(/^(embeds\..*|interaction_embed\b.*|ConfirmView\b.*)$/i);
          const nextIsRedesign = /^(?:#{2,3}\s+)?your\s+redesign\b/i.test(nextTrimmed);
          const isNextSection = !nextIsRedesign && (Boolean(nextMd) || Boolean(nextNum) || Boolean(nextHelper));

          if (isNextSection) {
            // Next section begins
            break;
          }

          if (/\*{0,2}current\*{0,2}\s*:/i.test(nextLine)) {
            foundCurrent = true;
            // Write out the updated **Current:** block
            outputLines.push("");
            outputLines.push(formatCurrentBlock(matchedEmbed, colorFormat));
            outputLines.push("");

            // Skip lines until redesign heading or next section or divider
            j++;
            while (j < lines.length) {
              const skipLine = lines[j] ?? "";
              const skipTrimmed = skipLine.trim();
              if (
                /^(?:#{2,3}\s+)?your\s+redesign\b/i.test(skipTrimmed) ||
                /^---+\s*$/.test(skipTrimmed) ||
                /^#{2,3}\s+/i.test(skipTrimmed) ||
                /^\d+\.\s+/i.test(skipTrimmed) ||
                /^embeds\..*$/i.test(skipTrimmed)
              ) {
                break;
              }
              j++;
            }
            break;
          } else {
            outputLines.push(nextLine);
            j++;
          }
        }

        if (!foundCurrent) {
          // If no **Current:** was in original section, insert it
          outputLines.push("");
          outputLines.push(formatCurrentBlock(matchedEmbed, colorFormat));
        }

        i = j;
        continue;
      }
    } else {
      outputLines.push(line);
    }

    i++;
  }

  // If any embeds were not found in the original document, append them
  for (const embed of embeds) {
    if (!handledEmbeds.has(embed.name.trim().toLowerCase())) {
      outputLines.push("");
      outputLines.push(`## ${embed.name}`);
      outputLines.push("");
      outputLines.push(formatCurrentBlock(embed, colorFormat));
      if (options?.includeRedesignSection !== false) {
        outputLines.push("");
        outputLines.push("### Your redesign:");
        outputLines.push("");
      }
    }
  }

  return outputLines.join("\n");
}

/**
 * Serializes embeds into reference markdown format.
 * If originalMarkdown is provided, updates its **Current:** blocks in place.
 */
export function serializeEmbeds(
  embeds: ParsedEmbed[],
  options?: SerializeOptions | string,
): string {
  const opts: SerializeOptions =
    typeof options === "string" ? { originalMarkdown: options } : options || {};

  if (opts.originalMarkdown) {
    return updateEmbedMarkdown(opts.originalMarkdown, embeds, opts);
  }

  const colorFormat = opts.colorFormat ?? "0x";
  const includeRedesign = opts.includeRedesignSection ?? true;
  const sections: string[] = [];

  for (const embed of embeds) {
    const parts: string[] = [`## ${embed.name}`, "", formatCurrentBlock(embed, colorFormat)];

    if (includeRedesign) {
      parts.push("");
      parts.push("### Your redesign:");
      parts.push("");
    }

    sections.push(parts.join("\n"));
  }

  return sections.join("\n\n");
}

export const serializeEmbedMarkdown = serializeEmbeds;

/**
 * Converts a ParsedEmbed to EmbedState for use in MessageBuilder and EmbedPreview.
 */
export function parsedEmbedToEmbedState(parsed: ParsedEmbed): EmbedState {
  return {
    title: parsed.title,
    description: parsed.description,
    color: parsed.color || "#8b8d92",
    authorName: parsed.authorName,
    authorIcon: "",
    authorUrl: "",
    thumbnail: parsed.thumbnail,
    image: parsed.image,
    footer: parsed.footer,
    footerIcon: "",
    timestamp: false,
    fields: parsed.fields.map((f, i) => ({ id: i + 1, ...f })),
  };
}

/**
 * Converts an EmbedState to ParsedEmbed.
 */
export function embedStateToParsedEmbed(
  embed: EmbedState,
  name = "Embed",
  buttonsNote = "",
): ParsedEmbed {
  return {
    name,
    title: embed.title,
    description: embed.description,
    color: embed.color,
    fields: embed.fields.map((f) => ({ name: f.name, value: f.value, inline: f.inline })),
    footer: embed.footer,
    authorName: embed.authorName,
    thumbnail: embed.thumbnail,
    image: embed.image,
    buttonsNote,
  };
}
