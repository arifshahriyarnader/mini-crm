import { Layout } from "../index";
import { staticSummaryData } from "../../constants/index";
import { SummaryCard } from "../../components/dashboard/SummaryCard";
import { useDashboard } from "../../hooks/useDashboard";

export const Dashboard = () => {
  const { totalClients, totalProjects, reminderDue, projectStatus } =
    useDashboard();

  const summaryData = staticSummaryData.map((item) => {
    if (item.title === "Total Clients") {
      return { ...item, value: totalClients.toString() };
    }
    if (item.title === "Total Projects") {
      return { ...item, value: totalProjects.toString() };
    }
    if (item.title === "Reminders Due Soon") {
      return { ...item, value: reminderDue.toString() };
    }
    if (item.title === "Projects by Status") {
      return {
        ...item,
        value: `Pending: ${projectStatus.counts.pending}, In Progress: ${projectStatus.counts["in-progress"]}, Completed: ${projectStatus.counts.completed}`,
      };
    }
    return item;
  });

  return (
    <Layout title="Dashboard">
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {summaryData.map((item, index) => (
            <SummaryCard
              key={index}
              title={item.title}
              value={item.value || "N/A"}
              buttonText={item.buttonText}
              route={item.route}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
