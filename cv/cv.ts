import { PAGE_SETUP } from "./style";
import { Context, Cursor } from "./util";
import { drawHeader } from "./cv-header";
import { drawCareer } from "./cv-career";
import { PageSizes, PDFDocument } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';
import * as fs from "fs";
import { drawHello } from "./cv-hello";
import { drawEducation } from "./cv-education";


export async function createPDF() {
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit)
  const page = document.addPage(PageSizes.A4);

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
    hWidth: page.getWidth() - PAGE_SETUP.hMargin * 2,
  }

  let yPos = page.getHeight() - PAGE_SETUP.vMargin

  // drawTest(context, {...cursor, yPos})

  yPos -= (await drawHeader(context, {...cursor, yPos})).vSpaceConsumed

  yPos -= PAGE_SETUP.hMargin

  {
    // column 1
    let yPos1 = yPos
    const cursor1 = {
      xStart: cursor.xStart,
      hWidth: cursor.hWidth / 3
    }
    yPos1 -= drawHello(context, {...cursor1, yPos: yPos1}).vSpaceConsumed

  }
  {
    // column 2
    let yPos2 = yPos
    const cursor2 = {
      xStart: cursor.xStart + cursor.hWidth / 3,
      hWidth: cursor.hWidth * 2 / 3
    }
    const {vSpaceConsumed, yPosOld } = drawCareer(context, {...cursor2, yPos: yPos2})
    yPos2 -= vSpaceConsumed
    
    yPos2 -= drawEducation(context, {...cursor2, yPos: yPos2}, yPosOld).vSpaceConsumed
  }
  
  fs.writeFileSync("cv.pdf", await document.save());
}

