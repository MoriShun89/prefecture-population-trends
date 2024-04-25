import { prefectureData } from "../Types/TypeList";
import "../Style/CheckBoxField.css";

type PropsType = {
  prefectures: prefectureData[];
  onChange: (prefCode: number, prefName: string, isChecked: boolean) => void;
};

/**
 * 都道府県のチェックボックスを構成するコンポーネント
 */
const CheckBoxField = (props: PropsType) => {
  const { prefectures, onChange } = props;

  return (
    <>
      <div className="checkbox-field">
        {prefectures.map((prefecture) => (
          <div className="checkbox" id={prefecture.prefCode.toString()}>
            <label>
              <input
                type="checkbox"
                id={prefecture.prefName}
                value={prefecture.prefName}
                onChange={(e) => {
                  onChange(
                    prefecture.prefCode,
                    prefecture.prefName,
                    e.target.checked
                  );
                }}
              />
              {prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckBoxField;
