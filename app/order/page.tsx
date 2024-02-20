'use client';
import { useEffect, useState } from 'react';
import { postOrder } from '@/services/orderAPI';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import { LuX } from 'react-icons/lu';

interface CartProps {
  door: boolean;
  spoon: boolean;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Order = () => {
  const [door, setDoor] = useState(false);
  const [spoon, setSpoon] = useState(false);

  //const user = useRecoilValue(userInfoAtom);
  //const token = user.accessToken;
  //const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;

  const bill = {
    shopId: 1,
    address: {
      zipcode: '39201',
      street: '도봉로5길 21',
      detail: '도량그린빌..',
    },
    orderItems: [
      {
        createdAt: null,
        updatedAt: null,
        id: null,
        price: 2000,
        quantity: 1,
        menuName: 'choco맛커피',
        orderItemOptions: [
          {
            id: null,
            optionName: '아무것도',
            price: 500,
          },
        ],
      },
    ],
    requestMsg: '요청사항 없음',
    requestDoor: true,
    requestSpoon: false,
    orderType: 'DELIVERY',
    paymentType: 'CARD',
    totalPrice: 20000,
    deliveryPrice: 1000,
    totalPaymentPrice: 21000,
  };

  const handleGetOrder = () => {
    postOrder(bill);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxID = e.target.id;
    switch (checkboxID) {
      case 'checkDoor':
        setDoor(!door);
        break;
      case 'checkSpoon':
        setSpoon(!spoon);
        break;
      default:
        console.log('해당하는 요소 없음');
    }
  };
  /**
  return (
    <>
      <div>
        <button onClick={handleGetOrder}>냅다 주문하기</button>
      </div>
    </>
  );
  */

  const [mintime, maxtime] = [0, 10];

  return (
    <div className="p-4">

      <div className="flex flex-row text-sm pt-2 pb-2 border-b-2 border-grey1">
        <span className="pr-1 font-semibold">가게배달</span>
        <span>{`${mintime}~${maxtime}분 후 도착`}</span>
      </div>

      <Address />
      <Cart />
      <OrderNotes door={door} spoon={spoon} handler={handleCheckboxChange}/>
      <Prices />
      
      <div className="p-6 text-sm bg-grey8 text-grey5 mt-2">
        <p>개인정보 제3자 제공 내용 및 결제에 동의합니다.</p>
        <p>최소주문금액은 배달요금/일회용컵 보증금을 제외한 금액입니다.</p>
        <p>배달요금에는 할인수단이 적용되지 않습니다? (단, 배달요금 관련 할인/선물은 적용)</p>
      </div>

    </div>
  );
};

export default Order;


const Cart = () => {
  return(
    <div className="rounded-lg border">
        <div className="flex p-4">
          <div className="flex-1 font-bold">후라이드참못하는집</div>
          <div className="ml-auto text-sm text-grey4">전체삭제</div>
        </div>
        <div>
          {/** 주문한 메뉴 map*/}
          <div className="flex p-4">
            <div className="w-20 h-20 bg-grey2"></div>
            <div className="flex-1 pl-2 pr-2">
              <p className="font-bold pb-2">양념치킨</p>
              <p className="text-sm">핫간장치킨반마리</p>
              <p className="text-sm">24,500원</p>
            </div>
            <LuX
              style={{
                marginTop: '0.5rem',
                marginBottom: 'auto',
                fontSize: '1.3rem',
                color: 'grey',
              }}
            />
          </div>
          <div className="flex">
            <div className="flex-1"></div>
            <div className="flex rounded-md border text-center pt-[10px] pb-[10px] mr-4">
              <div className="grid pl-4">
                <LuMinus style={{ margin: 'auto' }} />
              </div>
              <div className="pr-4 pl-4">{/* 이 메뉴의 갯수 */ 1}</div>
              <div className="grid pr-4">
                <LuPlus style={{ margin: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-blue1 font-semibold justify-center p-4">
          <div className="mt-[3px]">
            <FiPlus />
          </div>
          <div>메뉴추가하기</div>
        </div>
      </div>
  )
}

const OrderNotes = ({door, spoon, handler}: CartProps) => {
  return(
    <div className="rounded-lg border p-4 mt-4">
        <p className="font-bold">주문요청사항</p>
        <div className="flex pt-4 pb-4 border-b">
          <input type="checkbox" id="checkDoor" checked={door} onChange={handler} />
          <div className="pl-2">
            <label htmlFor="checkDoor">문 앞에 놓고, 문자주세요.</label>
          </div>
        </div>
        <div className="flex pt-4 pb-4 border-b">
          <input type="checkbox" id="checkSpoon" checked={spoon} onChange={handler} />
          <div className="pl-2">
            <label htmlFor="checkSpoon">일회용 수저, 포크가 필요해요.</label>
            <p className="text-green-600 text-sm">
              지구를 지키는 작은 실천! <span className="font-bold">현재까지 140회 참여</span>
            </p>
          </div>
        </div>
        <div className="flex pt-4">
          <div className="flex-1 text-grey4">요청사항을 선택하세요</div>
          <HiOutlineChevronRight style={{ margin: 'auto' }} />
        </div>
      </div>
  )
}

const Address = () => {
  return(
    <div className="pt-2 pb-2 min-h-[75px]">
      <div className="flex">
        <span className="mt-[3px]">
          <HiOutlineHome />
        </span>
        <div className="flex flex-col pr-2 pl-2">
          <p>집(으)로 배달</p>
          <p className="text-sm">집주소</p>
        </div>
        <span className="mt-[3px]">
          <HiOutlineChevronRight />
        </span>
      </div>
    </div>
  )
}

const Prices = () => {
  return(
    <div className="mt-4">
      <div className="flex pt-[6px]">
        <div>상품금액</div>
        <div className="ml-auto">원</div>
      </div>
      <div className="flex pt-2 pb-[6px]">
        <div>배달금액</div>
        <div className="ml-auto">원</div>
      </div>
      <div className="flex pt-4 pb-4 font-bold border-t border-t-grey2">
        <div>총 결제금액</div>
        <div className="ml-auto">원</div>
      </div>
    </div>
  )
}