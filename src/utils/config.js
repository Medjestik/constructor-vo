export const API_URL = process.env.REACT_APP_API_URL;

//export const API_URL = 'https://vpo-api.emiit.ru/api/v1';

export const PROGRAM_INFO_SECTION_OPTIONS = [

];

export const PRODUCT_SECTION_OPTIONS = [

];

export const COMPETENCE_SECTION_OPTIONS = [

];

export const DISCIPLINE_SECTION_OPTIONS = [
  { id: 'level', status: 'active', icon: 'level', link: '/level'},
  { id: 'list', status: 'inactive', icon: 'list', link: '/list'},

];

export const PROGRAM_TABS = [
  {
    title: 'Информация',
    link: '/info-tab'
  },
  {
    title: 'Продукты',
    link: '/product-tab'
  },
  {
    title: 'Компетентносный профиль',
    link: '/competence-tab'
  },
  {
    title: 'Дисциплины',
    link: '/discipline-tab'
  },
];

export const ASSESSMENT_TABS = [
  {
    title: 'Оценка знаний',
    link: '/knowledge/list',
    keyword: 'knowledge',
  },
  {
    title: 'Оценка умений',
    link: '/ability/list',
    keyword: 'ability',
  },
];