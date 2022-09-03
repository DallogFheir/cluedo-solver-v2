export const CARDS = {
  suspects: [
    "Pułkownik Żółtkowski",
    "Profesor Śliwiński",
    "Ksiądz Zieliński",
    "Pani Pawińska",
    "Panna Czerwińska",
    "Pani Bielecka",
  ],
  tools: [
    "Sztylet",
    "Świecznik",
    "Rewolwer",
    "Lina",
    "Metalowa rurka",
    "Klucz francuski",
  ],
  rooms: [
    "Hol",
    "Salon",
    "Jadalnia",
    "Kuchnia",
    "Sala balowa",
    "Weranda",
    "Sala bilardowa",
    "Biblioteka",
    "Gabinet",
  ],
};

export const NUM_OF_CARDS =
  CARDS.suspects.length + CARDS.tools.length + CARDS.rooms.length - 3;
