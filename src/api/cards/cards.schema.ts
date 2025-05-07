export type CardType = {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  dueDate?: string;
  assignee?: {
    profileImageUrl?: string | null;
    nickname: string;
    id: number;
  };
  imageUrl?: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateCardRequest = {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};

export type CreateCardResponse = CardType;

export type FindCardsRequest = { size?: number; cursorId?: number; columnId: number };

export type FindCardsResponse = { cursorId: number; totalCount: number; cards: CardType[] };

export type UpdateCardRequest = {
  cardId: number;
  columnId: number;
  assigneeUserId?: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
};

export type UpdateCardResponse = CardType;

export type GetCardResponse = CardType;
