import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { blurAnimationVariants } from "../animations/variations";
import { apiUrl } from "../requests/values";

interface CountryData {
  country_region: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  continent: string;
}

interface ContinentData {
  continent: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
}

const ContinentGraph: React.FC = () => {
  const [data, setData] = useState<CountryData[]>([]);
  const [continents, setContinents] = useState<ContinentData[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data with authorization and set default selected continent
  useEffect(() => {
    axios
      .get(`${apiUrl}/graphs/continent_stats`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        const aggregatedData = aggregateDataByContinent(response.data);
        setContinents(aggregatedData);
        if (aggregatedData.length > 0) {
          setSelectedContinent(aggregatedData[0].continent); // Set first continent by default
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to aggregate data by continent
  const aggregateDataByContinent = (data: CountryData[]): ContinentData[] => {
    const continentMap: { [key: string]: ContinentData } = {};

    data.forEach((item) => {
      if (!continentMap[item.continent]) {
        continentMap[item.continent] = {
          continent: item.continent,
          confirmed: 0,
          deaths: 0,
          recovered: 0,
          active: 0,
        };
      }
      continentMap[item.continent].confirmed += item.confirmed;
      continentMap[item.continent].deaths += item.deaths;
      continentMap[item.continent].recovered += item.recovered;
      continentMap[item.continent].active += item.active;
    });

    return Object.values(continentMap);
  };

  // Update chart with selected continent data
  useEffect(() => {
    if (chartRef.current && selectedContinent) {
      const chartInstance = echarts.init(chartRef.current);
      const selectedData = continents.find(
        (item) => item.continent === selectedContinent
      );

      if (selectedData) {
        const chartOptions: echarts.EChartsOption = {
          tooltip: { trigger: "item" },
          series: [
            {
              name: "COVID-19 Stats by Continent",
              type: "pie",
              radius: "50%",
              data: [
                { value: selectedData.confirmed, name: "Confirmed" },
                { value: selectedData.deaths, name: "Deaths" },
                { value: selectedData.recovered, name: "Recovered" },
                { value: selectedData.active, name: "Active" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };

        chartInstance.setOption(chartOptions);
      }

      // Cleanup to avoid multiple chart instances
      return () => {
        chartInstance.dispose();
      };
    }
  }, [continents, selectedContinent]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={0}
      variants={blurAnimationVariants}
      className="grid grid-cols-5 gap-4 h-screen p-4"
    >
      {/* Gráfica */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        custom={0.5}
        variants={blurAnimationVariants}
        className="col-span-3 flex flex-col items-center"
      >
        <div ref={chartRef} className="w-full h-3/4" />
        <select
          onChange={(e) => setSelectedContinent(e.target.value)}
          value={selectedContinent}
          className="mt-4 p-2 border rounded-md"
        >
          {continents.map((item, index) => (
            <option key={index} value={item.continent}>
              {item.continent}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Detalles de Países en el Continente */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        custom={1}
        variants={blurAnimationVariants}
        className="col-span-2 p-6 bg-gray-100 rounded-md overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedContinent || "Continent Details"}
        </h2>
        {data
          .filter((item) => item.continent === selectedContinent)
          .map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={1.5 + index * 0.5}
              variants={blurAnimationVariants}
              className="flex items-start mb-3"
            >
              <div className="flex items-center">
                <svg width="24" height="24" className="mr-2">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <div>
                  <p className="font-semibold">{item.country_region}</p>
                  <p>
                    <strong>Confirmed:</strong> {item.confirmed}
                  </p>
                  <p>
                    <strong>Deaths:</strong> {item.deaths}
                  </p>
                  <p>
                    <strong>Recovered:</strong> {item.recovered}
                  </p>
                  <p>
                    <strong>Active:</strong> {item.active}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default ContinentGraph;
