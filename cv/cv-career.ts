import { measureTextWidth, Context, Cursor, writeMultilineText, drawSectionHeader } from "./util";
import { CAREER } from "./data";
import { COLORS, FONT_SIZES, TIMELINE_OFFSET } from "./style";
import { roundedRectPath } from "./icons";

const DETAILS_MARGIN = 16
const TECH_SPACING = 4
const CHIP_PADDING = 5

export function drawCareer(ctx: Context, cursor: Cursor): {vSpaceConsumed: number, yPosOld: number} {

  let yPosOld: number = cursor.yPos
  const { vSpaceConsumed } = drawSectionHeader('MY CAREER', ctx, cursor, cursor.yPos)

  let yPos = cursor.yPos - vSpaceConsumed
  let totalSpaceConsumed = vSpaceConsumed
  for (let i = 0; i < CAREER.length; i++) {
    const {vSpaceConsumed} = drawCareerRow(CAREER[i], ctx, {...cursor, yPos}, i < 6, yPosOld)
    yPosOld = yPos
    yPos -= vSpaceConsumed
    totalSpaceConsumed += vSpaceConsumed
  }

  return {vSpaceConsumed: totalSpaceConsumed, yPosOld: yPosOld!}
}

function drawCareerRow(row: typeof CAREER[number],
  ctx: Context,
  cursor: Cursor,
  details: boolean,
  yPosOld: number|undefined): {vSpaceConsumed: number} {
  const {page} = ctx

  let { yPos } = cursor

  // draw the timeline
  if (typeof yPosOld === 'number') {
    page.drawLine({
      start: {x: cursor.xStart + TIMELINE_OFFSET, y: yPosOld},
      end: {x: cursor.xStart + TIMELINE_OFFSET, y: yPos - FONT_SIZES.NORMAL * 0.75},
      thickness: 1,
      color: COLORS.neutral
    })
  }

  page.drawCircle({
    x: cursor.xStart + TIMELINE_OFFSET,
    y: yPos - FONT_SIZES.TINY * 0.75,
    size: 1.5,
    color: COLORS.neutral
  })

  let vSpaceConsumed = 0

  page.drawText(row.role, {
    x: cursor.xStart,
    y: yPos - FONT_SIZES.NORMAL,
    font: ctx.fonts.bold,
    size: FONT_SIZES.NORMAL,
  });

  let hWidth = measureTextWidth(row.role, ctx.fonts.bold, FONT_SIZES.NORMAL)

  page.drawText(`| ${row.period}`, {
    x: cursor.xStart + hWidth + 4,
    y: yPos - FONT_SIZES.NORMAL, // align with company font
    font: ctx.fonts.light,
    size: FONT_SIZES.TINY,
  });

  hWidth += measureTextWidth(row.period, ctx.fonts.light, FONT_SIZES.TINY) + 16

  if (!details) {
    // show the company inline
    ctx.page.drawText(row.company, {
      x: cursor.xStart + hWidth,
      y: yPos - FONT_SIZES.NORMAL,
      font: ctx.fonts.normalItalic,
      size: FONT_SIZES.NORMAL,
    });

    hWidth += measureTextWidth(row.company, ctx.fonts.normalItalic, FONT_SIZES.NORMAL) + 10
  } else {
    hWidth += 4
  }

  appendTech(row.tech, ctx, {...cursor, yPos, xStart: cursor.xStart + hWidth})

  if (!details) {
    vSpaceConsumed += FONT_SIZES.NORMAL
    yPos -= FONT_SIZES.NORMAL
  }

  vSpaceConsumed += FONT_SIZES.NORMAL
  yPos -= FONT_SIZES.NORMAL

  if (details) {
    const vDetailsSpaceConsumed = drawDetails(row, ctx, {...cursor, yPos}).vSpaceConsumed
    vSpaceConsumed += vDetailsSpaceConsumed
    yPos -= vDetailsSpaceConsumed
  } else {
    vSpaceConsumed += 4
    yPos -= 4
  }

  return {vSpaceConsumed}
}

function drawDetails(row: typeof CAREER[number], ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {
  let vSpaceConsumed = DETAILS_MARGIN
  let yPos = cursor.yPos - DETAILS_MARGIN

  ctx.page.drawText(row.company, {
    x: cursor.xStart + DETAILS_MARGIN / 2,
    y: yPos - FONT_SIZES.NORMAL,
    font: ctx.fonts.normalItalic,
    size: FONT_SIZES.NORMAL,
  });

  vSpaceConsumed += FONT_SIZES.NORMAL
  yPos -= FONT_SIZES.NORMAL

  const linesConsumed = writeMultilineText(row.description, ctx.page, {yPos, xStart: cursor.xStart + DETAILS_MARGIN / 2, hWidth: cursor.hWidth - DETAILS_MARGIN / 2}, ctx.fonts.light, FONT_SIZES.TINY).vSpaceConsumed
  vSpaceConsumed += linesConsumed + DETAILS_MARGIN
  return {vSpaceConsumed}
}

function appendTech(tech: string[], ctx: Context, cursor: Cursor) {
  const { yPos } = cursor

  tech.reduce((x: number, tech: string) => {
    const width = measureTextWidth(tech, ctx.fonts.light, FONT_SIZES.TINY)

    ctx.page.drawSvgPath(roundedRectPath(width + CHIP_PADDING * 2, FONT_SIZES.NORMAL + 2, (FONT_SIZES.NORMAL + 2) / 2), {
      x: x - CHIP_PADDING,
      y: yPos - CHIP_PADDING / 2 + 2,
      color: COLORS.fade,
    })

    ctx.page.drawText(tech, {
      x,
      y: yPos - FONT_SIZES.NORMAL, // align against row text
      font: ctx.fonts.light,
      size: FONT_SIZES.TINY,
      color: COLORS.less_dark
    })

    return x + width + TECH_SPACING + CHIP_PADDING * 2
  }, cursor.xStart)
}