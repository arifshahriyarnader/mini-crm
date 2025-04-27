export interface SummaryItem {
  title: string;
  value: string;
  buttonText: string;
  route: string;
}

export const summaryData: SummaryItem[] = [
  {
    title: "Total Clients",
    value: "12",
    buttonText: "View All Clients",
    route: "/clients",
  },
  {
    title: "Total Projects",
    value: "12",
    buttonText: "View All Projects",
    route: "/projects",
  },
  {
    title: "Reminders Due Soon",
    value: "5",
    buttonText: "View All Reminders",
    route: "/reminders",
  },
  {
    title: "Projects by Status",
    value: "...",
    buttonText: "View Projects by Status",
    route: "/projects-by-status",
  },
];
