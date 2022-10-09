import { Context, Cursor } from "./util";
import { ABOUT } from "./data";
import { COLORS, FONT_SIZES } from "./style";

const GAP = 6

export function drawAbout(ctx: Context, cursor: Cursor) {

  let {yPos} = cursor

  // const { vSpaceConsumed } = drawSectionHeader('FIND ME ONLINE', ctx, cursor)

  ctx.page.drawLine({
    start: {x: cursor.xStart, y: yPos},
    end: {x: cursor.xStart + cursor.hWidth, y: yPos},
    color: COLORS.less_dark,
    thickness: 1,
    dashArray: [3, 4]
  })

  yPos -= GAP * 3

  ABOUT.forEach((line, i) => {
    ctx.page.drawText(line, {
      x: cursor.xStart,
      y: yPos - (FONT_SIZES.NORMAL + GAP) * i,
      font: ctx.fonts.light,
      size: FONT_SIZES.NORMAL,
    })
  })

  // writeMultilineText(ABOUT, ctx.page, {...cursor, yPos}, ctx.fonts.light, FONT_SIZES.NORMAL)
}