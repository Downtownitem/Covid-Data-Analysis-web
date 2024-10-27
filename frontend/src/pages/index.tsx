import axios from "axios";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { apiUrl } from "../requests/values";
import { confirmAuth } from "../requests/auth";
import { useNavigate } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { blurAnimationVariants } from "../animations/variations";

Chart.register(...registerables);

export default function Index() {
  const navigate = useNavigate();
  const linealChartElement = useRef<HTMLDivElement>(null);
  const pie1ChartElement = useRef<HTMLDivElement>(null);
  const pie2ChartElement = useRef<HTMLDivElement>(null);
  const colors = ["#C81D25", "#FF5A5F", "#BFD7EA", "#087E8B", "#0B3954"];

  const recuadros = [
    {
      title: "Cases",
      number: "2,349,826",
    },
    {
      title: "Deaths",
      number: 1000,
    },
    {
      title: "Recovered",
      number: 1000,
    },
    {
      title: "Active Cases",
      number: 1000,
    },
    {
      title: "Critical Cases",
      number: 1000,
    },
  ];

  useEffect(() => {
    confirmAuth().catch(() => {
      navigate("/");
    });
  }, []);

  useEffect(() => {
    if (!linealChartElement.current) {
      return;
    }

    const firstChart = createChart(linealChartElement.current, {
      layout: {
        textColor: "rgba(0, 0, 0, 0.4)",
        background: { color: "white" },
        fontFamily: "Montserrat",
        fontSize: 11,
      },
      grid: {
        vertLines: {
          visible: true,
        },
        horzLines: {
          visible: true,
        },
      },
      watermark: {
        visible: false,
      },
      width: linealChartElement.current.clientWidth - 32,
      height: linealChartElement.current.clientHeight - 32,
    });

    const data = axios.get(`${apiUrl}/graphs/confirm_death_per_time`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    data
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const serie = firstChart.addLineSeries({
            color: colors[i % colors.length],
            lineWidth: 2,
          });
          serie.setData(res.data[i]["data"]);
        }

        firstChart.timeScale().fitContent();
      });

    // Pie 2
    if (!pie1ChartElement.current) {
      return;
    }

    const secondChart = echarts.init(pie1ChartElement.current);

    // Pie 3
    if (!pie2ChartElement.current) {
      return;
    }

    const thirdChart = echarts.init(pie2ChartElement.current);

    const dataPies = axios.get(`${apiUrl}/graphs/confirm_death_top_country`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    dataPies
      .then((res) => {
        const data = res.data;

        const option1 = {
          title: {
            text: "Confirmed Cases",
            textStyle: {
              fontFamily: "Montserrat",
            },
          },
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              type: "pie",
              radius: "50%",
              data: data["confirmed"],
            },
          ],
        };

        secondChart.setOption(option1, true);
        const option2 = {
          title: {
            text: "Deaths",
            textStyle: {
              fontFamily: "Montserrat",
            },
          },
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              type: "pie",
              radius: "50%",
              data: data["deaths"],
            },
          ],
        };
        thirdChart.setOption(option2, true);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      firstChart.remove();
    };
  }, []);

  return (
    <>
      <section className="w-full h-full flex flex-col gap-5">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          custom={0}
          variants={blurAnimationVariants}
          className="bg-[url('/fondo.png')] bg-no-repeat bg-cover rounded-3xl relative p-5 w-full shadow-md"
        >
          <div className="mb-7 mt-2">
            <motion.h1
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={0.3}
              variants={blurAnimationVariants}
              className="font-bold text-xl"
            >
              Covid Analysis
            </motion.h1>
            <motion.span
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={blurAnimationVariants}
              custom={0.6}
              className="font-light text-sm text-black/70"
            >
              All the data of a covid dataset
            </motion.span>
          </div>
          <div className="flex gap-5 justify-between">
            {recuadros.map((recuadro, index) => (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={blurAnimationVariants}
                key={index}
                custom={0.9 + index * 0.3}
                className="bg-white bg-opacity-70 rounded-3xl px-4 py-6 backdrop-blur-md flex-grow shadow-md"
              >
                <h1 className="font-bold text-3xl">{recuadro.number}</h1>
                <span className="font-light text-sm text-black/70">
                  {recuadro.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-[calc(100%-50vh)_calc(50vh-20px)] grid-rows-[calc(50%-10px)_calc(50%-10px)] w-full h-full gap-5 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={2}
            className="row-span-2 bg-white [&_svg]:hidden [&_a]:hidden p-4 rounded-3xl shadow-md relative"
            ref={linealChartElement}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={1}
            className="bg-white p-4 rounded-3xl flex justify-center items-center shadow-md relative"
            ref={pie1ChartElement}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={1.5}
            className="bg-white p-4 rounded-3xl shadow-md"
            ref={pie2ChartElement}
          />
        </div>
      </section>
    </>
  );
}
