export const CARDS = {
  suspects: [
    "Ksiądz Zieliński",
    "Pani Bielecka",
    "Pani Pawińska",
    "Panna Czerwińska",
    "Profesor Śliwiński",
    "Pułkownik Żółtkowski",
  ],
  tools: [
    "Klucz francuski",
    "Lina",
    "Metalowa rurka",
    "Rewolwer",
    "Sztylet",
    "Świecznik",
  ],
  rooms: [
    "Biblioteka",
    "Gabinet",
    "Hol",
    "Jadalnia",
    "Kuchnia",
    "Sala balowa",
    "Sala bilardowa",
    "Salon",
    "Weranda",
  ],
};

export const NUM_OF_CARDS =
  CARDS.suspects.length + CARDS.tools.length + CARDS.rooms.length - 3;
