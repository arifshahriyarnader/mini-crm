export interface SummaryItem {
    title: string;
    value: string;
    buttonText: string;
  }
  
  export const summaryData: SummaryItem[] = [
    { title: "Total Clients", value: "12", buttonText: "View All Clients" },
    { title: "Total Projects", value: "12", buttonText: "View All Projects" },
    { title: "Reminders Due Soon", value: "5", buttonText: "View All Reminders" },
    { title: "Projects by Status", value: "...", buttonText: "View Projects by Status" },
  ];
  