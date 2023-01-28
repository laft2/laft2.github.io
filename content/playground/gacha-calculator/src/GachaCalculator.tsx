import * as React from "react";
// import styled from "styled-components";
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ReferenceLine } from "recharts";

type SimpleAreaChartData = { xv: number, yv: number }[];
type GachaCalculatorState = {
  calcP: number,
  shownP: string | number,
  N: number,
  shownN: string | number,
}
export const GachaCalculator = () => {
  const [state, setState] = React.useState<GachaCalculatorState>({
    calcP: 5,
    shownP: 5,
    N: 300,
    shownN: 300
  })
  const handlePBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && 0 < value && value < 100) {
      setState(prev => ({
        ...prev,
        shownP: value,
        calcP: value
      }));
    } else {
      setState(prev => ({
        ...prev,
        shownP: prev.calcP
      }))
    }
  }
  const handlePChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      shownP: event.target.value
    }))
  }
  const handleNBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && 0 < value) {
      setState(prev => ({
        ...prev,
        N: value,
        shownN: value
      }));
    } else {
      setState(prev => ({
        ...prev,
        shownN: prev.N,
      }))
    }
  }
  const handleNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      shownN: event.target.value
    }))
  }
  return (
    <>
      <h2>最初に引くまでの確率</h2>
      <label>確率p[%]<input type="text" value={state.shownP} onChange={handlePChange} onBlur={handlePBlur} /></label>
      <label>回数N<input type="text" value={state.shownN} onChange={handleNChange} onBlur={handleNBlur} /></label>
      <div>p: {state.calcP}%</div>
      <div>N: {state.N}</div>
      <h3>累積分布</h3>
      <CumulativeChart p={state.calcP} N={state.N} />
      <h3>確率密度</h3>
      <DensityChart p={state.calcP} N={state.N} />
    </>
  )
}

type Parameter = {
  p: number, // percent
  N: number
}
const CumulativeChart = ({ p, N }: Parameter) => {
  const calcData = () => {
    const prob = p / 100;
    const probInv = 1 - prob;
    const data: SimpleAreaChartData = [];

    for (let index = 0, probInvToIndex = 1; index < N + 1; index++) {
      data.push({
        xv: index,
        yv: 1 - probInvToIndex // 1 - (1 - p)**index
      });
      probInvToIndex *= probInv;
    }
    return data;
  }
  return (
    <SimpleAreaChart data={calcData()} equity={100 / p} />
  )
}
const DensityChart = ({ p, N }: Parameter) => {
  const calcData = () => {
    const prob = p / 100;
    const probInv = 1 - prob;
    const data: SimpleAreaChartData = [];

    for (let index = 0, probInvToIndex = 1; index < N; index++) {
      data.push({
        xv: index + 1,
        yv: probInvToIndex * prob // p(1 - p)**index
      });
      probInvToIndex *= probInv;
    }
    return data;
  }
  return (
    <SimpleAreaChart data={calcData()} domainMax='auto' equity={100 / p} />
  )
}


type SimpleAreaChartProps = {
  data: SimpleAreaChartData,
  tooltipName?: string,
  domainMax?: string | number,
  equity?: number | null,
}
const SimpleAreaChart = ({ data, tooltipName = "prob", domainMax = 1, equity = null }: SimpleAreaChartProps) => {
  return (
    <AreaChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="xv" type="number" tickCount={10} domain={['dataMin', 'dataMax']} />
      <YAxis type="number" domain={[0, domainMax]} name="probability" dataKey="yv" />
      <Tooltip formatter={(value: any, _: any, __: any) => [value, tooltipName]} />
      <Area type="monotone" dataKey="yv" stroke="#8884d8" />
      {equity !== null && (
        <ReferenceLine x={equity} stroke="red" label="期待値" />
      )}
    </AreaChart>
  )
}