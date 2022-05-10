import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'types/common';

const InterestedCategory: NextPageWithLayout = () => {
  const router = useRouter();

  console.log(router);
  return (
    <div>{router.query.category}</div>
  )
};


export default InterestedCategory