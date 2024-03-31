'use client';
import TabMenu from '@/components/common/TabMenu';
import React, { useState, useEffect } from 'react';
import DeliveryOrderList from './(delivery)/page';

const tabData = {
  left: '배달/포장',
  right: '요마트/요편의점' };

const OrderList = () => {
  const [tab, setTab] = useState('left');

  const handleGetSelected = (selectedTab: string) => {
    setTab(selectedTab);
  };

  const abc = 0;

  return (
    <div className="bg-grey1">
      <TabMenu
        tabData={tabData}
        selectedTab={tab}
        handleGetSelected={handleGetSelected}
      ></TabMenu>
      {
        tab === 'left' ? 
        <DeliveryOrderList /> : 
        <div></div>
      }
    </div>
  );
};

export default OrderList;


