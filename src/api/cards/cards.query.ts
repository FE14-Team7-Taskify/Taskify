import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CreateCardRequest,
  CreateCardResponse,
  FindCardsRequest,
  FindCardsResponse,
  UpdateCardRequest,
  UpdateCardResponse,
} from './cards.schema';
import { cardsService } from './cards.service';

const cardsQuery = {
  all: () => ['cards'],
  cardListKey: (params: FindCardsRequest) => [...cardsQuery.all(), params],
  cardList: (params: FindCardsRequest) =>
    queryOptions({
      queryKey: cardsQuery.cardListKey(params),
      queryFn: () => cardsService.getCards(params),
    }),
  cardDetailKey: (cardId: number) => [...cardsQuery.all(), 'detail', cardId],
  cardDetail: (cardId: number) =>
    queryOptions({
      queryKey: cardsQuery.cardDetailKey(cardId),
      queryFn: () => cardsService.getCardDetail(cardId),
    }),
};

/**
 * 카드 목록 조회 쿼리
 */
export const useCardsQuery = (params: FindCardsRequest) => {
  return useQuery({
    ...cardsQuery.cardList(params),
    select: (res) => res.data,
  });
};

export const useInfiniteCardsQuery = (params: Omit<FindCardsRequest, 'cursorId'>) => {
  return useInfiniteQuery<FindCardsResponse>({
    queryKey: cardsQuery.cardListKey(params),
    queryFn: ({ pageParam }) =>
      cardsService
        .getCards({ ...params, cursorId: pageParam as number | undefined })
        .then((res) => res.data),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return 'cursorId' in lastPage ? lastPage.cursorId : undefined;
    },
  });
};

/**
 * 카드 상세 조회 쿼리
 */
export const useCardDetailQuery = (cardId: number) => {
  return useQuery({
    ...cardsQuery.cardDetail(cardId),
    select: (res) => res.data,
    enabled: !!cardId, // cardId가 있을 때만 실행
  });
};

/**
 * 카드 생성 뮤테이션
 */
export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateCardResponse, Error, CreateCardRequest>({
    mutationFn: (data) => cardsService.createCard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardsQuery.all() });
    },
  });
};
/**
 * 카드 수정 뮤테이션
 */
export const useUpdateCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateCardResponse, Error, UpdateCardRequest>({
    mutationFn: (data) => cardsService.updateCard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardsQuery.all() });
    },
  });
};
/**
 * 카드 삭제 뮤테이션
 * @returns
 */
export const useDeleteCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (cardId) => cardsService.deleteCard(cardId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardsQuery.all() });
    },
  });
};
