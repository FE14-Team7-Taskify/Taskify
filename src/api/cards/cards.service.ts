import api from '@/lib/axios';
import {
  CreateCardRequest,
  CreateCardResponse,
  FindCardsRequest,
  FindCardsResponse,
  GetCardResponse,
  UpdateCardRequest,
  UpdateCardResponse,
} from './cards.schema';

const PATH = '/cards';

class CardsService {
  createCard(body: CreateCardRequest) {
    return api.post<CreateCardResponse>(PATH, body);
  }
  getCards(params: FindCardsRequest) {
    return api.get<FindCardsResponse>(PATH, { params });
  }
  updateCard({ cardId, ...body }: UpdateCardRequest) {
    return api.put<UpdateCardResponse>(`${PATH}/${cardId}`, body);
  }
  getCardDetail(cardId: number) {
    return api.get<GetCardResponse>(`${PATH}/${cardId}`);
  }
  deleteCard(cardId: number) {
    return api.delete(`${PATH}/${cardId}`);
  }
}

export const cardsService = new CardsService();
