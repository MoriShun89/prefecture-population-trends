export type prefectureData = {
  prefCode: number;
  prefName: string;
}

export type prefPopulation = {
  prefName: string;
  data: {
    year: number;
    value: number;
  }[];
}