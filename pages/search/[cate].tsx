import CateHeader from "components/search/cate-header";
import { GetServerSideProps } from "next";
import CateList from "components/search/cate-list";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { cate } = query;
  return {
    props: {
      cate,
    },
  };
};

const Category = ({ cate }: { cate: string }) => {
  return (
    <>
      <CateHeader cate={cate} />
      <CateList cate={cate} />
    </>
  );
};

export default Category;
