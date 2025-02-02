import { Button } from "@/components/ui/button";
import { fetchMarketChart } from "@/State/Coin/Action";
import { store } from "@/State/Store";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

const timeSeries = [
  {
    Keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    label: "1 Day",
    value: 1,
  },
  {
    Keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    label: "1 Week",
    value: 7,
  },
  {
    Keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    label: "1 Month",
    value: 30,
  },
  {
    Keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    label: "1 Year",
    value: 365,
  },
];
function StockChart({ coinId }) {
  const [activeLabel, setActiveLabel] = useState(timeSeries[0]);
  const dispatch = useDispatch();
  const handleActiveLable = (value) => {
    setActiveLabel(value);
  };
  const { coin } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      fetchMarketChart({
        coinId: coinId,
        days: activeLabel.value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, activeLabel, coinId]);

  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: "450",
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      background: "hsl(var(--background))",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "hsl(var(--muted-foreground))", // Muted text
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        },
      },
      axisBorder: {
        color: "hsl(var(--border))",
      },
      axisTicks: {
        color: "hsl(var(--border))",
      },
    },
    yaxis: {
      title: {
        text: "Price",
        style: {
          color: "hsl(var(--muted-foreground))", // Muted text
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          colors: "hsl(var(--muted-foreground))", // Muted text
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        },
      },
    },
    markers: {
      size: 0, // No circles
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
      },
      marker: {
        show: false, // No marker on tooltip
      },
    },
    colors: ["hsl(var(--primary))"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#1137ce"], // Lighter blue at the top
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.8,
        stops: [0, 100], // Smooth gradient
      },
    },
    grid: {
      borderColor: "hsl(var(--border))",
      strokeDashArray: 4,
      show: true,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  };

  return (
    <div>
      <div className="py-2 px-2 space-x-5">
        {timeSeries.map((item) => (
          <Button
            onClick={() => handleActiveLable(item)}
            variant={activeLabel.label == item.label ? "default" : "outline"}
            key={item.label}
            className={
              activeLabel.label == item.label
                ? "h-10 text-sm font-bold"
                : "h-9 text-sm"
            }
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div id="chart-timelines">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          width="100%"
          height={480}
        />
      </div>
    </div>
  );
}

export default StockChart;
