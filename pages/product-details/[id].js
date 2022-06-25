import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
import LeftSidebarPage from './product/leftSidebarPage';
import NoSidebarPage from './product/noSidebarPage';

const LeftSidebar = () => {
  
  const router = useRouter();
  const id = router.query.id;
  
  return (
    <CommonLayout parent="Home" title="Product">
        <NoSidebarPage pathId={id} />
      <ProductSection />
    </CommonLayout>
  );
}


export default LeftSidebar;