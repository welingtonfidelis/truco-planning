import { SocketEvents } from "../../../../shared/enum/socketEvents";
import { roomStore } from "../../../../store/room";
import { socketStore } from "../../../../store/socket";
import { userStore } from "../../../../store/user";
import {
  CardContentBack,
  CardContentFront,
  CoffeeIcon,
  Container,
  DoubtIcon,
  FlipCard,
  FlipCardInner,
} from "./styles";

const cardPoint = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

const { CLIENT_ROOM_VOTE_TASK } = SocketEvents;

export const Deck = () => {
  const { id: userId } = userStore();
  const { updateRoom, users, currentTaskId } = roomStore();
  const { socket } = socketStore();

  const selectedCard = users.find((user) => user.id === userId)?.vote;

  const handleSelectCard = (value: number) => {
    socket?.emit(CLIENT_ROOM_VOTE_TASK, value);
  };

  const parseCards = () => {
    const cards = cardPoint.map((card) => ({ value: card, label: `${card}` }));
    const extraCards = [
      { value: -1, label: <DoubtIcon /> },
      { value: 1000, label: <CoffeeIcon /> },
    ];

    return [...cards, ...extraCards];
  };

  return (
    <Container>
      {parseCards().map((card) => {
        return (
          <FlipCard key={card.value} totalCards={cardPoint.length}>
            <FlipCardInner className={currentTaskId && "flipCardFront"}>
              <CardContentFront
                isSelected={card.value === selectedCard}
                onClick={() => handleSelectCard(card.value)}
              >
                {card.label}
              </CardContentFront>
              <CardContentBack />
            </FlipCardInner>
          </FlipCard>
        );
      })}
    </Container>
  );
};
