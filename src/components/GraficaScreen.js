import React, { useState, useEffect } from "react";
import { HorizontalBar } from "@reactchartjs/react-chart.js";

export const GraficaScreen = () => {
  const [state, setState] = useState({
    labelsGrafica: [],
    dataGrafica: [],
  });

  let colors = [];
  for (var i = 0; i < state.dataGrafica.length; i++) {
    let color;
    if (state.dataGrafica[i] >= 0 && state.dataGrafica[i] <= 70)
      color = "green";
    else if (state.dataGrafica[i] <= 90) color = "yellow";
    else {
      color = "red";
      state.dataGrafica[i] = 100;
    }
    colors[i] = color;
  }

  const data = {
    labels: state.labelsGrafica,
    datasets: [
      {
        label: "Porcentaje de Faltas",
        data: state.dataGrafica,
        backgroundColor: colors,
        borderColor: "#6610f2",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const getAsistencias = async () => {
    const url =
      "https://us-central1-softwell-vm.cloudfunctions.net/api/tec/asistenciastsds";
    const resp = await fetch(url);
    const { data } = await resp.json();
    setState({
      labelsGrafica: data.map((a) => a.noControl),
      dataGrafica: data.map((a) => a.porcentajeFaltas),
    });
  };

  useEffect(() => {
    getAsistencias();
  }, []);

  return (
    <>
      <div className="header">
        <h1 className="title">Asistencias TSDS</h1>
      </div>
      <HorizontalBar data={data} options={options} />
    </>
  );
};
