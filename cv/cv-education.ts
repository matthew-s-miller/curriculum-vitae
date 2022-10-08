import { rgb } from "pdf-lib";
import { EDUCATION } from "./data";
import { FONT_SIZES } from "./style";
import { Context, Cursor, drawSectionHeader, measureTextWidth, writeMultilineText } from "./util";

const LINE_SPACING = FONT_SIZES.NORMAL + 2

export function drawEducation(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  let titleSpaceConsumed = drawSectionHeader('EDUCATION & CERTIFICATES', ctx, cursor).vSpaceConsumed

  let yPos = cursor.yPos
  let yPosOld: number|undefined
  const vSpaceConsumed = EDUCATION.reduce((vSpace, row) => {
    
    const extraSpace = drawEducationRow(row, ctx, {...cursor, yPos: yPos - vSpace}, yPosOld).vSpaceConsumed + vSpace + FONT_SIZES.NORMAL
    yPosOld = yPos - vSpace
    return extraSpace
  }, titleSpaceConsumed)

  return { vSpaceConsumed }
}


export function drawEducationRow(row: typeof EDUCATION[number], ctx: Context, cursor: Cursor, yPosOld: number|undefined): {vSpaceConsumed: number} {

  let { yPos } = cursor
  let vSpaceConsumed = 0 

  // draw the timeline
  ctx.page.drawCircle({
    x: cursor.xStart - 5,
    y: yPos - FONT_SIZES.TINY * 0.75,
    size: 1.5,
    color: rgb(0.2,0.2,0.2)
  })

  if (typeof yPosOld === 'number') {
    ctx.page.drawLine({
      start: {x: cursor.xStart - 5, y: yPosOld - FONT_SIZES.NORMAL * 0.75},
      end: {x: cursor.xStart - 5, y: yPos - FONT_SIZES.NORMAL * 0.75},
      thickness: 1,
      color: rgb(0.2, 0.2, 0.2)
    })
  }

  ctx.page.drawText(row.institution, {
    x: cursor.xStart,
    y: yPos - FONT_SIZES.NORMAL,
    font: ctx.fonts.bold,
    size: FONT_SIZES.NORMAL,
  });

  const institutionWidth = measureTextWidth(row.institution, ctx.fonts.bold, FONT_SIZES.NORMAL)

  ctx.page.drawText(`| ${row.period}`, {
    x: cursor.xStart + institutionWidth + 4,
    y: yPos - FONT_SIZES.NORMAL, // align with company font
    font: ctx.fonts.light,
    size: FONT_SIZES.TINY,
  });

  vSpaceConsumed += LINE_SPACING
  yPos -= LINE_SPACING

  ctx.page.drawText(row.attainment, {
    x: cursor.xStart,
    y: yPos - FONT_SIZES.NORMAL,
    font: ctx.fonts.normal,
    size: FONT_SIZES.NORMAL,
  });

  // const linesConsumed = ctx.page.drawText(row.attainment, ctx.page, {...cursor, yPos }, ctx.fonts.normal, FONT_SIZES.NORMAL).vSpaceConsumed
  
  vSpaceConsumed += LINE_SPACING

  if (row.level) {
    const attainmentWidth = measureTextWidth(row.attainment, ctx.fonts.normal, FONT_SIZES.NORMAL)

    ctx.page.drawText(row.level, {
      x: cursor.xStart + attainmentWidth + 4,
      y: yPos - FONT_SIZES.NORMAL,
      font: ctx.fonts.bold,
      size: FONT_SIZES.NORMAL,
    });
  }

  return {vSpaceConsumed}
}