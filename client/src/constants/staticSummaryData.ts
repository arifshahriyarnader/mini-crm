export interface SummaryItem {
  title: string;
  value?: string;
  buttonText: string;
  route: string;
}

export const staticSummaryData: SummaryItem[] = [
  {
    title: "Total Clients",
    buttonText: "View All Clients",
    route: "/clients",
  },
  {
    title: "Total Projects",
    buttonText: "View All Projects",
    route: "/projects",
  },
  {
    title: "Reminders Due Soon",
    buttonText: "View All Reminders",
    route: "/reminders",
  },
  {
    title: "Projects by Status",
    buttonText: "View Projects by Status",
    route: "/projects",
  },
];
