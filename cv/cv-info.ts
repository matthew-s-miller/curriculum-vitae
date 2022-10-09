import { Context, Cursor, drawSectionHeader } from "./util";
import { MORE_INFO } from "./data";
import { FONT_SIZES } from "./style";

const INFO_GAP = 8

export function drawInfo(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  let {yPos} = cursor

  const { vSpaceConsumed } = drawSectionHeader('FIND ME ONLINE', ctx, cursor)

  yPos -= vSpaceConsumed

  let iPos = yPos
  MORE_INFO.forEach(info => {
    ctx.page.drawText(info, {
      x: cursor.xStart,
      y: iPos - FONT_SIZES.TINY,
      font: ctx.fonts.normal,
      size: FONT_SIZES.TINY,
    });
    iPos -= (FONT_SIZES.TINY + INFO_GAP)
  })

  return  {vSpaceConsumed: vSpaceConsumed + MORE_INFO.length * (FONT_SIZES.TINY + (INFO_GAP - 1)) }
}