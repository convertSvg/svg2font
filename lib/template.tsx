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


export function fontCSSTemplate(fontTypes, fontName, fontFamily, glyphs = [], fontCdnUrl = '') {
  const CSSTMPL = `
  @font-face {
    font-family: '${fontFamily}';
    ${fontTypes.includes('eot') && `src: url('${fontName}.eot'); /* IE9 */`}
    src: ${fontTypes.map(item => {
      if(item == 'eot'){
        return `url('${fontCdnUrl}${fontName}.eot?#iefix') format('embedded-opentype') /* IE6-IE8 */`
      }else if(item == 'woff2'){
        return `url('${fontCdnUrl}${fontName}.woff2') format('woff2') /* chrome、firefox */`
      }else if(item == 'woff'){
        return `url('${fontCdnUrl}${fontName}.woff') format('woff') /* chrome、firefox */`
      }else if(item == 'ttf'){
        return `url('${fontCdnUrl}${fontName}.ttf') format('truetype') /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */`
      }else if(item == 'svg'){
        return `url('${fontCdnUrl}${fontName}.svg#${fontFamily}') format('svg') /* iOS 4.1- */`
      }
    }).join(',\n\t\t')};
  }

  .font_family{
    font-family: '${fontFamily}';
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



export function svgSymbolTemplate(fontTypes, fontName, glyphs = []) {
  const SYMBOLTMPL = `
  (function (document) {
var symbols = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${ glyphs.map(({glyphName, originDs}) => `<symbol id="${glyphName}" viewBox="0 0 1024 1024">${ originDs.map(({d, fill}) => `<path d="${d}" fill="${fill}"></path>`).join('') }</symbol>`).join('')}</svg>'
    document.body.insertAdjacentHTML('afterBegin', symbols)
  })(document);`
  return SYMBOLTMPL
}

export function htmlTemplate(fontTypes, fontName, glyphs = []) {
  const HTMLTMPL = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <title>Quarkicon Demo</title>
    <link rel="shortcut icon" href="http://quark.jd.com/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="https://g.alicdn.com/thx/cube/1.3.2/cube.min.css">
    <link rel="stylesheet" href="${fontName}.css">
    <style type="text/css">
      /* tabs */
      .nav-tabs {
        position: relative;
      }

      .nav-tabs .nav-more {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 42px;
        line-height: 42px;
        color: #666;
      }

      #tabs {
        border-bottom: 1px solid #eee;
      }

      #tabs li {
        cursor: pointer;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        border-bottom: 2px solid transparent;
        position: relative;
        z-index: 1;
        margin-bottom: -1px;
        color: #666;
      }


      #tabs .active {
        border-bottom-color: #f00;
        color: #222;
      }

      .tab-container .content {
        display: none;
      }

      /* 页面布局 */
      .main {
        padding: 30px 100px;
        width: 960px;
        margin: 0 auto;
      }

      .main .logo {
        color: #333;
        text-align: left;
        margin-bottom: 30px;
        line-height: 1;
        height: 42px;
        overflow: hidden;
        *zoom: 1;
      }

      .main .logo a {
        font-size: 40px;
        color: #333;
      }

      .helps {
        margin-top: 40px;
      }

      .helps pre {
        padding: 20px;
        margin: 10px 0;
        border: solid 1px #e7e1cd;
        background-color: #fffdef;
        overflow: auto;
      }

      .icon_lists {
        width: 100% !important;
        overflow: hidden;
        *zoom: 1;
      }

      .icon_lists li {
        width: 100px;
        margin-bottom: 10px;
        margin-right: 20px;
        text-align: center;
        list-style: none !important;
        cursor: default;
      }

      .icon_lists li .code-name {
        line-height: 1.2;
      }

      .icon_lists .icon {
        display: block;
        height: 100px;
        line-height: 100px;
        font-size: 42px;
        margin: 10px auto;
        color: #333;
        -webkit-transition: font-size 0.25s linear, width 0.25s linear;
        -moz-transition: font-size 0.25s linear, width 0.25s linear;
        transition: font-size 0.25s linear, width 0.25s linear;
      }

      .icon_lists .icon:hover {
        font-size: 100px;
      }

      .icon_lists .svg-icon {
        /* 通过设置 font-size 来改变图标大小 */
        width: 1em;
        /* 图标和文字相邻时，垂直对齐 */
        vertical-align: -0.15em;
        /* 通过设置 color 来改变 SVG 的颜色/fill */
        fill: currentColor;
        /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
            normalize.css 中也包含这行 */
        overflow: hidden;
      }

      .icon_lists li .name,
      .icon_lists li .code-name {
        color: #666;
      }

      /* markdown 样式 */
      .markdown {
        color: #666;
        font-size: 14px;
        line-height: 1.8;
      }

      .highlight {
        line-height: 1.5;
      }

      .markdown img {
        vertical-align: middle;
        max-width: 100%;
      }

      .markdown h1 {
        color: #404040;
        font-weight: 500;
        line-height: 40px;
        margin-bottom: 24px;
      }

      .markdown h2,
      .markdown h3,
      .markdown h4,
      .markdown h5,
      .markdown h6 {
        color: #404040;
        margin: 1.6em 0 0.6em 0;
        font-weight: 500;
        clear: both;
      }

      .markdown h1 {
        font-size: 28px;
      }

      .markdown h2 {
        font-size: 22px;
      }

      .markdown h3 {
        font-size: 16px;
      }

      .markdown h4 {
        font-size: 14px;
      }

      .markdown h5 {
        font-size: 12px;
      }

      .markdown h6 {
        font-size: 12px;
      }

      .markdown hr {
        height: 1px;
        border: 0;
        background: #e9e9e9;
        margin: 16px 0;
        clear: both;
      }

      .markdown p {
        margin: 1em 0;
      }

      .markdown>p,
      .markdown>blockquote,
      .markdown>.highlight,
      .markdown>ol,
      .markdown>ul {
        width: 80%;
      }

      .markdown ul>li {
        list-style: circle;
      }

      .markdown>ul li,
      .markdown blockquote ul>li {
        margin-left: 20px;
        padding-left: 4px;
      }

      .markdown>ul li p,
      .markdown>ol li p {
        margin: 0.6em 0;
      }

      .markdown ol>li {
        list-style: decimal;
      }

      .markdown>ol li,
      .markdown blockquote ol>li {
        margin-left: 20px;
        padding-left: 4px;
      }

      .markdown code {
        margin: 0 3px;
        padding: 0 5px;
        background: #eee;
        border-radius: 3px;
      }

      .markdown strong,
      .markdown b {
        font-weight: 600;
      }

      .markdown>table {
        border-collapse: collapse;
        border-spacing: 0px;
        empty-cells: show;
        border: 1px solid #e9e9e9;
        width: 95%;
        margin-bottom: 24px;
      }

      .markdown>table th {
        white-space: nowrap;
        color: #333;
        font-weight: 600;
      }

      .markdown>table th,
      .markdown>table td {
        border: 1px solid #e9e9e9;
        padding: 8px 16px;
        text-align: left;
      }

      .markdown>table th {
        background: #F7F7F7;
      }

      .markdown blockquote {
        font-size: 90%;
        color: #999;
        border-left: 4px solid #e9e9e9;
        padding-left: 0.8em;
        margin: 1em 0;
      }

      .markdown blockquote p {
        margin: 0;
      }

      .markdown .anchor {
        opacity: 0;
        transition: opacity 0.3s ease;
        margin-left: 8px;
      }

      .markdown .waiting {
        color: #ccc;
      }

      .markdown h1:hover .anchor,
      .markdown h2:hover .anchor,
      .markdown h3:hover .anchor,
      .markdown h4:hover .anchor,
      .markdown h5:hover .anchor,
      .markdown h6:hover .anchor {
        opacity: 1;
        display: inline-block;
      }

      .markdown>br,
      .markdown>p>br {
        clear: both;
      }


      .hljs {
        display: block;
        background: white;
        padding: 0.5em;
        color: #333333;
        overflow-x: auto;
      }

      .hljs-comment,
      .hljs-meta {
        color: #969896;
      }

      .hljs-string,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-strong,
      .hljs-emphasis,
      .hljs-quote {
        color: #df5000;
      }

      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-type {
        color: #a71d5d;
      }

      .hljs-literal,
      .hljs-symbol,
      .hljs-bullet,
      .hljs-attribute {
        color: #0086b3;
      }

      .hljs-section,
      .hljs-name {
        color: #63a35c;
      }

      .hljs-tag {
        color: #333333;
      }

      .hljs-title,
      .hljs-attr,
      .hljs-selector-id,
      .hljs-selector-class,
      .hljs-selector-attr,
      .hljs-selector-pseudo {
        color: #795da3;
      }

      .hljs-addition {
        color: #55a532;
        background-color: #eaffea;
      }

      .hljs-deletion {
        color: #bd2c00;
        background-color: #ffecec;
      }

      .hljs-link {
        text-decoration: underline;
      }

      /* 代码高亮 */
      /* PrismJS 1.15.0
      https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
      /**
      * prism.js default theme for JavaScript, CSS and HTML
      * Based on dabblet (http://dabblet.com)
      * @author Lea Verou
      */
      code[class*="language-"],
      pre[class*="language-"] {
        color: black;
        background: none;
        text-shadow: 0 1px white;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }

      pre[class*="language-"]::-moz-selection,
      pre[class*="language-"] ::-moz-selection,
      code[class*="language-"]::-moz-selection,
      code[class*="language-"] ::-moz-selection {
        text-shadow: none;
        background: #b3d4fc;
      }

      pre[class*="language-"]::selection,
      pre[class*="language-"] ::selection,
      code[class*="language-"]::selection,
      code[class*="language-"] ::selection {
        text-shadow: none;
        background: #b3d4fc;
      }

      @media print {

        code[class*="language-"],
        pre[class*="language-"] {
          text-shadow: none;
        }
      }

      /* Code blocks */
      pre[class*="language-"] {
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
      }

      :not(pre)>code[class*="language-"],
      pre[class*="language-"] {
        background: #f5f2f0;
      }

      /* Inline code */
      :not(pre)>code[class*="language-"] {
        padding: .1em;
        border-radius: .3em;
        white-space: normal;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: slategray;
      }

      .token.punctuation {
        color: #999;
      }

      .namespace {
        opacity: .7;
      }

      .token.property,
      .token.tag,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.symbol,
      .token.deleted {
        color: #905;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #690;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string {
        color: #9a6e3a;
        background: hsla(0, 0%, 100%, .5);
      }

      .token.atrule,
      .token.attr-value,
      .token.keyword {
        color: #07a;
      }

      .token.function,
      .token.class-name {
        color: #DD4A68;
      }

      .token.regex,
      .token.important,
      .token.variable {
        color: #e90;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }
    </style>
    <!-- jQuery -->
    <script src="http://wq.360buyimg.com/data/ppms/others/quarkicon.jquery.v1.9.1.js"></script>
    <!-- 代码高亮 -->
    <script src="http://wq.360buyimg.com/data/ppms/others/quarkicon.prismjs.js"></script>
  </head>
  <body>
    <div class="main">
      <h1 class="logo"><a href="http://quark.jd.com/icon/" title="Quarkicon 首页" target="_blank">QuarkIcon</a></h1>
      <div class="nav-tabs">
        <ul id="tabs" class="dib-box">
          <li class="dib active"><span>Unicode</span></li>
          <li class="dib"><span>Font class</span></li>
          <li class="dib"><span>Symbol</span></li>
        </ul>

        <a href="http://quark.jd.com/icon/" target="_blank" class="nav-more">去QuarkIcon官网</a>

      </div>
      <div class="tab-container">
        <div class="content unicode" style="display: block;">
            <ul class="icon_lists dib-box">
              ${
                glyphs.map(({originName, unicode}) => `
                <li class="dib">
                <span class="icon font_family">&#x${unicode};</span>
                  <div class="name">${originName}</div>
                  <div class="code-name">&amp;#x${unicode};</div>
                </li>
                `).join('')
              }
            </ul>
            <div class="article markdown">
            <h2 id="unicode-">Unicode 引用</h2>
            <hr>

            <p>Unicode 是字体在网页端最原始的应用方式，特点是：</p>
            <ul>
              <li>兼容性最好，支持 IE6+，及所有现代浏览器。</li>
              <li>支持按字体的方式去动态调整图标大小，颜色等等。</li>
              <li>但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。</li>
            </ul>
            <blockquote>
              <p>注意：新版 QuarkIcon 支持多色图标，这些多色图标在 Unicode 模式下将不能使用，如果有需求建议使用 symbol 的引用方式</p>
            </blockquote>
            <p>Unicode 使用步骤如下：</p>
            <h3 id="-font-face">第一步：拷贝项目下面生成的 <code>@font-face</code></h3>
  <pre><code class="language-css"
  >@font-face {
    font-family: 'font_family';
    src: url('quarkicon.eot');
    src: url('quarkicon.eot?#iefix') format('embedded-opentype'),
        url('quarkicon.woff2') format('woff2'),
        url('quarkicon.woff') format('woff'),
        url('quarkicon.ttf') format('truetype'),
        url('quarkicon.svg#font_family') format('svg');
  }
  </code></pre>
            <h3 id="-iconfont-">第二步：定义使用 quarkicon 的样式</h3>
  <pre><code class="language-css"
  >.font_family {
    font-family: "font_family" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  </code></pre>
            <h3 id="-">第三步：挑选相应图标并获取字体编码，应用于页面</h3>
  <pre>
  <code class="language-html"
  >&lt;span class="font_family"&gt;&amp;#x33;&lt;/span&gt;
  </code></pre>
            <blockquote>
              <p>"font_family" 是你项目下的 font-family。可以通过编辑项目查看，默认是 "quarkicon"。</p>
            </blockquote>
            </div>
        </div>
        <div class="content font-class">
          <ul class="icon_lists dib-box">
          ${
            glyphs.map(({glyphName, originName, unicode}) => `
            <li class="dib">
              <span class="icon font_family ${glyphName}"></span>
              <div class="name">
                ${originName}
              </div>
              <div class="code-name">.${glyphName}
              </div>
            </li>
            `).join('')
          }
          </ul>
          <div class="article markdown">
          <h2 id="font-class-">font-class 引用</h2>
          <hr>

          <p>font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。</p>
          <p>与 Unicode 使用方式相比，具有如下特点：</p>
          <ul>
            <li>兼容性良好，支持 IE8+，及所有现代浏览器。</li>
            <li>相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。</li>
            <li>因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。</li>
            <li>不过因为本质上还是使用的字体，所以多色图标还是不支持的。</li>
          </ul>
          <p>使用步骤如下：</p>
          <h3 id="-fontclass-">第一步：引入项目下面生成的 fontclass 代码：</h3>
  <pre><code class="language-html">&lt;link rel="stylesheet" href="./quarkicon.css"&gt;
  </code></pre>
          <h3 id="-">第二步：挑选相应图标并获取类名，应用于页面：</h3>
  <pre><code class="language-html">&lt;span class="font_family icon-xxx"&gt;&lt;/span&gt;
  </code></pre>
          <blockquote>
            <p>"
              font_family" 是你项目下的 font-family。可以通过编辑项目查看，默认是 "quarkicon"。</p>
          </blockquote>
        </div>
        </div>
        <div class="content symbol">
            <ul class="icon_lists dib-box">
              ${
                glyphs.map(({glyphName,originName, unicode}) => `
                <li class="dib">
                  <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#${glyphName}"></use>
                  </svg>
                  <div class="name">${originName}</div>
                  <div class="code-name">#${glyphName}</div>
                </li>
                `).join('')
              }
            </ul>
            <div class="article markdown">
            <h2 id="symbol-">Symbol 引用</h2>
            <hr>

            <p>这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇<a href="https://aotu.io/notes/2016/07/09/SVG-Symbol-component-practice/">文章</a>
              这种用法其实是做了一个 SVG 的集合，与另外两种相比具有如下特点：</p>
            <ul>
              <li>支持多色图标了，不再受单色限制。</li>
              <li>通过一些技巧，支持像字体那样，通过 <code>font-size</code>, <code>color</code> 来调整样式。</li>
              <li>兼容性较差，支持 IE9+，及现代浏览器。</li>
              <li>浏览器渲染 SVG 的性能一般，还不如 png。</li>
            </ul>
            <p>使用步骤如下：</p>
            <h3 id="-symbol-">第一步：引入项目下面生成的 symbol 代码：</h3>
  <pre><code class="language-html">&lt;script src="./quarkicon.js"&gt;&lt;/script&gt;
  </code></pre>
            <h3 id="-css-">第二步：加入通用 CSS 代码（引入一次就行）：</h3>
  <pre><code class="language-html">&lt;style&gt;
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  &lt;/style&gt;
  </code></pre>
            <h3 id="-">第三步：挑选相应图标并获取类名，应用于页面：</h3>
  <pre><code class="language-html">&lt;svg class="icon" aria-hidden="true"&gt;
    &lt;use xlink:href="#icon-xxx"&gt;&lt;/use&gt;
  &lt;/svg&gt;
  </code></pre>
            </div>
        </div>

      </div>
    </div>
    <script>
    $(document).ready(function () {
        $('.tab-container .content:first').show()

        $('#tabs li').click(function (e) {
          var tabContent = $('.tab-container .content')
          var index = $(this).index()

          if ($(this).hasClass('active')) {
            return
          } else {
            $('#tabs li').removeClass('active')
            $(this).addClass('active')

            tabContent.hide().eq(index).fadeIn()
          }
        })
      })
    </script>
    <script src="${fontName}.js"></script>
  </body>
  </html>`
  return HTMLTMPL
}


