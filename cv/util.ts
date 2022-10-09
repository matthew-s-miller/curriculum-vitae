import { PDFDocument, PDFFont, PDFPage, rgb } from "pdf-lib";
import { COLORS, FONT_SIZES, TIMELINE_OFFSET } from "./style";

export interface Context {
  document: PDFDocument,
  page: PDFPage,
  fonts: {
    light: PDFFont,
    normal: PDFFont,
    normalItalic: PDFFont,
    bold: PDFFont
  }
}

export interface Cursor {
  yPos: number,
  xStart: number,
  hWidth: number
}

/**
 * Measures how much width the given text consumes
 * 
 * Note that the font also provides a measure of height [ font.heightAtSize(fontSize) ], but it seems inaccurate
 * 
 * Best just to assume the font takes up the size of it's fontSize overall (including descent)
 */
export function measureTextWidth(text: string, font: PDFFont, fontSize: number): number {
  return font.widthOfTextAtSize(text, fontSize)
}

/**
 * 
 * @param text 
 * @param page 
 * @param cursor 
 * @param font 
 * @param fontSize 
 * @returns 
 */
export function writeMultilineText(text: string, page: PDFPage, cursor: Cursor, font: PDFFont, fontSize: number): { vSpaceConsumed: number } {
  const {lines} = wrapText(text, cursor.hWidth, font, fontSize)

  lines.forEach((line, i) => {
    page.drawText(line, {
      x: cursor.xStart,
      y: cursor.yPos - (fontSize + 2) * (i + 1),
      font,
      size: fontSize,
    })
  })

  return { vSpaceConsumed: lines.length * (fontSize + 2) }
}


export function wrapText(text: string, space: number | readonly [number, number], font: PDFFont, fontSize: number): {lines: string[], width: number} {
  const words = text.split(/\s+/);
  let result: {line: string, width: number}[] = []

  let line = '';
  let width = 0;
  let availableSpace: number = Array.isArray(space) ? space[1] - space[0] : space as number

  for (let n = 0; n < words.length; n++) {
    const testLine = line ? line + ' ' + words[n] : words[n];
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > availableSpace) {
      result.push({line, width})
      line = words[n];
      width = font.widthOfTextAtSize(words[n], fontSize)
      availableSpace = Array.isArray(space) ? space[1] : space
    } else {
      line = testLine;
      width = testWidth
    }
  }
  
  result.push({line, width})
  return {
    lines: result.map(r => r.line),
    width: Math.max(...result.map(r => r.width)),
  };
}

const HEADING_GAP = 14

export function drawSectionHeader(text: string, ctx: Context, cursor: Cursor, yPosOld?: number): {vSpaceConsumed: number} {

  if (typeof yPosOld === 'number') {
    ctx.page.drawLine({
      start: {x: cursor.xStart + TIMELINE_OFFSET, y: yPosOld},
      end: {x: cursor.xStart + cursor.hWidth * 0.25, y: yPosOld},
      color: COLORS.neutral,
      thickness: 1,
    })
  }

  const headingHeight = FONT_SIZES.HEADING * 0.75

  ctx.page.drawText(text, {
    x: cursor.xStart,
    y: cursor.yPos - headingHeight - HEADING_GAP,
    font: ctx.fonts.normal,
    size: FONT_SIZES.HEADING,
  })

  return {vSpaceConsumed: headingHeight + HEADING_GAP * 2}
}
