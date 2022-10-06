import { measureText, Context, Cursor, wrapText } from "./util";
import { CAREER } from "./data";
import { FONT_SIZES } from "./style";

const ROW_HEIGHT = 14


export function drawCareer(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  const COLUMN_GAP = 4

  const normalFont = ctx.fonts.normal

  const widths = {
    period: Math.max(...CAREER.map(c => measureText(c.period, normalFont, FONT_SIZES.NORMAL).width)),
    company: Math.max(...CAREER.map(c => measureText(c.company, normalFont, FONT_SIZES.NORMAL).width)),
    role: Math.max(...CAREER.map(c => measureText(c.role, normalFont, FONT_SIZES.NORMAL).width))
  }

  const xs = {
    period: cursor.xStart,
    company: cursor.xStart + widths.period + COLUMN_GAP,
    role: cursor.xStart + widths.period + COLUMN_GAP + widths.company + COLUMN_GAP
  }

  let {yPos} = cursor
  let totalSpaceConsumed = 0
  for (let i = 0; i < CAREER.length; i++) {
    const {vSpaceConsumed} = drawCareerRow(CAREER[i], xs, ctx, {...cursor, yPos})
    yPos -= vSpaceConsumed
    totalSpaceConsumed += vSpaceConsumed
  }

  return {vSpaceConsumed: totalSpaceConsumed}
}

function drawCareerRow(row: typeof CAREER[number],
  xs: {period: number, company: number, role: number},
  ctx: Context,
  cursor: Cursor): {vSpaceConsumed: number} {
  const {page} = ctx
  const {normal, bold} = ctx.fonts

  let {yPos} = cursor

  const widths = {
    role: measureText(row.role, normal, FONT_SIZES.NORMAL).width,
    company: measureText(row.company, bold, FONT_SIZES.NORMAL).width
  }

  page.drawText(row.period, {
    x: xs.period,
    y: yPos - ROW_HEIGHT,
    font: normal,
    size: FONT_SIZES.NORMAL,
  });

  page.drawText(row.role, {
    x: xs.company,
    y: yPos - ROW_HEIGHT,
    font: normal,
    size: FONT_SIZES.NORMAL,
  });

  page.drawText(row.company, {
    x: xs.company + widths.role + 2,
    y: yPos - ROW_HEIGHT,
    font: bold,
    size: FONT_SIZES.NORMAL,
  });

  yPos -= ROW_HEIGHT

  const {lines, height} = wrapText(row.description.replace('\n', ''), cursor.hWidth, normal, FONT_SIZES.NORMAL)

  for (let i = 0; i < lines.length; i++) {
    page.drawText(row.description, {
      x: xs.company,
      y: yPos - FONT_SIZES.NORMAL - i * FONT_SIZES.NORMAL,
      font: normal,
      size: FONT_SIZES.NORMAL,
    })
  }

  return {vSpaceConsumed: ROW_HEIGHT + height}

}