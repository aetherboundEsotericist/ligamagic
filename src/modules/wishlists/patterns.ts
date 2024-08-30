export const LIGAMAGIC_WISHLIST_VALIDATION_PATTERN =
  /^((\d+) (.*) (\[QUALIDADE=(M|NM|SP|MP|HP|D)\])?(\[EDICAO=(\w{2,5})\])?(\n|))+$/;

export const LIGAMAGIC_WISHLIST_PARSING_PATTERN =
  /(?:(\d+) (.*) (?:\[QUALIDADE=(M|NM|SP|MP|HP|D)\])?(?:\[EDICAO=(\w{2,5})\])?)+/g;
