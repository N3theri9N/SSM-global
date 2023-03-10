export type IceAndFire = {
  index: number;
  name: string;
  aliases: string[];
  titles: string[];
  books: number;
  tvSeries: number;
  
  // for filter property;
  died: string;
  gender: string;  
};

export type Strainer = {
  key: "name"|"titles"|"books"|"tvSeries"|"died"|"gender";
  cond: string|boolean|number;
}

export type FilterDataType = {
  text: string;
  active: boolean;
  value: Strainer;
}