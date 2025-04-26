// cards.query.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateCardRequest,
  CreateCardResponse,
  FindCardsRequest,
  FindCardsResponse,
  GetCardResponse,
  UpdateCardRequest,
  UpdateCardResponse,
} from './cards.schema';
import { cardsService } from './cards.service';

// key 정의
const QUERY_KEYS = {
  cards: ['cards'],
  cardDetail: (id: number) => ['cards', id],
};

// region 카드 생성
export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateCardResponse, Error, CreateCardRequest>({
    mutationFn: (data) => cardsService.createCard(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cards });
    },
  });
};
// endregion 카드 생성

// region 카드 목록 조회
export const useCardsQuery = (params: FindCardsRequest) => {
  return useQuery<FindCardsResponse>({
    queryKey: [...QUERY_KEYS.cards, params],
    queryFn: () => cardsService.getCards(params).then((res) => res.data),
  });
};
// endregion 카드 목록 조회

// region 카드 수정
export const useUpdateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCardResponse, Error, UpdateCardRequest>({
    mutationFn: (data) => cardsService.updateCard(data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cardDetail(variables.cardId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cards });
    },
  });
};
// endregion 카드 수정

// region 카드 상세 조회
export const useCardDetailQuery = (cardId: number) => {
  return useQuery<GetCardResponse>({
    queryKey: QUERY_KEYS.cardDetail(cardId),
    queryFn: () => cardsService.getCardDetail(cardId).then((res) => res.data),
    enabled: !!cardId, // cardId가 있을 때만 실행
  });
};
// endregion 카드 상세 조회

// region 카드 삭제
export const useDeleteCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (cardId) => cardsService.deleteCard(cardId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cards });
    },
  });
};
// endregion 카드 삭제
