export type Card = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

export type CardResponse = Card | { message: string };

export type CreateCardRequest = {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
};

export type CreateCardResponse = CardResponse;

export type FindCardsRequest = { size?: number; cursorId?: number; columnId: number };

export type FindCardsResponse =
  | { cursorId: number; totalCount: number; cards: Card[] }
  | { message: string };

export type UpdateCardRequest = {
  cardId: number;
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
};

export type UpdateCardResponse = CardResponse;

export type GetCardResponse = CardResponse;
