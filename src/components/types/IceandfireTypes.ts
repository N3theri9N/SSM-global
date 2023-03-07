export type IceAndFire = {
  index: number;
  name: string;
  aliases: string[];
  titles: string[];
  books: string[]|number;
  tvSeries: string[]|number;
  
  // for filter property;
  died: string;
  gender: string;  
};

export type Strainer = {
  key: string;
  cond: string|boolean|number;
}

export type FilterDataType = {
  text: string;
  active: boolean;
  value: Strainer;
}