import React, {
  ReactNode,
  forwardRef,
  RefObject,
  ForwardRefRenderFunction,
} from "react";
import partialCircle from "svg-partial-circle";
import type { AreaSettings } from "../types/AreaSettings";
import { DEGREE_START, TEXT_GAP, ChartTextAlign } from "./constants";

import styles from "./PieChart.css";

type PieChartProps = {
  items: AreaSettings[];
  viewBoxSize: number;
};

type Coordinate = {
  x: number;
  y: number;
};

interface ChartText extends Coordinate {
  align: ChartTextAlign;
}

type Path = {
  path: string;
  name: string;
  color: string;
  text: ChartText;
};

const getDegrees = (radius: number): number => {
  return (Math.PI / 180) * radius;
};

const getRadius = (value: number, size: number): number => {
  return ((size / 2) * value) / 10;
};

const PieChartComponent: ForwardRefRenderFunction<
  SVGSVGElement,
  PieChartProps
> = ({ items, viewBoxSize }, ref) => {
  const chartPath: Path[] = [];
  const canvasSize = viewBoxSize;
  const chartSize = viewBoxSize;

  const renderPath = () => {
    const center: Coordinate = { x: canvasSize / 2, y: canvasSize / 2 };

    if (items.length === 1) {
      const { value, name, color } = items[0];
      const radius = getRadius(value, chartSize);

      return (
        <>
          <circle
            key="circle"
            cx={center.x}
            cy={center.y}
            r={radius}
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
    let angleStart = getDegrees(DEGREE_START);

    items.forEach(({ name, value, color }, index) => {
      const radius = getRadius(value, canvasSize);

      const angleEnd = getDegrees(DEGREE_START + itemSize * (index + 1));
      const path = partialCircle(
        center.x,
        center.y,
        radius,
        angleStart,
        angleEnd
      );

      const sectorEndY = Number(path[1][7]);
      const sectorStartY = Number(path[0][2]);
      let text: ChartText;

      if (sectorEndY === sectorStartY) {
        text = {
          x: center.x,
          y: center.y + radius + TEXT_GAP * 2,
          align: ChartTextAlign.Middle,
        };
      } else if (sectorEndY > sectorStartY) {
        text = {
          x: center.x + radius + TEXT_GAP,
          y: (sectorEndY - sectorStartY) / 2 + sectorStartY,
          align: ChartTextAlign.Start,
        };
      } else {
        text = {
          x: center.x - radius - TEXT_GAP,
          y: (sectorStartY - sectorEndY) / 2 + sectorEndY,
          align: ChartTextAlign.End,
        };
      }

      chartPath.push({
        color,
        name,
        path:
          path.map((p) => p.join(" ")).join(" ") +
          ` L ${center.x} ${center.y} Z`,
        text,
      });
      angleStart = angleEnd;
    });

    return chartPath.reduce(
      (res, { color, path, name, text }, index) => [
        ...res,
        <path
          key={`area-${index}`}
          d={path}
          strokeWidth={2}
          fill={color}
          className={styles["pie-chart__sector"]}
        />,
        <text
          key={`text-${index}`}
          x={text.x}
          y={text.y}
          textAnchor={text.align}
          className={styles["pie-chart__text"]}
        >
          <tspan>{items[index].value}</tspan>
        </text>,
      ],
      [] as ReactNode[]
    );
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
