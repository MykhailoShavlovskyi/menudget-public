import {ActiveOrder, ActiveOrderDish} from '../../store/models';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {groupBy} from 'lodash';
import styled from 'styled-components/native';
import {css} from 'styled-components';
import {OrderIcon} from '../icons/Order';
import {Money} from '../icons/Money';
import {Brush} from '../icons/Brush';
import {OrderState} from '../../lib/OrderState';
import {useMount} from 'react-use';

const StyledContainer = styled(View)`
  height: 100%;
  background-color: white;
`;

const StyledScrollContainer = styled(ScrollView)`
  padding-left: 14px;
  padding-right: 14px;
  background-color: white;
`;

const StyledTableName = styled(Text)`
  font-size: 15.5px;
  font-weight: 600;
  font-family: Avenir;
  margin-bottom: 8px;
  margin-left: 14px;
`;

const StyledCardContainer = styled(ScrollView)`
  overflow: visible;
`;

const StyledCard = styled(View)<{noBorder: boolean}>`
  background-color: white;
  border-radius: 10px;
  padding: 13px;
  width: ${Dimensions.get('window').width - 26}px;
  height: 70px;
  ${(v: any) =>
    v.noBorder
      ? ''
      : css`
          box-shadow: 0 0 8px #e0e0e0;
        `}
  margin-bottom: 9px;
  flex-direction: row;
`;

const StyledThumbnailContainer = styled.View`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

type ImageProps = {placeholder?: boolean};
const StyledThumbnail = styled.Image<ImageProps>`
  resize-mode: contain;
  width: ${(p: ImageProps) => (p.placeholder ? '45px' : '100%')};
  height: ${(p: ImageProps) => (p.placeholder ? '45px' : '100%')};
  border-radius: ${(p: ImageProps) => (p.placeholder ? '10px' : '0')};
  opacity: ${(p: ImageProps) => (p.placeholder ? '0.6' : '1')};
`;

const StyledCount = styled.Text`
  font-family: Avenir;
  font-weight: 600;
  font-size: 14px;
  margin-right: 10px;
`;

const StyledNameContainer = styled.View`
  height: 100%;
  flex: 2.6;
  padding: 1px 22px;
`;

const StyledName = styled(Text)`
  font-family: Avenir;
  font-weight: 600;
  font-size: 15.25px;
  color: black;
`;

const StyledPrice = styled.Text`
  bottom: -1.75px;
  font-family: Avenir;
  font-weight: 600;
  font-size: 15.25px;
  color: #b2b2b2;
`;

const StyledDateContainer = styled.View`
  height: 100%;
  flex: 1;
`;

const StyledTime = styled.Text`
  font-weight: 600;
  font-family: Avenir;
  font-size: 11.5px;
  top: 4.5px;
  right: 0;
  position: absolute;
`;

const StyledDate = styled.Text`
  font-weight: 600;
  font-family: Avenir;
  font-size: 11.5px;
  right: 0;
  bottom: 0;
  position: absolute;
  color: #b2b2b2;
`;

const StyledSplitterContainer = styled.View`
  margin-top: 7px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const StyledSplitter = styled.View`
  border-top-color: #e5e4e4;
  border-top-width: 1px;
  width: 92%;
`;

const StyledAction = styled.TouchableOpacity<{disabled: boolean}>`
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;

  ${(v: any) =>
    v.disabled &&
    css`
      opacity: 0.2;
    `}
`;

const StyledSetDeliveredAction = styled(StyledAction)`
  border-radius: 8px 0 0 8px;
  background-color: #ffa723;
  margin-left: 16px;
`;

const StyledSetPayedAction = styled(StyledAction)`
  background-color: #25a658;
`;

const StyledSetIdleAction = styled(StyledAction)`
  border-radius: 0 8px 8px 0;
  background-color: #a9a9a9;
`;

const StyledActionText = styled(Text)`
  margin: 4px 0 0;
  font-size: 9px;
  text-align: center;
  color: white;
  font-weight: bold;
`;

const Card = ({
  id,
  createdAt,
  state,
  payed,
  dishes,
  tableCanBeIdle,
  onInitOrder,
  onPress,
  onSetPayed,
  onSetDelivered,
  onSetIdle,
}: {
  id: number;
  createdAt: Date;
  state: string;
  payed: boolean;
  tableCanBeIdle: boolean;
  dishes: ActiveOrderDish[];
  onInitOrder: (ref: ScrollView) => void;
  onPress: () => void;
  onSetPayed: () => void;
  onSetDelivered: () => void;
  onSetIdle: () => void;
}) => {
  let minutes = createdAt.getMinutes().toString();
  let month = (createdAt.getMonth() + 1).toString();
  let day = createdAt.getDate().toString();
  let year = createdAt.getFullYear().toString();
  if (minutes.length === 1) minutes = '0' + minutes;
  if (day.length === 1) day = '0' + day;
  if (month.length === 1) month = '0' + month;

  const uri = dishes[0].imageKeys[0];
  const singleDish = dishes.length === 1;

  const scrollRef = useRef<ScrollView>();

  useEffect(() => {
    if (scrollRef.current != null) onInitOrder(scrollRef.current);
  }, [scrollRef.current]);

  const handleActionPress = () => {
    scrollRef.current?.scrollTo({x: 0});
    onPress();
  };

  const handleEndScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    if (offset > 116) scrollRef.current?.scrollTo({x: 1000});
    else scrollRef.current?.scrollTo({x: 0});
  };

  return (
    <StyledCardContainer
      ref={scrollRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      onScrollBeginDrag={onPress}
      onScrollEndDrag={handleEndScroll}>
      <TouchableWithoutFeedback onPress={onPress}>
        <StyledCard noBorder={singleDish}>
          <StyledThumbnailContainer>
            {singleDish && <StyledCount>x{dishes[0].count}</StyledCount>}
            <StyledThumbnail
              source={
                uri ? {uri} : require('../../../assets/images/placeholder.png')
              }
              placeholder={uri == null}
            />
          </StyledThumbnailContainer>
          <StyledNameContainer>
            <StyledName>
              {singleDish ? dishes[0].name : `Order #${id}`}
            </StyledName>
            <StyledPrice>
              {singleDish ? '' : 'Total: '}$
              {dishes.map(v => v.count * v.price).reduce((a, c) => a + c)}
            </StyledPrice>
          </StyledNameContainer>
          <StyledDateContainer>
            <StyledTime>
              {createdAt.getHours()}:{minutes}
            </StyledTime>
            <StyledDate>
              {day}.{month}.{year[2]}
              {year[3]}
            </StyledDate>
          </StyledDateContainer>
        </StyledCard>
      </TouchableWithoutFeedback>

      <StyledSetDeliveredAction
        disabled={state !== OrderState.Done} // TODO or delivered
        onPress={() => {
          onSetDelivered();
          handleActionPress();
        }}>
        <OrderIcon />
        <StyledActionText>Set delivered</StyledActionText>
      </StyledSetDeliveredAction>

      <StyledSetPayedAction
        disabled={payed}
        onPress={() => {
          onSetPayed();
          handleActionPress();
        }}>
        <Money />
        <StyledActionText style={{marginTop: 8.25}}>Set payed</StyledActionText>
      </StyledSetPayedAction>

      <StyledSetIdleAction
        disabled={!tableCanBeIdle}
        onPress={() => {
          onSetIdle();
          handleActionPress();
        }}>
        <Brush />
        <StyledActionText style={{marginTop: 7}}>Clean</StyledActionText>
      </StyledSetIdleAction>
    </StyledCardContainer>
  );
};

const TableOrders = ({
  last,
  orders,
  onInitOrder,
  onPress,
  onSetPayed,
  onSetDelivered,
  onSetIdle,
}: {
  last: boolean;
  orders: ActiveOrder[];
  onInitOrder: (id: number, ref: ScrollView) => void;
  onPress: (id: number) => void;
  onSetPayed: (id: number) => void;
  onSetDelivered: (id: number) => void;
  onSetIdle: (tableId: number) => void;
}) => {
  return (
    <View>
      <StyledTableName>{orders[0].tableName}:</StyledTableName>
      {orders.map(v => {
        const tableCanBeIdle = orders.every(
          v => v.payed && v.delivered && v.state === OrderState.Done,
        );

        return (
          <Card
            key={v.id}
            id={v.id}
            createdAt={v.createdAt}
            dishes={v.dishes}
            state={v.state}
            payed={v.payed}
            tableCanBeIdle={tableCanBeIdle}
            onInitOrder={ref => onInitOrder(v.id, ref)}
            onPress={() => onPress(v.id)}
            onSetPayed={() => onSetPayed(v.id)}
            onSetDelivered={() => onSetDelivered(v.id)}
            onSetIdle={() => onSetIdle(v.tableId)}
          />
        );
      })}
      {!last && (
        <StyledSplitterContainer>
          <StyledSplitter />
        </StyledSplitterContainer>
      )}
    </View>
  );
};

let orderRefs: Record<string, ScrollView> = {};

export const Orders = ({
  orders,
  onSetPayed,
  onSetDelivered,
  onSetIdle,
}: {
  orders: ActiveOrder[];
  onSetPayed: (id: number) => void;
  onSetDelivered: (id: number) => void;
  onSetIdle: (tableId: number) => void;
}) => {
  useMount(() => {
    console.debug('mount');
    orderRefs = {};
  });
  const handleInitOrder = (id: number, ref: ScrollView) => {
    console.debug('init');
    orderRefs[id] = ref;
  };

  const handleOrderScroll = (orderId: number) => {
    console.debug('press', Object.keys(orderRefs));
    for (const id in orderRefs) {
      console.debug(id);
      if (Number(id) !== orderId) {
        console.debug('Scroll');
        orderRefs[id]?.scrollTo({x: 0});
      }
    }
  };

  const nodes = useMemo(() => {
    const nodes = [];
    const groupped = groupBy(orders, o => o.tableId);
    const keys = Object.keys(groupped);
    for (const tableId in groupped) {
      nodes.push(
        <TableOrders
          key={tableId}
          orders={groupped[tableId]}
          last={keys.indexOf(tableId) === keys.length - 1}
          onInitOrder={handleInitOrder}
          onPress={handleOrderScroll}
          onSetPayed={onSetPayed}
          onSetDelivered={onSetDelivered}
          onSetIdle={onSetIdle}
        />,
      );
    }
    return nodes;
  }, [orders]);

  return (
    <StyledContainer>
      <StyledScrollContainer
        style={{marginTop: useSafeAreaInsets().top + 100, paddingTop: 32}}>
        {nodes}
        <View style={{height: useSafeAreaInsets().bottom + 85}}></View>
      </StyledScrollContainer>
    </StyledContainer>
  );
};
