export enum Tab {
  byYears = "years",
  byTimeRange = "time-range",
  byCount = "count",
}

export interface TabInterface {
  title: string;
  value: Tab;
  component: JSX.Element;
}
