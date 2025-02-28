import { useParams } from "react-router-dom";

import { getTest } from "@/entities/tests";
import { getSite } from "@/entities/sites";
import { useData } from "@/shared/api/requests";
import { PageLayout } from "@/shared/ui/PageLayout";

export const Finalize = () => {
  const { testId } = useParams() as { testId: string };

  const { data: test, isLoading: testLoading, error: testError } = useData(() => getTest(testId), [testId]);
  const {
    data: site,
    isLoading: siteLoading,
    error: siteError,
  } = useData(test?.siteId && (() => getSite(test?.siteId)), [test?.siteId]);

  const isLoading = testLoading || siteLoading;
  const error = testError || siteError;

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error: {error}</div>;
  } else {
    content = (
      <>
        {test && <div>Test: {JSON.stringify(test)}</div>}
        {site && <div>Site: {JSON.stringify(site)}</div>}
      </>
    );
  }

  return (
    <PageLayout title="Finalize" subtitle="Spring promotion" hasBackButton>
      {content}
    </PageLayout>
  );
};
