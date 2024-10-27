import axios from "axios";
import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../../requests/values";
import { Skeleton } from "@nextui-org/skeleton";

export default function TotalDeathsGraph() {
  const [loading, setLoading] = useState(false);
  const chartElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartElement.current) {
      return;
    }

    const firstChart = createChart(chartElement.current, {
      layout: {
        textColor: "rgba(0, 0, 0, 0.4)",
        background: { color: "white" },
        fontFamily: "Montserrat",
        fontSize: 11,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      watermark: {
        visible: false,
      },
      width: chartElement.current.clientWidth - 32,
      height: chartElement.current.clientHeight - 32,
    });

    const data = axios.get(`${apiUrl}/graphs/confirm_death_per_time`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    data
      .then((res) => {
        const confirmedSeries = firstChart.addLineSeries({
          color: "rgb(61, 147, 244)",
          lineWidth: 4,
        });
        confirmedSeries.setData(res.data["confirmed"]);

        const deathSeries = firstChart.addLineSeries({
          color: "rgb(255, 0, 0)",
          lineWidth: 4,
        });

        deathSeries.setData(res.data["deaths"]);

        firstChart.timeScale().fitContent();
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <Skeleton isLoaded={loading} className="w-full h-full">
        <div className="w-full h-full" ref={chartElement}></div>
      </Skeleton>
    </>
  );
}
