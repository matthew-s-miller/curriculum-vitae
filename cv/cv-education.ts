import { rgb } from "pdf-lib";
import { drawSectionHeader } from "./cv-section-header";
import { EDUCATION } from "./data";
import { FONT_SIZES, TIMELINE_WIDTH } from "./style";
import { Context, Cursor, measureTextWidth, roundedRectPath, wrapText } from "./util";

const GAP = 4
const PADDING = 4

export function drawEducation(ctx: Context, cursor: Cursor, yPosOld: number|undefined): {vSpaceConsumed: number} {

  let { yPos } = cursor

  let { vSpaceConsumed } = drawSectionHeader('EDUCATION', ctx, cursor)

  return drawEducationRow(EDUCATION, ctx, {...cursor, yPos: yPos - vSpaceConsumed}, yPosOld)
}


function drawEducationRow(row: typeof EDUCATION,
  ctx: Context,
  cursor: Cursor,
  yPosOld: number|undefined): {vSpaceConsumed: number} {
  const {page} = ctx
  const {normal, bold} = ctx.fonts

  let { yPos } = cursor

  page.drawCircle({
    x: cursor.xStart - 5,
    y: yPos - FONT_SIZES.NORMAL * 0.75,
    size: 1.5,
    color: rgb(0,0,0)
  })

  if (typeof yPosOld === 'number') {
    page.drawLine({
      start: {x: cursor.xStart - 5, y: yPosOld - FONT_SIZES.NORMAL * 0.75},
      end: {x: cursor.xStart - 5, y: yPos - FONT_SIZES.NORMAL * 0.75},
      thickness: 1,
      color: rgb(0.2, 0.2, 0.2)
    })
  }

  let vSpaceConsumed = 0

  page.drawText(row.period, {
    x: cursor.xStart,
    y: yPos - FONT_SIZES.NORMAL,
    font: normal,
    size: FONT_SIZES.NORMAL,
  });

  page.drawText(row.attainment, {
    x: cursor.xStart + TIMELINE_WIDTH,
    y: yPos - FONT_SIZES.NORMAL,
    font: normal,
    size: FONT_SIZES.NORMAL,
  });

  vSpaceConsumed += FONT_SIZES.NORMAL
  yPos -= FONT_SIZES.NORMAL

  page.drawText(row.institution, {
    x: cursor.xStart + TIMELINE_WIDTH,
    y: yPos - FONT_SIZES.NORMAL,
    font: bold,
    size: FONT_SIZES.NORMAL,
  });

  vSpaceConsumed += FONT_SIZES.NORMAL
  yPos -= FONT_SIZES.NORMAL;

  [EDUCATION.level].reduce((x: number, tech: string) => {
    const width = measureTextWidth(tech, normal, FONT_SIZES.NORMAL)

    page.drawSvgPath(roundedRectPath(width + 6, FONT_SIZES.NORMAL + 2, (FONT_SIZES.NORMAL + 2) / 2), {
      x: cursor.xStart + TIMELINE_WIDTH + x - 3,
      y: yPos - PADDING + FONT_SIZES.NORMAL * 0.75 + 1,
      // scale: imageSize / 2,
      color: rgb(0.9, 0.9, 1.0),
    })

    page.drawText(tech, {
      x: cursor.xStart + TIMELINE_WIDTH + x,
      y: yPos - PADDING,
      font: normal,
      size: FONT_SIZES.NORMAL,
      color: rgb(0.2, 0.2, 0.2)
    })
    

    return x + width + GAP + 4
  }, 0)

  vSpaceConsumed += FONT_SIZES.NORMAL + PADDING * 2

  return {vSpaceConsumed}

}