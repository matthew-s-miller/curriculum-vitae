import { measureTextWidth, Context, Cursor } from "./util";
import { HEADER as CV_TITLE } from "./data";
import { FONT_SIZES } from "./style";
import * as fs from "fs";
import { rgb } from "pdf-lib";

const BLOCK_HEIGHTS = {
  TITLE: FONT_SIZES.TITLE,
  SUBTITLE: FONT_SIZES.HEADING + 6,
  INFO: FONT_SIZES.TINY + 6
}
const COLUMN_GAP = 6

export async function drawTitle(ctx: Context, cursor: Cursor): Promise<{vSpaceConsumed: number}> {

  const {document, page} = ctx
  const normalFont = ctx.fonts.light

  const imgBuffer = fs.readFileSync('./assets/mugshot.jpg');
  const img = await document.embedJpg(imgBuffer);

  const info = CV_TITLE.info.join(" | ")
  const titleWidth = measureTextWidth(CV_TITLE.title, normalFont, FONT_SIZES.TITLE)
  const subtitleWidth = measureTextWidth(CV_TITLE.subtitle, normalFont, FONT_SIZES.HEADING)
  const infoWidth = measureTextWidth(info, normalFont, FONT_SIZES.TINY)

  const headerHeight = BLOCK_HEIGHTS.TITLE + BLOCK_HEIGHTS.SUBTITLE + BLOCK_HEIGHTS.INFO
  const imageSize = headerHeight
  const textColumnWidth = Math.max(titleWidth, subtitleWidth, infoWidth)

  const headerLeft = cursor.xStart + (cursor.hWidth - (imageSize + COLUMN_GAP + textColumnWidth)) / 2
  console.log({pageWidth: ctx.page.getWidth(), textColumnWidth, headerLeft, imageSize})
  const textLeft = headerLeft + imageSize + COLUMN_GAP

  page.drawImage(img, {
    x: headerLeft,
    y: cursor.yPos - imageSize,
    width: imageSize, 
    height: imageSize
  });

  page.drawSvgPath(
    `M0 0 L0 2 L1 2 A1 1 0 0 1 1 0 A1 1 0 0 1 1 2 L2 2 L 2 0 Z`,
    {
      x: headerLeft,
      y: cursor.yPos,
      scale: imageSize / 2,
      color: rgb(1, 1, 1),
      borderColor: rgb(1, 1, 1),
      borderWidth: 0.02
    }
  )

  page.drawText(CV_TITLE.title, {
    x: textLeft,
    y: cursor.yPos - BLOCK_HEIGHTS.TITLE,
    font: normalFont,
    size: FONT_SIZES.TITLE,
  });

  page.drawText(CV_TITLE.subtitle, {
    x: textLeft,
    y: cursor.yPos - (BLOCK_HEIGHTS.TITLE + BLOCK_HEIGHTS.SUBTITLE),
    font: normalFont,
    size: FONT_SIZES.HEADING,
  });

  page.drawText(info, {
    x: textLeft,
    y: cursor.yPos - (BLOCK_HEIGHTS.TITLE + BLOCK_HEIGHTS.SUBTITLE + BLOCK_HEIGHTS.INFO),
    font: normalFont,
    size: FONT_SIZES.TINY,
  });

  // page.drawRectangle({
  //   x: cursor.xStart + 0.5,
  //   y: cursor.yPos - 96.5,
  //   width: titleWidth,
  //   height: 96,
  //   borderColor: rgb(0, 1, 0),
  //   borderWidth: 1
  // })

  return {vSpaceConsumed: headerHeight}

}