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
import Study from "./main/components/study";

Chart.register(...registerables);

export default function Index() {
  const navigate = useNavigate();
  const linealChartElement = useRef<HTMLDivElement>(null);
  const pie1ChartElement = useRef<HTMLDivElement>(null);
  const pie2ChartElement = useRef<HTMLDivElement>(null);
  const colors = [
    "#8A56AC", // Púrpura oscuro
    "#A15DBE", // Violeta vibrante
    "#B76FD0", // Lila intenso
    "#C285D9", // Lavanda vibrante
    "#D59EE4", // Rosa lavanda
    "#8E307F", // Magenta oscuro
    "#9F3D91", // Rosa fuerte
    "#AB539B", // Rosa oscuro
    "#D264B6", // Rosa vibrante
    "#E07FBF", // Rosa claro contrastante
    "#4E2A59", // Morado muy oscuro
    "#632E7A", // Morado profundo
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

    data.then((res) => {
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
        const copy_colors = colors.slice(2, data["confirmed"].length);

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
          color: copy_colors,
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
          color: colors,
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
      <section className="w-full h-full p-5 flex flex-col gap-5">
        <Study></Study>
        <div className="grid grid-cols-[calc(100%-50vh)_calc(50vh-20px)] grid-rows-[calc(50%-10px)_calc(50%-10px)] w-full h-full gap-5 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={blurAnimationVariants}
            custom={2}
            className="row-span-2 bg-white [&_svg]:hidden [&_a]:hidden p-4 rounded-3xl shadow-md relative"
          >
            <h1 className="font-bold text-lg mb-4">
              Confirmed cases in top 12 country
            </h1>
            <div className="w-full h-[calc(100%-16px)]" ref={linealChartElement}></div>
          </motion.div>
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
