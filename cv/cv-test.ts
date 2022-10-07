import { rgb } from "pdf-lib";
import { Context, Cursor, measureTextWidth } from "./util";

export function drawTest(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  const fontFace = ctx.fonts.light
  const fontSize = 20

  const text = 'abcdefgABCDEFG'

  const width = measureTextWidth(text, fontFace, fontSize)
  console.log({width})

  const y = ctx.page.getHeight() - 20

  ctx.page.drawText(text, {
    x: 0,
    y,
    font: fontFace,
    size: fontSize
  });

  ctx.page.drawRectangle({
    x: 0,
    y: y,
    width, 
    height: 20,
    borderColor: rgb(1, 0, 0),
    borderWidth: 1
  })

  return {vSpaceConsumed: fontSize}

}
