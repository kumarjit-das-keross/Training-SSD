'use client';

import React, {useRef, useEffect} from 'react';
import {init, getInstanceByDom} from 'echarts';


export default function ECharts({
                                  option,
                                  style,
                                  settings,
                                  loading,
                                  theme,
                                  onClick = () => {
                                  }
                                }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = undefined;

    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    function resizeChart() {
      console.log('resizeChart');
      chart?.resize();
    }

    window.addEventListener('resize', resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(option, settings);
      chart.on('click', onClick);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{width: '100%', height: '100%', minHeight: '200px', ...style}}/>;
  // return <div>{option.title}</div>;
}
