import { measureTextWidth, Context, Cursor, wrapText, roundedRectPath } from "./util";
import { CAREER } from "./data";
import { FONT_SIZES, TIMELINE_WIDTH } from "./style";
import { drawSectionHeader } from "./cv-section-header";
import { rgb } from "pdf-lib";

const GAP = 4
const PADDING = 4

export function drawCareer(ctx: Context, cursor: Cursor): {vSpaceConsumed: number, yPosOld: number} {

  const { vSpaceConsumed } = drawSectionHeader('MY CAREER', ctx, cursor)

  let yPos = cursor.yPos - vSpaceConsumed
  let yPosOld = undefined
  let totalSpaceConsumed = vSpaceConsumed
  for (let i = 0; i < CAREER.length; i++) {
    const {vSpaceConsumed} = drawCareerRow(CAREER[i], ctx, {...cursor, yPos}, yPosOld)
    yPosOld = yPos
    yPos -= vSpaceConsumed
    totalSpaceConsumed += vSpaceConsumed
  }

  return {vSpaceConsumed: totalSpaceConsumed, yPosOld: yPosOld!}
}

function drawCareerRow(row: typeof CAREER[number],
  ctx: Context,
  cursor: Cursor,
  yPosOld: number|undefined): {vSpaceConsumed: number} {
  const {page} = ctx
  const {normal, bold} = ctx.fonts

  let { yPos } = cursor

  page.drawCircle({
    x: cursor.xStart - 5,
    y: yPos - FONT_SIZES.TINY * 0.75,
    size: 1.5,
    color: rgb(0.2,0.2,0.2)
  })

  if (typeof yPosOld === 'number') {
    page.drawLine({
      start: {x: cursor.xStart - 5, y: yPosOld - FONT_SIZES.NORMAL * 0.75},
      end: {x: cursor.xStart - 5, y: yPos - FONT_SIZES.NORMAL * 0.75},
      thickness: 1,
      color: rgb(0.2, 0.2, 0.2)
    })
  }

  const widths = {
    role: measureTextWidth(row.role, normal, FONT_SIZES.NORMAL),
    company: measureTextWidth(row.company, bold, FONT_SIZES.NORMAL)
  }

  page.drawText(row.period, {
    x: cursor.xStart,
    y: yPos - FONT_SIZES.TINY,
    font: ctx.fonts.light,
    size: FONT_SIZES.TINY,
  });

  page.drawText(row.role, {
    x: cursor.xStart + TIMELINE_WIDTH,
    y: yPos - FONT_SIZES.NORMAL,
    font: normal,
    size: FONT_SIZES.NORMAL,
  });

  page.drawText(row.company, {
    x: cursor.xStart + TIMELINE_WIDTH + widths.role + 2,
    y: yPos - FONT_SIZES.NORMAL,
    font: bold,
    size: FONT_SIZES.NORMAL,
  });

  yPos -= FONT_SIZES.NORMAL

  const {lines} = wrapText(row.description, cursor.hWidth - TIMELINE_WIDTH, normal, FONT_SIZES.NORMAL)

  lines.forEach((line, i) => {
    page.drawText(line, {
      x: cursor.xStart + TIMELINE_WIDTH,
      y: yPos - FONT_SIZES.NORMAL - i * FONT_SIZES.NORMAL,
      font: normal,
      size: FONT_SIZES.NORMAL,
    })
  })

  let vSpaceConsumed = FONT_SIZES.NORMAL * (lines.length + 1)
  yPos -= vSpaceConsumed

  row.tech.reduce((x: number, tech: string) => {
    const width = measureTextWidth(tech, normal, FONT_SIZES.NORMAL)

    page.drawSvgPath(roundedRectPath(width + 6, FONT_SIZES.NORMAL + 2, (FONT_SIZES.NORMAL + 2) / 2), {
      x: cursor.xStart + TIMELINE_WIDTH + x - 3,
      y: yPos - PADDING + FONT_SIZES.NORMAL * 0.75 + 1,
      // scale: imageSize / 2,
      color: rgb(0.9, 0.9, 0.9),
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