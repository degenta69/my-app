export type LineChartData = number[]

export type BarChartData = {
    date: Date;
    amount: number;
}[]

export type StackedBarChartData = {
    date: Date;
    unhcr_resettlement: number;
    other_resettlement: number;
  }[]
