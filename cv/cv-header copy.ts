import { Context, Cursor, measureTextWidth } from "./util";
import { HEADER } from "./data";
import { FONT_SIZES } from "./style";
import { rgb } from "pdf-lib";
import * as fs from "fs";

const TITLE_GAP = 6
const INFO_GAP = 3

export async function drawHeader(ctx: Context, cursor: Cursor): Promise<{vSpaceConsumed: number}> {

  const {page} = ctx

  const imgBuffer = fs.readFileSync('./assets/mugshot.jpg');
  const img = await ctx.document.embedJpg(imgBuffer);

  const normalFont = ctx.fonts.light

  const heights = {
    title: FONT_SIZES.TITLE * 0.8,
    subtitle: FONT_SIZES.HEADING * 0.8,
    info: FONT_SIZES.TINY * 0.8
  }
  const infoHeight = heights.info * HEADER.info.length + INFO_GAP * (HEADER.info.length - 1)
  const titlesHeight = heights.title + TITLE_GAP + heights.subtitle
  const titlesOffset = (infoHeight - titlesHeight) / 2

  const imageSize = titlesHeight

  const textLeft = cursor.xStart + imageSize + TITLE_GAP

  page.drawImage(img, {
    x: cursor.xStart,
    y: cursor.yPos - titlesOffset - imageSize,
    width: imageSize, 
    height: imageSize
  });

  page.drawSvgPath(
    `M0 0 L0 2 L1 2 A1 1 0 0 1 1 0 A1 1 0 0 1 1 2 L2 2 L 2 0 Z`,
    {
      x: cursor.xStart,
      y: cursor.yPos - titlesOffset,
      scale: imageSize / 2,
      color: rgb(1, 1, 1),
      borderColor: rgb(1, 1, 1),
      borderWidth: 0.02
    }
  )

  page.drawText(HEADER.title, {
    x: textLeft,
    y: cursor.yPos - titlesOffset - heights.title,
    font: normalFont,
    size: FONT_SIZES.TITLE,
  });

  // page.drawRectangle({
  //   x: textLeft,
  //   y: cursor.yPos - titlesOffset - heights.title,
  //   width: 50, 
  //   height: heights.title,
  //   borderColor: rgb(1, 0, 0),
  //   borderWidth: 1
  // })

  page.drawText(HEADER.subtitle, {
    x: textLeft,
    y: cursor.yPos - titlesOffset - heights.title - TITLE_GAP - heights.subtitle,
    font: normalFont,
    size: FONT_SIZES.HEADING,
  });

  // page.drawRectangle({
  //   x: textLeft,
  //   y: cursor.yPos - titlesOffset - heights.title - TITLE_GAP - heights.subtitle,
  //   width: 50, 
  //   height: heights.subtitle,
  //   borderColor: rgb(1, 0, 0),
  //   borderWidth: 1
  // })

  // let iPos = cursor.yPos
  // HEADER.info.forEach(info => {
  //   const infoWidth = measureTextWidth(info, normalFont, FONT_SIZES.TINY)
  //   page.drawText(info, {
  //     x: cursor.xStart + cursor.hWidth - infoWidth,
  //     y: iPos - FONT_SIZES.TINY,
  //     font: normalFont,
  //     size: FONT_SIZES.TINY,
  //   });
  //   iPos -= (FONT_SIZES.TINY + INFO_GAP)
  // })

  return {vSpaceConsumed: infoHeight}
}