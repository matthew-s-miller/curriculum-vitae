import { rgb } from "pdf-lib";
import { SKILLS } from "./data";
import { FONT_SIZES } from "./style";
import { Context, Cursor, drawSectionHeader, measureTextWidth } from "./util";

const RADIUS = 4.5
const GAP = 1.5
const LINE_HEIGHT = FONT_SIZES.NORMAL + 2

export function drawSkills(ctx: Context, cursor: Cursor): {vSpaceConsumed: number} {

  let { vSpaceConsumed } = drawSectionHeader('SKILLS', ctx, cursor)
  let yPos = cursor.yPos - vSpaceConsumed

  const maxSkillWidth = SKILLS
    .flatMap(skill => skill.skills)
    .reduce((max, skill) => Math.max(max, measureTextWidth(skill.name, ctx.fonts.normal, FONT_SIZES.NORMAL)), 0)

  const colors = {
    'on': rgb(0.5, 0.5, 0.5),
    'off': rgb(0.8, 0.8, 0.8)
  }

  for (let i = 0; i < SKILLS.length; i++) {
    const group = SKILLS[i]
    ctx.page.drawText(group.type, {
      x: cursor.xStart,
      y: yPos - FONT_SIZES.NORMAL,
      font: ctx.fonts.bold,
      size: FONT_SIZES.NORMAL,
    })

    vSpaceConsumed += LINE_HEIGHT * 2
    yPos -= LINE_HEIGHT * 2

    group.skills.forEach((skill, index) => {
      const y = yPos - FONT_SIZES.NORMAL - index * LINE_HEIGHT
      ctx.page.drawText(skill.name, {
        x: cursor.xStart + GAP * 10,
        y,
        font: ctx.fonts.normal,
        size: FONT_SIZES.NORMAL,
      })

      ;[0,1,2,3,4].reduce((width, level) => {
        const color = skill.level > level ? colors.on : colors.off
        ctx.page.drawCircle({x: cursor.xStart + width + GAP + RADIUS, y: y + RADIUS * 0.75, size: RADIUS, color})
        return width + GAP + RADIUS * 2
      }, maxSkillWidth + GAP * 20)
    })

    vSpaceConsumed += LINE_HEIGHT * (group.skills.length + 1)
    yPos -= LINE_HEIGHT * (group.skills.length + 1)
  }

  return {vSpaceConsumed: vSpaceConsumed - LINE_HEIGHT}
}