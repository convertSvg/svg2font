export default function fontTemplate(DEFAULT_CONFIG) {
  const { font, fontface, glyphs = {} } = DEFAULT_CONFIG
  const TMPL = `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg">
      <metadata>Copyright (C) 2019 by original authors @ master Gao</metadata>
      <defs>
      <font id="${font.id}" horiz-adv-x="${font.horizAdvX}" vert-adv-y="${font.vertAdvY}" >
      <font-face font-family="${fontface.fontFamily}" font-weight="${fontface.fontWeight}" font-stretch="${fontface.fontStretch}" units-per-em="${fontface.unitsPerEm}" ascent="${fontface.ascent}" descent="${fontface.descent}" />
      <missing-glyph />${Object.keys(glyphs).map(key => `
      <glyph glyph-name="${key}" unicode="${glyphs[key].unicode}" d="${glyphs[key].d}" horiz-adv-x="${glyphs[key].horizAdvX}" vert-adv-y="${glyphs[key].vertAdvY}" />`).join('')}
    </font>
    </defs>
  </svg>`
  return TMPL
}
