import { PDFDocument, PDFFont, PDFPage } from "pdf-lib";

export interface Context {
  document: PDFDocument,
  page: PDFPage,
  fonts: {
    light: PDFFont,
    normal: PDFFont,
    bold: PDFFont
  }
}

export interface Cursor {
  yPos: number,
  xStart: number,
  hWidth: number
}

// export class Positioner {
//   private readonly xStart: number
//   constructor(public readonly pageWidth: number, public readonly innerWidth: number) {
//     this.xStart = (pageWidth - innerWidth) / 2
//   }
// }


/**
 * Measures how much width the given text consumes
 * 
 * Note that the font also provides a measure of height [ font.heightAtSize(fontSize) ], but it seems inaccurate
 * 
 * Best just to assume the font takes up the size of it's fontSize overall (including descent)
 *
 * @param text
 * @param font 
 * @param fontSize 
 * @returns 
 */
export function measureTextWidth(text: string, font: PDFFont, fontSize: number): number {
  return font.widthOfTextAtSize(text, fontSize)
}

export function wrapText(text: string, space: number, font: PDFFont, fontSize: number): {lines: string[], width: number} {
  const words = text.split(/\s+/);
  let result: {line: string, width: number}[] = []

  let line = '';
  let width = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line ? line + ' ' + words[n] : words[n];
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > space) {
      result.push({line, width})
      line = words[n];
      width = font.widthOfTextAtSize(words[n], fontSize)
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

export function roundedRectPath(width: number, height: number, borderRadius: number): string {
  return `M0 ${borderRadius} 
    A${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} 0 
    L${width - borderRadius} 0 
    A${borderRadius} ${borderRadius} 0 0 1 ${width} ${borderRadius}
    L${width} ${height - borderRadius}
    A${borderRadius} ${borderRadius} 0 0 1 ${width - borderRadius} ${height}
    L${borderRadius} ${height}
    A${borderRadius} ${borderRadius} 0 0 1 0 ${height - borderRadius} Z`.replace(/\s+/g,' ')
}