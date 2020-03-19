declare class FontConvert {
  constructor(someParam?: string);

  someProperty: string[];

  convertFonts: (any) => any
}

export = Font

declare namespace Font {
  export function svg2Font(any):any
  export const Font: FontConvert
}
