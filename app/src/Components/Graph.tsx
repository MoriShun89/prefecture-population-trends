import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { prefPopulation } from "../Types/TypeList";

type Props = {
  populationData: prefPopulation[];
};

/**
 * 総人口推移のグラフを作成するコンポーネント
 */
const Graph = (props: Props) => {
  const { populationData } = props;
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories: string[] = [];

  populationData.forEach((p) => {
    let data: number[] = [];
    p.data.forEach((pData) => {
      data.push(pData.value);
      categories.push(String(pData.year));
    });
    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  });

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Graph;
