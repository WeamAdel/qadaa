export enum Tab {
  Years = "years",
  TimeRange = "time-range",
  Count = "count",
}

export const tabValues = [Tab.Years as string, Tab.TimeRange as string, Tab.Count as string];

export interface TabInterface {
  title: string;
  value: Tab;
  component: JSX.Element;
}

export interface TabHeadInterface {
  heading: string;
  description: string;
}
