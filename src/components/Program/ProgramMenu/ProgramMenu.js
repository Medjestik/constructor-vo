import React from 'react';
import './ProgramMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';

function ProgramMenu({ currentProgram }) {

	const path = useLocation();
	const navigate = useNavigate();

	function handleChangeSection(section) {
		navigate('/program/' + currentProgram.id + '/' + section);
	}

	return(
		<ul className='program-menu scroll'>
			<li id='program-info' className={`program-menu__item ${path.pathname.includes('info') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('info')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_info'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Характеристика программы</h3>
					<p className='program-menu__subtitle'>Общая информация о&nbsp;программе, участники и&nbsp;их&nbsp;роли</p>
				</div>
			</li>
			<li id='program-product' className={`program-menu__item ${path.pathname.includes('product') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('product')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_product'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Реконструкция деятельности</h3>
					<p className='program-menu__subtitle'>Создание продуктов, этапов жизненного цикла и&nbsp;процессов</p>
				</div>
			</li>
			<li id='program-competence' className={`program-menu__item ${path.pathname.includes('competence') && 'program-menu__item_type_active'} program-menu__item_type_block`}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_competence'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Компетентностный профиль</h3>
					<p className='program-menu__subtitle'>Создание умений и знаний связанных с процессами</p>
				</div>
			</li>
			<li id='program-assessment' className={`program-menu__item ${path.pathname.includes('assessment') && 'program-menu__item_type_active'} program-menu__item_type_block`}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_assessment'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Оценочные материалы</h3>
					<p className='program-menu__subtitle'>Создание материалов для&nbsp;оценки умений</p>
				</div>
			</li>
			<li id='program-discipline' className={`program-menu__item ${path.pathname.includes('discipline') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('discipline/level')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_discipline'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Проектирование дисциплин</h3>
					<p className='program-menu__subtitle'>Формирование дисциплин из&nbsp;набора умений и&nbsp;знаний</p>
				</div>
			</li>
			<li id='program-semester' className={`program-menu__item ${path.pathname.includes('semester') && 'program-menu__item_type_active'} program-menu__item_type_block`}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_semester'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Распределение по&nbsp;семестрам</h3>
					<p className='program-menu__subtitle'>Структурирование и&nbsp;организация дисциплин</p>
				</div>
			</li>
			<li id='program-export' className={`program-menu__item ${path.pathname.includes('export') && 'program-menu__item_type_active'} program-menu__item_type_block`}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_export'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Экспорт результатов</h3>
					<p className='program-menu__subtitle'>Экспорт шаблона рабочей программы дисциплины</p>
				</div>
			</li>
      <li id='program-dashboard' className={`program-menu__item ${path.pathname.includes('dashboard') && 'program-menu__item_type_active'} program-menu__item_type_block`}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_dashboard'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Аналитика программы</h3>
					<p className='program-menu__subtitle'>Дашборд по&nbsp;параметрам программы</p>
				</div>
			</li>
		</ul>
	)
}

export default ProgramMenu;
 