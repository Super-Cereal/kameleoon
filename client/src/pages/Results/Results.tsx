import { useParams } from "react-router-dom";

import { getTest } from "@/entities/tests";
import { getSite } from "@/entities/sites";
import { useData } from "@/shared/api/requests";
import { PageLayout } from "@/shared/ui/PageLayout";

export const Results = () => {
  const { testId } = useParams() as { testId: string };

  const { data: test, isLoading: testLoading, error: testError } = useData(() => getTest(testId), [testId]);
  const {
    data: site,
    isLoading: siteLoading,
    error: siteError,
  } = useData(test?.siteId && (() => getSite(test?.siteId)), [test?.siteId]);

  const getContent = (data: unknown, isLoading: boolean, error: string | null) => {
    if (isLoading) {
      return <span>Loading...</span>;
    } else if (error) {
      return <span>Error: {error}</span>;
    } else {
      return data ? <span>{JSON.stringify(data)}</span> : null;
    }
  };

  return (
    <PageLayout title="Results" subtitle="Order basket redesing" hasBackButton>
      Test: {getContent(test, testLoading, testError)}
      Site: {getContent(site, siteLoading, siteError)}
    </PageLayout>
  );
};
