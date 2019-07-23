/**
 * ascent descent
 * SVGascent, descent and baseline https://riptutorial.com/svg/example/26220/ascent--descent-and-baseline
 * SVG https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty
 * vert-adv-y 默认值为 ascent 与 descent 总和
 */
export function fontTemplate(DEFAULT_CONFIG) {
  const { font, fontface, glyphs = [] } = DEFAULT_CONFIG
  const TMPL = `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg">
      <metadata>Copyright (C) 2019 by original authors @ master Gao</metadata>
      <defs>
        <font id="${font.id}" horiz-adv-x="${font.horizAdvX}" vert-adv-y="${font.vertAdvY}" >
          <font-face font-family="${fontface.fontFamily}" font-weight="${fontface.fontWeight}" font-stretch="${fontface.fontStretch}" units-per-em="${fontface.unitsPerEm}" ascent="${fontface.ascent}" descent="${fontface.descent}" />
          <missing-glyph />${ glyphs.map(glyph => `
          <glyph ${glyph.glyphName ? (`glyph-name="${glyph.glyphName}" `):''}unicode="&#x${glyph.unicode};" d="${glyph.d}" horiz-adv-x="${glyph.horizAdvX}" vert-adv-y="${glyph.vertAdvY}" />`).join('')}
        </font>
      </defs>
    </svg>`
  return TMPL
}


export function fontCSSTemplate(fontTypes, fontName, glyphs = []) {
  const CSSTMPL = `
  @font-face {
    font-family: '${fontName}';
    ${fontTypes.includes('eot') && `src: url('${fontName}.eot'); /* IE9 */`}
    src: ${fontTypes.map(item => {
      if(item == 'eot'){
        return `url('${fontName}.eot?#iefix') format('embedded-opentype') /* IE6-IE8 */`
      }else if(item == 'woff2'){
        return `url('${fontName}.woff2') format('woff2') /* chrome、firefox */`
      }else if(item == 'woff'){
        return `url('${fontName}.woff') format('woff') /* chrome、firefox */`
      }else if(item == 'ttf'){
        return `url('${fontName}.ttf') format('truetype') /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */`
      }else if(item == 'svg'){
        return `url('${fontName}.svg#${fontName}') format('svg') /* iOS 4.1- */`
      }
    }).join(',\n\t\t')};
  }

  .font_family{
    font-family: '${fontName}';
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${ glyphs.map(({glyphName, unicode}) => `
  .${glyphName}:before {
    content: "\\${unicode}";
  }`).join('\n')}`
  return CSSTMPL
}
