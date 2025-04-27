import { Layout } from "../index";
import { staticSummaryData } from "../../constants/index";
import { SummaryCard } from "../../components/dashboard/SummaryCard";
import { useEffect, useState } from "react";
import { getAllTotalClients } from "../../api/services";

export const Dashboard = () => {
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    fetchTotalClientsCount();
  }, []);
  const fetchTotalClientsCount = async () => {
    try {
      const response = await getAllTotalClients();
      console.log(response);
      setTotalClients(response);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };
  const summaryData = staticSummaryData.map((item) => {
    if (item.title === "Total Clients") {
      return { ...item, value: totalClients.toString() };
    }
    return item;
  });
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
    </Layout>
  );
};
