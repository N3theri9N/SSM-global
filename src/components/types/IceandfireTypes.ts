export type IceAndFire = {
  name: string;
  aliases: string[];
  titles: string[];
  books: string[];
  tvSeries: string[];
  
  // for filter property;
  died: string;
  gender: string;  
};

export type Strainer = {
  key: string;
  cond: string|boolean|number;
}