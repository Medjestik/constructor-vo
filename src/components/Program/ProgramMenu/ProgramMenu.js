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
			<li id='program-info' className={`program-menu__item ${path.pathname.includes('program-info') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('program-info')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_info'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Характеристика программы</h3>
					<p className='program-menu__subtitle'>Описание этапа где много разных слов желательно на 2 строки</p>
				</div>
			</li>
			<li id='program-product' className={`program-menu__item ${path.pathname.includes('program-product') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('program-product')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_product'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Реконструкция деятельности</h3>
					<p className='program-menu__subtitle'>Описание этапа где много разных слов желательно на 2 строки</p>
				</div>
			</li>
			<li id='program-profile' className={`program-menu__item ${path.pathname.includes('program-profile') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('program-profile')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_profile'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Компетентностный профиль</h3>
					<p className='program-menu__subtitle'>Описание этапа где много разных слов желательно на 2 строки</p>
				</div>
			</li>
			<li id='program-assessment' className={`program-menu__item ${path.pathname.includes('program-assessment') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('program-assessment/knowledge/list')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_assessment'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Оценочные материалы</h3>
					<p className='program-menu__subtitle'>Создание тестовых и практических заданий для оценки знаний и умений</p>
				</div>
			</li>
			<li id='program-discipline' className={`program-menu__item ${path.pathname.includes('program-discipline') && 'program-menu__item_type_active'} `} onClick={() => handleChangeSection('program-discipline')}>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_discipline'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Проектирование дисциплин</h3>
					<p className='program-menu__subtitle'>Описание этапа где много разных слов желательно на 2 строки</p>
				</div>
			</li>
			<li id='program-plan' className='program-menu__item program-menu__item_type_block'>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_plan'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Создание прототипа учебного&nbsp;плана</h3>
					<p className='program-menu__subtitle'>Описание этапа где много разных слов желательно на 2 строки</p>
				</div>
			</li>
			<li id='program-export' className='program-menu__item program-menu__item_type_block'>
				<div className='program-menu__icon-container'>
					<div className='program-menu__icon program-menu__icon_type_export'></div>
				</div>
				<div className='program-menu__card'>
					<h3 className='program-menu__title'>Формирование рабочей&nbsp;программы</h3>
					<p className='program-menu__subtitle'>Описание этапа где много разных слов желательно на 2 строки</p>
				</div>
			</li>
		</ul>
	)
}

export default ProgramMenu;
 