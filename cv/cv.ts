import { PAGE_SETUP } from "./style";
import { Context, Cursor } from "./util";
import { drawHeader } from "./cv-header";
import { drawCareer } from "./cv-career";
import { PageSizes, PDFDocument } from "pdf-lib";
import { drawHello } from "./cv-hello";
import { drawEducation } from "./cv-education";
import { drawSkills } from "./cv-skills";
import fontkit from '@pdf-lib/fontkit';
import * as fs from "fs";
import { drawInfo } from "./cv-info";

const COLUMN1_WIDTH = 180
const COLUMN_GAP = 20

export async function createPDF() {
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit)
  const page = document.addPage(PageSizes.A4);

  const lightFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Light.ttf'))
  const normalFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Regular.ttf'))
  const normalItalicFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Italic.ttf'))
  const boldFont = await document.embedFont(fs.readFileSync('assets/NotoSans-Bold.ttf'))
  const fonts = {
    light: lightFont,
    normal: normalFont,
    normalItalic: normalItalicFont,
    bold: boldFont
  }

  const context: Context = {document, page, fonts}

  // keep within margins
  const cursor: Omit<Cursor, 'yPos'> = {
    xStart: PAGE_SETUP.hMargin,
    hWidth: page.getWidth() - PAGE_SETUP.hMargin * 2,
  }

  let yPos = page.getHeight() - PAGE_SETUP.vMargin

  renderColumn1(context, {...cursor, hWidth: COLUMN1_WIDTH, yPos})
  renderColumn2(context, {...cursor, xStart: cursor.xStart + COLUMN1_WIDTH + COLUMN_GAP, hWidth: cursor.hWidth - COLUMN1_WIDTH - COLUMN_GAP, yPos})

  fs.writeFileSync("cv.pdf", await document.save());
}

async function renderColumn1(context: Context, cursor: Cursor) {
  let {yPos} = cursor

  yPos -= (await drawHeader(context, {...cursor, yPos})).vSpaceConsumed

  yPos -= drawHello(context, {...cursor, yPos}).vSpaceConsumed
  yPos -= drawSkills(context, {...cursor, yPos}).vSpaceConsumed
  yPos -= drawInfo(context, {...cursor, yPos}).vSpaceConsumed
}

function renderColumn2(context: Context, cursor: Cursor) {
  let {yPos} = cursor

  yPos -= 20
  yPos -= drawCareer(context, {...cursor,  yPos}).vSpaceConsumed
  yPos -= 20
  yPos -= drawEducation(context, {...cursor, yPos}).vSpaceConsumed
}

