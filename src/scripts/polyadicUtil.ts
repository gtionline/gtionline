export function formatToPower(format: string): number {
  switch (format) {
    case 'binary':
      return 2;
    case 'ternary':
      return 3;
    case 'quaternary':
      return 4;
    case 'quinary':
      return 5;
    case 'senary':
      return 6;
    case 'septenary':
      return 7;
    case 'octal':
      return 8;
    case 'novenary':
      return 9;
    case 'decimal':
      return 10;
    case 'hex':
      return 16;
    default:
      return 0;
  }
}
