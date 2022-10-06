import { PDFDocument } from "pdf-lib";
import { PAGE_SETUP } from "./data";
import { Context, Cursor } from "./util";
import { drawTitle } from "./cv-title";
import { drawCareer } from "./cv-career";
import fontkit from '@pdf-lib/fontkit';
import * as fs from "fs";


export async function createPDF() {
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit)
  const page = document.addPage([PAGE_SETUP.width, PAGE_SETUP.height]);

  const lightFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Light.ttf'))
  const normalFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Medium.ttf'))
  const boldFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Bold.ttf'))
  const fonts = {
    light: lightFont,
    normal: normalFont,
    bold: boldFont
  }

  const context: Context = {document, page, fonts}

  // keep within margins
  const cursor: Omit<Cursor, 'yPos'> = {
    xStart: PAGE_SETUP.hMargin,
    hWidth: PAGE_SETUP.width - PAGE_SETUP.hMargin * 2,
  }

  let yPos = PAGE_SETUP.height - PAGE_SETUP.vMargin

  yPos -= (await drawTitle(context, {...cursor, yPos})).vSpaceConsumed
  yPos -= drawCareer(context, {...cursor, xStart: cursor.xStart + cursor.hWidth / 3, yPos}).vSpaceConsumed

  fs.writeFileSync("cv.pdf", await document.save());
}

