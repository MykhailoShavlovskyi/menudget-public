import {useRoute} from '@react-navigation/native';

export function useDishId() {
  const route = useRoute();
  return (route as any).params.dishId as number;
}
