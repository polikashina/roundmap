import React, { ForwardRefRenderFunction, forwardRef } from "react";
import { Sector } from "recharts";
import type { AreaSettings } from "../types/AreaSettings";
import {
  CHART_PADDING,
  DEGREE_START,
  TEXT_GAP,
  ChartTextAlign,
} from "./constants";

import styles from "./PieChart.css";

type PieChartProps = {
  items: AreaSettings[];
  viewBoxSize: number;
};

type Coordinate = {
  x: number;
  y: number;
};

const RADIAN = Math.PI / 180;

const getRadius = (value: number, size: number): number => {
  return ((size / 2) * value) / 10;
};

// Recharts polar convention: angle in degrees, positive angles go
// counter-clockwise, and `polarToCartesian` negates the angle to draw into the
// SVG coordinate system (y grows downwards). The chart starts at the top and
// sectors are laid out clockwise, matching the original `DEGREE_START` (-90).
const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number
): Coordinate => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius,
});

const PieChartComponent: ForwardRefRenderFunction<
  SVGSVGElement,
  PieChartProps
> = ({ items, viewBoxSize }, ref) => {
  const canvasSize = viewBoxSize;
  const chartSize = Math.max(viewBoxSize - CHART_PADDING * 2, 0);

  const renderPath = () => {
    const center: Coordinate = {
      x: CHART_PADDING + chartSize / 2,
      y: CHART_PADDING + chartSize / 2,
    };

    if (items.length === 1) {
      const { value, name, color } = items[0];
      const radius = getRadius(value, chartSize);
      const startTop = -DEGREE_START;

      return (
        <>
          <Sector
            key="circle"
            cx={center.x}
            cy={center.y}
            innerRadius={0}
            outerRadius={radius}
            startAngle={startTop}
            endAngle={startTop - 360}
            fill={color}
            className={styles["pie-chart__sector"]}
          />
          <text
            key="text"
            x={center.x}
            y={center.y - radius - TEXT_GAP}
            textAnchor={ChartTextAlign.Middle}
            className={styles["pie-chart__text"]}
          >
            {name} <tspan>{value}</tspan>
          </text>
        </>
      );
    }

    const itemSize = 360 / items.length;
    // Recharts measures 0° at 3 o'clock, so the top (12 o'clock) is -DEGREE_START.
    const startTop = -DEGREE_START;

    return items.map(({ name, value, color }, index) => {
      const radius = getRadius(value, chartSize);
      const startAngle = startTop - itemSize * index;
      const endAngle = startTop - itemSize * (index + 1);
      const midAngle = (startAngle + endAngle) / 2;

      const labelPos = polarToCartesian(
        center.x,
        center.y,
        radius + TEXT_GAP,
        midAngle
      );
      const cos = Math.cos(-RADIAN * midAngle);

      let align: ChartTextAlign;
      if (cos > 0.05) {
        align = ChartTextAlign.Start;
      } else if (cos < -0.05) {
        align = ChartTextAlign.End;
      } else {
        align = ChartTextAlign.Middle;
      }

      return (
        <React.Fragment key={`sector-${index}`}>
          <Sector
            cx={center.x}
            cy={center.y}
            innerRadius={0}
            outerRadius={radius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={color}
            className={styles["pie-chart__sector"]}
          />
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor={align}
            className={styles["pie-chart__text"]}
          >
            {name} <tspan>{value}</tspan>
          </text>
        </React.Fragment>
      );
    });
  };

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${canvasSize} ${canvasSize}`}
      width="100%"
      height="100%"
      style={{ display: "block", width: canvasSize, height: canvasSize }}
    >
      {renderPath()}
    </svg>
  );
};

export const PieChart = forwardRef(PieChartComponent);
