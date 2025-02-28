import { getTests, type ITest, getSites, type ISite } from "../api";

export interface IRow extends ITest {
  site: ISite | undefined;
}

export const getRows = async (): Promise<IRow[] | null> => {
  const [tests, sites] = await Promise.all([getTests(), getSites()]);

  return adapter(tests, sites);
};

const adapter = (tests: ITest[] | undefined, sites: ISite[] | undefined) => {
  return (
    tests?.map((test) => ({
      ...test,
      site: sites?.find((site) => site.id === test.siteId),
    })) || null
  );
};
