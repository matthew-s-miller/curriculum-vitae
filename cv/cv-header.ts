import { Context, Cursor, measureTextWidth } from "./util";
import { HEADER } from "./data";
import { COLORS, FONT_SIZES } from "./style";
import { rgb } from "pdf-lib";
import { circleBorderPath, pinPath } from "./icons";
import * as fs from "fs";

const MUGSHOT_SIZE = 64
const ICON_SIZE = FONT_SIZES.NORMAL
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
    circleBorderPath(),
    {
      x: cursor.xStart + imageX,
      y: yPos,
      scale: MUGSHOT_SIZE / 2,
      color: COLORS.white,
      borderColor: COLORS.white,
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

  {
    // location
    const infoWidth = ICON_SIZE + 6 + measureTextWidth(HEADER.location, ctx.fonts.light, FONT_SIZES.TINY)

    ctx.page.drawSvgPath(pinPath(ICON_SIZE), {
      x: cursor.xStart + (cursor.hWidth - infoWidth) / 2,
      y: yPos,
      color: COLORS.less_dark,
      borderWidth: 0
    })

    ctx.page.drawText(HEADER.location, {
      x: cursor.xStart + (cursor.hWidth - infoWidth) / 2 + ICON_SIZE + 6,
      y: yPos - FONT_SIZES.TINY,
      font: ctx.fonts.light,
      size: FONT_SIZES.TINY,
    });

    vSpaceConsumed += FONT_SIZES.TINY + SUBTITLE_GAP
    yPos -= (FONT_SIZES.TINY + SUBTITLE_GAP)
  }

  {
    // contact
    const contact = HEADER.contact.join(' | ')
    const contactWidth = measureTextWidth(contact, ctx.fonts.light, FONT_SIZES.TINY)

    ctx.page.drawText(contact, {
      x: cursor.xStart,
      y: yPos - FONT_SIZES.TINY,
      font: ctx.fonts.light,
      size: FONT_SIZES.TINY,
    });

    vSpaceConsumed += FONT_SIZES.TINY
  }

  vSpaceConsumed += SUBTITLE_GAP

  return  {vSpaceConsumed: vSpaceConsumed - INFO_GAP }
}