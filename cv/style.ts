import { rgb } from "pdf-lib"

export const PAGE_SETUP = {
  hMargin: 32,
  vMargin: 32
}

export const FONT_SIZES = {
  TITLE: 32,
  HEADING: 14,
  NORMAL: 10,
  TINY: 9
}

export const TIMELINE_OFFSET = -9

export const COLORS = {
  white: rgb(1,1,1),
  dark: rgb(0,0,0.05),
  less_dark: rgb(0.2,0.2,0.25),
  fade: rgb(0.9, 0.9, 0.91),
  neutral: rgb(0.5, 0.5, 0.51),
}