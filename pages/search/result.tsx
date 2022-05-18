import { GetServerSideProps } from "next";
import Header from "components/search/result-header";
import ResultList from "components/search/result-list";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { query: search } = query;
  return {
    props: {
      search,
    },
  };
};

const Result = ({ search }: { search: string }) => {
  return (
    <>
      <Header search={search} />
      <ResultList search={search} />
    </>
  );
};

export default Result;
