import React, { useState } from "react";
import { Progress, Tooltip } from "reactstrap";

interface CaloriesBreakdownProps {
  protein: number;
  fats: number;
  carbs: number;
  remaining?: number;
  prefix: string;
}
export default (props: CaloriesBreakdownProps) => {
  const [proteinOpen, setProteinOpen] = useState(false);
  const [carbsOpen, setCarbsOpen] = useState(false);
  const [fatsOpen, setFatsOpen] = useState(false);
  const [remainingOpen, setRemainingOpen] = useState(false);
  const { protein, fats, carbs, prefix } = props;
  const proteinCals = protein * 4;
  const carbsCals = carbs * 4;
  const fatsCals = fats * 9;
  const remaining = props.remaining ? props.remaining : 0;
  const max = proteinCals + carbsCals + fatsCals + remaining;

  const round = (num: number, precision: number) =>
    Number(Math.round(Number(`${num}e+${precision}`)) + "e-" + precision);

  const percentage = (value: number) => `${round((value / max) * 100, 1)}%`;

  const proteinId = `${prefix}-protein-tt`;
  const carbsId = `${prefix}-carbs-tt`;
  const fatsId = `${prefix}-fats-tt`;
  const remainingId = `${prefix}-remaining-tt`;

  return (
    <React.Fragment>
      <Progress max={max} multi>
        <Progress
          bar
          color="primary"
          value={proteinCals}
          id={proteinId}
        ></Progress>
        <Progress bar color="success" value={carbsCals} id={carbsId} />
        <Progress bar color="danger" value={fatsCals} id={fatsId} />
        <Progress bar color="light" value={remaining} id={remainingId} />
      </Progress>
      <Tooltip
        placement="bottom"
        isOpen={proteinOpen}
        target={proteinId}
        toggle={() => setProteinOpen(!proteinOpen)}
      >
        Protein {percentage(proteinCals)}
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={carbsOpen}
        target={carbsId}
        toggle={() => setCarbsOpen(!carbsOpen)}
      >
        Carbs: {percentage(carbsCals)}
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={fatsOpen}
        target={fatsId}
        toggle={() => setFatsOpen(!fatsOpen)}
      >
        Fats {percentage(fatsCals)}
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={remainingOpen}
        target={remainingId}
        toggle={() => setRemainingOpen(!remainingOpen)}
      >
        Remaining {percentage(remaining)}
      </Tooltip>
    </React.Fragment>
  );
};
