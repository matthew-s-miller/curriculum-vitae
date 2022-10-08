import { HELLO } from "./data";
import { FONT_SIZES } from "./style";
import { Context, Cursor, drawSectionHeader, wrapText } from "./util";

export function drawHello(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  const { lines } = wrapText(HELLO, cursor.hWidth, ctx.fonts.normal, FONT_SIZES.NORMAL)

  const { vSpaceConsumed } = drawSectionHeader('ABOUT ME', ctx, cursor)
  const yPos = cursor.yPos - vSpaceConsumed

  for (let i = 0; i < lines.length; i++) {
    ctx.page.drawText(lines[i], {
      x: cursor.xStart,
      y: yPos - FONT_SIZES.NORMAL - i * FONT_SIZES.NORMAL,
      font: ctx.fonts.light,
      size: FONT_SIZES.NORMAL,
    })
  }

  return {vSpaceConsumed: vSpaceConsumed + lines.length * FONT_SIZES.NORMAL}
}