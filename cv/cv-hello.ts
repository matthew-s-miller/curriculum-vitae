import { HELLO } from "./data";
import { FONT_SIZES } from "./style";
import { Context, Cursor, drawSectionHeader, wrapText, writeMultilineText } from "./util";

export function drawHello(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  // const hello = 'Hello!'
  // const helloWidth = measureTextWidth(hello, ctx.fonts.bold, FONT_SIZES.HEADING) + 6

  // const { lines } = wrapText(HELLO, cursor.hWidth, ctx.fonts.normal, FONT_SIZES.NORMAL)

  let { vSpaceConsumed } = drawSectionHeader('ABOUT ME', ctx, cursor)

  vSpaceConsumed += writeMultilineText(HELLO, ctx.page, {...cursor, yPos: cursor.yPos - vSpaceConsumed}, ctx.fonts.light, FONT_SIZES.NORMAL).vSpaceConsumed

  // ctx.page.drawText(hello, {
  //   x: cursor.xStart,
  //   y: cursor.yPos - FONT_SIZES.HEADING,
  //   font: ctx.fonts.bold,
  //   size: FONT_SIZES.HEADING,
  // })

  // for (let i = 0; i < lines.length; i++) {
  //   ctx.page.drawText(lines[i], {
  //     x: cursor.xStart, // + (i === 0 ? helloWidth : 0),
  //     y: cursor.yPos - vSpaceConsumed - FONT_SIZES.HEADING - i * FONT_SIZES.NORMAL,
  //     font: ctx.fonts.light,
  //     size: FONT_SIZES.NORMAL,
  //   })
  // }

  return { vSpaceConsumed }
}