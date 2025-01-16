export const getNsiName = (typeId) => {
  switch (typeId) {
    case 9:
      return 'Федеральный закон';
    case 10:
      return 'Закон РФ';
    case 11:
      return 'Кодекс РФ';
    case 12:
      return 'Указ Президента РФ';
    case 13:
      return 'Постановление Правительства РФ';
    case 14:
      return 'Распоряжение Правительства РФ';
    case 15:
      return 'Паспорт национального проекта';
    case 16:
      return 'Поручение Президента РФ';
    case 17:
      return 'Паспорт федерального проекта';
    case 18:
      return 'Паспорт проекта';
    case 19:
      return 'Порядок';
    case 20:
      return 'Регламент';
    case 21:
      return 'Технический регламент таможенного союза';
    case 22:
      return 'Постановление Госстроя России';
    case 25:
      return 'Приказ Госстроя России';
    case 27:
      return 'Приказ Федеральной службы';
    case 31:
      return 'Распоряжение Федеральной службы';
    case 32:
      return 'Методические рекомендации';
    case 33:
      return 'Примерная программа';
    case 35:
      return 'Требования';
    case 36:
      return 'Каталог';
    case 37:
      return 'ГОСТ Р';
    case 38:
      return 'ГОСТ';
    case 39:
      return 'ОДМ';
    case 40:
      return 'СТО';
    case 41:
      return 'СПО';
    case 42:
      return 'ГСН (Сборник)';
    case 43:
      return 'СНиПы';
    case 44:
      return 'СП';
    case 45:
      return 'ЕНИР';
    case 46:
      return 'ТУ';
    case 47:
      return 'ISO';
    case 48:
      return 'Учебники, монографии';
    case 49:
      return 'ПНСТ';
    case 50:
      return 'Официальный сайт';
    case 51:
      return 'Приказ Росстата';
    case 52:
      return 'Локальный акт организации';
    case 53:
      return 'Статья из журнала';
    case 54:
      return 'Статья из сборника';
    case 55:
      return 'Приказ Министерства';
    case 56:
      return 'Распоряжение Министерства';
    case 57:
      return 'Международный документ';
    case 58:
      return 'Другое';
    default:
      return 'Неизвестный тип';
  }
}
