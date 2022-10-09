import { SKILLS } from "./data";
import { stackPath } from "./icons";
import { COLORS, FONT_SIZES } from "./style";
import { Context, Cursor } from "./util";

const RADIUS = 4.5
const GAP = 1.5
const LINE_HEIGHT = FONT_SIZES.NORMAL + 2
const ICON_SIZE = 18
const DOT_COLORS = {
  'on': COLORS.neutral,
  'off': COLORS.fade
}
const X = 80

export function drawSkills(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

    ctx.page.drawText('My skillset includes...', {
      x: cursor.xStart,
      y: cursor.yPos - FONT_SIZES.NORMAL,
      font: ctx.fonts.light,
      size: FONT_SIZES.NORMAL,
    })

  let { vSpaceConsumed } = {vSpaceConsumed: FONT_SIZES.NORMAL * 2} //  drawSectionHeader('SKILLS', ctx, cursor)
  let yPos = cursor.yPos - vSpaceConsumed

  // const maxSkillWidth = SKILLS
  //   .flatMap(skill => skill.skills)
  //   .reduce((max, skill) => Math.max(max, measureTextWidth(skill.name, ctx.fonts.normal, FONT_SIZES.NORMAL)), 0)

  for (let i = 0; i < SKILLS.length; i++) {
    const group = SKILLS[i]
    // ctx.page.drawText(group.type, {
    //   x: cursor.xStart,
    //   y: yPos - FONT_SIZES.NORMAL,
    //   font: ctx.fonts.bold,
    //   size: FONT_SIZES.NORMAL,
    // })

    drawStack({x: cursor.xStart, y: yPos - 6, width: ICON_SIZE, height: ICON_SIZE * 1}, ctx, (i + 1) as 1|2|3)

    group.skills.forEach((skill, index) => {
      const y = yPos - FONT_SIZES.NORMAL - index * LINE_HEIGHT

      ctx.page.drawText(skill.name, {
        x: cursor.xStart + GAP * 24,
        y,
        font: ctx.fonts.normal,
        size: FONT_SIZES.NORMAL,
      })

      ;[0,1,2,3,4].reduce((width, level) => {
        const color = skill.level > level ? DOT_COLORS.on : DOT_COLORS.off
        ctx.page.drawCircle({x: cursor.xStart + width + GAP + RADIUS, y: y + RADIUS * 0.75, size: RADIUS, color})
        return width + GAP + RADIUS * 2
      }, X + GAP * 20)
    })

    vSpaceConsumed += LINE_HEIGHT * (group.skills.length + 1)
    yPos -= LINE_HEIGHT * (group.skills.length + 1)
  }

  return {vSpaceConsumed: vSpaceConsumed - LINE_HEIGHT}
}

function drawStack({x, y, width, height}: {x: number, y: number, width: number, height: number}, ctx: Context, level: 1|2|3) {
  ([3,2,1] as const).forEach(lvl => {
    ctx.page.drawSvgPath(stackPath(width, height, lvl), {
      x,
      y,
      color: lvl === level ? COLORS.neutral : COLORS.fade,
      borderColor: COLORS.neutral,
      borderWidth: 0.5
    })
  })
}