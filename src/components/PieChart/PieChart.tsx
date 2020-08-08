import React, { useCallback } from "react";
import partialCircle from "svg-partial-circle";
import './PieChart.scss'

export type ChartItem = {
  id: number
  title: string
  value: number
  color: string
}

type Props = {
  items: ChartItem[]
  viewBoxSize: number
  onClick: (id: number) => void
};

type Сoordinate = {
  x: number
  y: number
};

enum ChartTextAlign {
  Start = 'start',
  End = 'end',
  Middle = 'middle'
}

interface ChartText extends Сoordinate {
  align: ChartTextAlign
}

type Path = {
  id: number
  path: string
  title: string
  color: string
  text: ChartText
}

const getDegrees = (radius: number): number => {
  return (Math.PI / 180) * radius;
};

const PieChart: React.FC<Props> = props => {
  const { items, viewBoxSize, onClick } = props;
  const degreeStart = -90;
  const chartPath: Path[] = [];
  const canvasSize = 600
  const chartSize = viewBoxSize
  const TEXT_GAP = 20

  const getRadius = useCallback(
    (value: number): number => {
      return ((chartSize / 2) * value) / 10;
    },
    [chartSize],
  );

  const renderPath = useCallback(() => {
    const center: Сoordinate = { x: canvasSize / 2, y: canvasSize / 2 };

    if (items.length === 1) {
      const { id, value, title, color } = items[0];
      const radius = getRadius(value)

      return (
        <>
          <circle cx={center.x} cy={center.y} r={radius} fill={color} className="pie-chart__sector" onClick={() => onClick(id)}/>
          <text x={center.x} y={center.y - radius - TEXT_GAP} textAnchor={ChartTextAlign.Middle} className='pie-chart__text pie-chart__text--middle' onClick={() => onClick(id)}>
            {title} <tspan>{value}</tspan>
          </text>
        </>
      );
    }

    const itemSize = 360 / items.length;
    let angleStart = getDegrees(degreeStart);
    let angleEnd;

    items.forEach(({ id, title, value, color }, index) => {
      angleEnd = getDegrees(degreeStart + itemSize * (index + 1));
      const path = partialCircle(center.x, center.y, getRadius(value), angleStart, angleEnd);
      const sectorEndY = Number(path[1][7])
      const sectorStartY = Number(path[0][2])
      let text: ChartText

      if  (sectorEndY === sectorStartY) {
        text = {
          x: center.x,
          y: center.y + getRadius(value) + TEXT_GAP * 2,
          align: ChartTextAlign.Middle
        }
      } else if  (sectorEndY > sectorStartY) {
        text = {
          x: center.x + getRadius(value) + TEXT_GAP,
          y: (sectorEndY - sectorStartY ) / 2 + sectorStartY,
          align: ChartTextAlign.Start
        }
      } else {
        text = {
          x: center.x - getRadius(value) - TEXT_GAP,
          y: (sectorStartY - sectorEndY) / 2 + sectorEndY,
          align: ChartTextAlign.End
        }
      }

      chartPath.push({
        id,
        color,
        title,
        path: path.map(p => p.join(" ")).join(" ") + ` L ${center.x} ${center.y} Z`,
        text
      });
      angleStart = angleEnd;
    });

    return chartPath.map(({ id, color, path, title, text }, index) => {
      return (
        <>
          <path key={`area-${index}`} d={path} strokeWidth={2} fill={color} className="pie-chart__sector" onClick={() => onClick(id)}></path>
          <text key={`text-${index}`} x={text.x} y={text.y} textAnchor={text.align} className={`pie-chart__text pie-chart__text--${text.align}`} onClick={() => onClick(id)}>
            {title} <tspan>{items[index].value}</tspan>
          </text>
        </>
      );
    });
  }, [items, onClick]);


  return (
    <svg
      viewBox={`0 0 ${canvasSize} ${canvasSize}`}
      width="100%"
      height="100%"
      style={{ display: "block", width: canvasSize, height: canvasSize }}
    >
      {renderPath()}
    </svg>
  );
};

export { PieChart };
