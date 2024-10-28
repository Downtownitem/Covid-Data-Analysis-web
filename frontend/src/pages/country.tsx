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
}

const CountryGraph: React.FC = () => {
  const [data, setData] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data with authorization and set default selected country
  useEffect(() => {
    axios
      .get(`${apiUrl}/graphs/country_stats`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        if (response.data.length > 0) {
          setSelectedCountry(response.data[0].country_region); // Set first country by default
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        console.log("Data fetched successfully");
        console.log(data);
      });
  }, []);

  // Update chart with selected country data
  useEffect(() => {
    if (chartRef.current && selectedCountry) {
      const chartInstance = echarts.init(chartRef.current);
      const selectedData = data.find(
        (item) => item.country_region === selectedCountry
      );

      if (selectedData) {
        const chartOptions: echarts.EChartsOption = {
          tooltip: { trigger: "item" },
          series: [
            {
              name: "COVID-19 Stats",
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
  }, [data, selectedCountry]);

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
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="mt-4 p-2 border rounded-md"
        >
          {data.map((item, index) => (
            <option key={index} value={item.country_region}>
              {item.country_region}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Detalles */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        custom={1}
        variants={blurAnimationVariants}
        className="col-span-2 p-6 bg-gray-100 rounded-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedCountry || "Country Details"}
        </h2>
        {data
          .filter((item) => item.country_region === selectedCountry)
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
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default CountryGraph;
