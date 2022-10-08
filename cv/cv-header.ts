import { Context, Cursor, measureTextWidth } from "./util";
import { HEADER } from "./data";
import { FONT_SIZES } from "./style";
import { rgb } from "pdf-lib";
import * as fs from "fs";

const MUGSHOT_SIZE = 64
const TITLE_GAP = 0
const SUBTITLE_GAP = 16

const INFO_GAP = 8

export async function drawHeader(ctx: Context, cursor: Cursor): Promise<{vSpaceConsumed: number}> {

  let {yPos} = cursor

  const imgBuffer = fs.readFileSync('./assets/mugshot.jpg');
  const img = await ctx.document.embedJpg(imgBuffer);

  let vSpaceConsumed = 0

  const imageX = (cursor.hWidth - MUGSHOT_SIZE) / 2

  ctx.page.drawImage(img, {
    x: cursor.xStart + imageX,
    y: yPos - MUGSHOT_SIZE,
    width: MUGSHOT_SIZE, 
    height: MUGSHOT_SIZE
  });

  ctx.page.drawSvgPath(
    `M0 0 L0 2 L1 2 A1 1 0 0 1 1 0 A1 1 0 0 1 1 2 L2 2 L 2 0 Z`,
    {
      x: cursor.xStart + imageX,
      y: yPos,
      scale: MUGSHOT_SIZE / 2,
      color: rgb(1, 1, 1),
      borderColor: rgb(1, 1, 1),
      borderWidth: 0.1
    }
  )

  vSpaceConsumed += MUGSHOT_SIZE
  yPos -= MUGSHOT_SIZE

  HEADER.title.split(/\s+/).forEach(title => {
    vSpaceConsumed += TITLE_GAP
    yPos -= TITLE_GAP

    const titleWidth = measureTextWidth(title, ctx.fonts.light, FONT_SIZES.TITLE)
    const titleX = (cursor.hWidth - titleWidth) / 2

    ctx.page.drawText(title, {
      x: cursor.xStart + titleX,
      y: yPos - FONT_SIZES.TITLE,
      font: ctx.fonts.light,
      size: FONT_SIZES.TITLE,
    });

    vSpaceConsumed += FONT_SIZES.TITLE
    yPos -= FONT_SIZES.TITLE
  })

  vSpaceConsumed += SUBTITLE_GAP
  yPos -= SUBTITLE_GAP

  {
    const subtitleWidth = measureTextWidth(HEADER.subtitle, ctx.fonts.bold, FONT_SIZES.HEADING)
    const subtitleX = (cursor.hWidth - subtitleWidth) / 2

    ctx.page.drawText(HEADER.subtitle, {
      x: cursor.xStart + subtitleX,
      y: yPos - FONT_SIZES.HEADING,
      font: ctx.fonts.light,
      size: FONT_SIZES.HEADING,
    });

    vSpaceConsumed += FONT_SIZES.HEADING
    yPos -= FONT_SIZES.HEADING
  }

  vSpaceConsumed += SUBTITLE_GAP
  yPos -= SUBTITLE_GAP

  vSpaceConsumed += HEADER.info.reduce((vSpace, info) => {
    const infoWidth = measureTextWidth(info, ctx.fonts.normal, FONT_SIZES.TINY)
    ctx.page.drawText(info, {
      x: cursor.xStart,
      y: yPos - vSpace - FONT_SIZES.TINY,
      font: ctx.fonts.normal,
      size: FONT_SIZES.TINY,
    });
    return vSpace + FONT_SIZES.TINY + INFO_GAP
  }, 0)

  return  {vSpaceConsumed: vSpaceConsumed - INFO_GAP }
}