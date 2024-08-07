import { IData } from "../utils/types/dataType";
import json from "../utils/data/localization.json";

export const fetchData = (skip: number, limit: number): Promise<IData> => {
  return new Promise((resolve, reject) => {
    try {
      const slicedData: IData = {
        data_items: json.data_items.slice(skip, skip + limit),
      };
      resolve(slicedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      reject([]);
    }
  });
};