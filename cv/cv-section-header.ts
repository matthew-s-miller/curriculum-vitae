import { FONT_SIZES } from "./style";
import { Context, Cursor } from "./util";

const HEADING_GAP = 6

export function drawSectionHeader(text: string, ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  const headingHeight = FONT_SIZES.HEADING * 0.75

  ctx.page.drawText(text, {
    x: cursor.xStart,
    y: cursor.yPos - headingHeight - HEADING_GAP,
    font: ctx.fonts.normal,
    size: FONT_SIZES.HEADING,
  })

  return {vSpaceConsumed: headingHeight + HEADING_GAP * 2}
}