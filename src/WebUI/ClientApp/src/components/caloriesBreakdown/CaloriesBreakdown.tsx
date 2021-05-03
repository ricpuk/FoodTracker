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

  const relative = (value: number) => {
    if (max == 0) {
      return 0;
    }
    return value / max;
  };

  const percentage = (value: number) => round(relative(value) * 100, 1);
  const percentageString = (value: number) => `${percentage(value)}%`;

  const proteinId = `${prefix}-protein-tt`;
  const carbsId = `${prefix}-carbs-tt`;
  const fatsId = `${prefix}-fats-tt`;
  const remainingId = `${prefix}-remaining-tt`;

  if (!carbs && !protein && !fats) {
    return (
      <React.Fragment>
        <Progress max={100} multi>
          <Progress bar color="light" value={100} id={remainingId}></Progress>
        </Progress>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Progress max={max} multi>
        <Progress
          bar
          color="primary"
          value={percentage(proteinCals)}
          id={proteinId}
        ></Progress>
        <Progress
          bar
          color="success"
          value={percentage(carbsCals)}
          id={carbsId}
        />
        <Progress bar color="danger" value={percentage(fatsCals)} id={fatsId} />
        <Progress
          bar
          color="light"
          value={percentage(remaining)}
          id={remainingId}
        />
      </Progress>
      <Tooltip
        placement="bottom"
        isOpen={proteinOpen}
        target={proteinId}
        toggle={() => setProteinOpen(!proteinOpen)}
      >
        Protein {percentageString(proteinCals)}
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={carbsOpen}
        target={carbsId}
        toggle={() => setCarbsOpen(!carbsOpen)}
      >
        Carbs: {percentageString(carbsCals)}
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={fatsOpen}
        target={fatsId}
        toggle={() => setFatsOpen(!fatsOpen)}
      >
        Fats {percentageString(fatsCals)}
      </Tooltip>
      <Tooltip
        placement="bottom"
        isOpen={remainingOpen}
        target={remainingId}
        toggle={() => setRemainingOpen(!remainingOpen)}
      >
        Remaining {percentageString(remaining)}
      </Tooltip>
    </React.Fragment>
  );
};
