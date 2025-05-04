import { useEffect, useState } from "react";
import {
  getAllTotalClients,
  reminderDueSoon,
  totalProjectsCount,
  totalProjectStatus,
} from "../api/services";

export const useDashboard = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [reminderDue, setReminderDue] = useState(0);
  const [projectStatus, setProjectStatus] = useState<{
    counts: { pending: number; "in-progress": number; completed: number };
    total: number;
  }>({
    counts: { pending: 0, "in-progress": 0, completed: 0 },
    total: 0,
  });

  useEffect(() => {
    fetchTotalClientsCount();
    fetchTotalProjectsCount();
    fetchReminder();
    fetchTotalProjectStatus();
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

  const fetchReminder = async () => {
    try {
      const response = await reminderDueSoon();
      console.log("reminder:", response);
      setReminderDue(response);
    } catch (error) {
      console.log("Failed to fetch projects", error);
      setReminderDue(0);
    }
  };

  const fetchTotalProjectStatus = async () => {
    try {
      const statusData = await totalProjectStatus();
      setProjectStatus(statusData);
    } catch (error) {
      console.log("Failed to fetch project status", error);
      setProjectStatus({
        counts: { pending: 0, "in-progress": 0, completed: 0 },
        total: 0,
      });
    }
  };

  return { totalClients, totalProjects, reminderDue, projectStatus };
};
