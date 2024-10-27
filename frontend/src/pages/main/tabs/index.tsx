import axios from "axios";
import {createChart} from "lightweight-charts";
import {useEffect, useRef} from "react";
import {apiUrl} from "../../../requests/values";
import {confirmAuth} from "../../../requests/auth";
import {useNavigate} from "react-router-dom";
import {Chart, registerables} from "chart.js";
import * as echarts from 'echarts';


Chart.register(...registerables);

export default function Index() {
    const navigate = useNavigate();
    const linealChartElement = useRef<HTMLDivElement>(null);
    const pie1ChartElement = useRef<HTMLDivElement>(null);
    const pie2ChartElement = useRef<HTMLDivElement>(null);

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
                background: {color: "white"},
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
                const confirmedSeries = firstChart.addLineSeries({
                    color: "rgb(61, 147, 244)",
                    lineWidth: 1,
                });
                confirmedSeries.setData(res.data["confirmed"]);

                const deathSeries = firstChart.addLineSeries({
                    color: "rgb(255, 0, 0)",
                    lineWidth: 1,
                });

                deathSeries.setData(res.data["deaths"]);

                firstChart.timeScale().fitContent();
            })
            .catch((err) => {
                console.log(err);
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
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'right'
                  },
                  series: [
                    {
                      name: 'Confirmed death',
                      type: 'pie',
                      radius: '50%',
                      data: data["confirmed"],
                    }
                  ]
                };

                secondChart.setOption(option1, true);
                const option2 = {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'right'
                  },
                  series: [
                    {
                      name: 'Confirmed death',
                      type: 'pie',
                      radius: '50%',
                      data: data["deaths"],
                    }
                  ]
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
                <div className="bg-[url('/background.webp')] bg-no-repeat bg-cover rounded-3xl relative p-5 w-full">
                    <div className="mb-7 mt-2">
                        <h1 className="font-bold text-xl">Covid Analysis</h1>
                        <span className="font-light text-sm text-black/70">
                            All the data of a covid dataset
                        </span>
                    </div>
                    <div className="flex gap-5 justify-between">
                        {recuadros.map((recuadro, index) => (
                            <div
                                key={index}
                                className="bg-white bg-opacity-70 rounded-3xl px-4 py-6 backdrop-blur-md flex-grow"
                            >
                                <h1 className="font-bold text-3xl">{recuadro.number}</h1>
                                <span className="font-light text-sm text-black/70">
                                    {recuadro.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-[calc(100%-50vh)_50vh] grid-rows-[50%_50%] w-full h-full gap-5 relative">
                    <div
                        className="row-span-2 bg-white [&_svg]:hidden [&_a]:hidden p-4 rounded-3xl"
                        ref={linealChartElement}
                    />
                    <div className="bg-green p-3 flex justify-center items-center" ref={pie1ChartElement}>
                        
                    </div>
                    <div className="bg-blue" ref={pie2ChartElement}>
                       
                    </div>
                </div>
            </section>
        </>
    );
}