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


export function measureText(text: string, font: PDFFont, fontSize: number): {width: number, height: number} {
  return {
    width: font.widthOfTextAtSize(text, fontSize),
    height: font.heightAtSize(fontSize)
  }
}

export function wrapText(text: string, space: number, font: PDFFont, fontSize: number): {lines: string[], width: number, height: number} {
  const words = text.split(' ');
  let result: {line: string, width: number}[] = []

  let line = '';
  let width = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line ? line  + ' ' + words[n] : words[n];
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
    height: font.heightAtSize(fontSize)
  };
}