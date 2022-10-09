
export function circleBorderPath(): string {
  return `M0 0 L0 2 L1 2 A1 1 0 0 1 1 0 A1 1 0 0 1 1 2 L2 2 L 2 0 Z`;
}

export function roundedRectPath(width: number, height: number, borderRadius: number): string {
  return `M0 ${borderRadius} 
    A${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} 0 
    L${width - borderRadius} 0 
    A${borderRadius} ${borderRadius} 0 0 1 ${width} ${borderRadius}
    L${width} ${height - borderRadius}
    A${borderRadius} ${borderRadius} 0 0 1 ${width - borderRadius} ${height}
    L${borderRadius} ${height}
    A${borderRadius} ${borderRadius} 0 0 1 0 ${height - borderRadius} Z`.replace(/\s+/g,' ')
}

export function pinPath(width: number, height: number = width): string {
  const stretch = 0.48
  return `M${width/2} ${height} C${width * (1 + stretch)} 0 ${-width * stretch} 0 ${width/2} ${height} Z`
}