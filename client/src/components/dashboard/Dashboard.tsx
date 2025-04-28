import { Layout } from "../index";
import { staticSummaryData } from "../../constants/index";
import { SummaryCard } from "../../components/dashboard/SummaryCard";
import { useEffect, useState } from "react";
import { getAllTotalClients, reminderDueSoon, totalProjectsCount } from "../../api/services";

export const Dashboard = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [reminderDue, setReminderDue]= useState(0)

  useEffect(() => {
    fetchTotalClientsCount();
  }, []);

  useEffect(() => {
    fetchTotalProjectsCount();
  }, []);

  useEffect(() => {
    fetchReminder()
  }, [])

  const fetchTotalClientsCount = async () => {
    try {
      const response = await getAllTotalClients();
      console.log(response);
      setTotalClients(response);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const fetchTotalProjectsCount = async () => {
    try {
      const response = await totalProjectsCount();
      console.log("total projects:", response);
      setTotalProjects(response);
    } catch (error) {
      console.log("Failed to fetch projects", error);
      setTotalProjects(0);
    }
  };

  const fetchReminder= async() =>{
    try{
      const response=await reminderDueSoon();
      console.log("reminder:", response)
      setReminderDue(response)

    }
    catch(error){
      console.log("Failed to fetch projects", error);
      setReminderDue(0);
    }
  }

  const summaryData = staticSummaryData.map((item) => {
    if (item.title === "Total Clients") {
      return { ...item, value: totalClients.toString() };
    }
    if (item.title === "Total Projects") {
      return { ...item, value: totalProjects.toString() };
    }
    if(item.title === "Reminders Due Soon"){
      return {...item, value:reminderDue.toString()}
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
