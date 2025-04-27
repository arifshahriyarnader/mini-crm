import { Layout } from "../index";
import { summaryData } from "../../constants/index";
import { SummaryCard } from "../../components/dashboard/SummaryCard";

export const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            buttonText={item.buttonText}
          />
        ))}
      </div>
    </Layout>
  );
};
