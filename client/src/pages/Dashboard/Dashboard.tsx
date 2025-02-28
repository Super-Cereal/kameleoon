import { TestsTable } from "@/widgets/TestsTable/ui/TestsTable/TestsTable";
import { PageLayout } from "@/shared/ui/PageLayout";

export const Dashboard = () => {
  return (
    <PageLayout title="Dashboard">
      <TestsTable />
    </PageLayout>
  );
};
