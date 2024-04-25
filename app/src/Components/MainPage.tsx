import { useEffect, useState } from "react";
import { prefectureData, prefPopulation } from "../Types/TypeList";
import CheckBoxField from "./CheckBoxField";
import Graph from "./Graph";
import "../Style/MainPage.css";

/**
 * メインページのコンポーネント
 */
const MainPage = () => {
  const apiKey = process.env.REACT_APP_RESAS_API_KEY;
  const [prefectures, setPrefectures] = useState<prefectureData[]>([]);
  const [prefPopulation, setPrefPopulation] = useState<prefPopulation[]>([]);

  useEffect(() => {
    if (!apiKey) {
      console.error("APIキーが設定されていません");
    } else {
      // 都道府県一覧を読み込み
      fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: {
          "X-API-KEY": apiKey,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          setPrefectures(data.result);
        })
        .catch((e) => console.error(e));
    }
  }, []);

  // チェックボックスがクリックされた時に動作するメソッド
  const handleClickCheckBox = (
    prefCode: number,
    prefName: string,
    isChecked: boolean
  ) => {
    let copyPrefPopulations = prefPopulation.slice();

    // チェックされた時の処理
    if (isChecked) {
      if (!apiKey) {
        console.error("APIキーが設定されていません");
      } else {
        // 人口構成のAPIを呼び出す
        fetch(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
            String(prefCode),
          {
            headers: {
              "X-API-KEY": apiKey,
            },
          }
        )
          .then((r) => r.json())
          .then((data) => {
            copyPrefPopulations.push({
              prefName: prefName,
              data: data.result.data[0].data, // data[0]：label「総人口」のデータ、data[0].data：年毎の人口データ
            });
            setPrefPopulation(copyPrefPopulations);
          })
          .catch((e) => console.error(e));
      }
    } else {
      // チェックを外した時の処理
      // チェックを外した都道府県名に一致する要素を取り除く
      const filteredPrefPopulations = copyPrefPopulations.filter(
        (prefPop) => prefPop.prefName !== prefName
      );
      setPrefPopulation(filteredPrefPopulations);
    }
  };

  return (
    <>
      <div className="checkbox">
        <h3>都道府県</h3>
        <CheckBoxField
          prefectures={prefectures}
          onChange={handleClickCheckBox}
        />
      </div>
      <div className="graph">
        <h3>人口推移グラフ</h3>
        <Graph populationData={prefPopulation}/>
      </div>
    </>
  );
};

export default MainPage;
