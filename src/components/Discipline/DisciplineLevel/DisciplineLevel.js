import React from 'react';
import './DisciplineLevel.css';

function DisciplineLevel({ rows, disciplines, semesters, onAdd, onAttach, onEdit, onViewProcess, onConstruct, onRemove, onAddSemester, onRemoveSemester }) {
 
  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0); 

  function arabicToRoman(num) {
    const romanNumerals = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
  
    let roman = '';
    for (let key in romanNumerals) {
      const value = romanNumerals[key];
      while (num >= value) {
        roman += key;
        num -= value;
      }
    }
  
    return roman;
  }

  function renderRow(row, rowIndex) {
    if (row.process[0].type === 'stage') {
      return (
        <li className='discipline-level__row' key={rowIndex}>
          <div className='discipline-level__column discipline-level__column_type_process'>
            <div className='discipline-level__card discipline-level__card_type_stage'>
              <div className='discipline-level__card-icon discipline-level__card-icon_type_stage'></div>
              <div className='discipline-level__card-header'>
                <span className='badge badge_size_small badge_type_stage'>Этап {row.process[0].index + 1}</span>
                <div></div>
              </div>
              <p className='discipline-level__card-title'>{row.process[0].name}</p>
            </div>
            <div className='discipline-level__card-arrow'></div>
          </div>
          <div className='discipline-level__column discipline-level__column_type_discipline'>
            <div className='discipline-level__card discipline-level__card_type_stage'>
              <div className='discipline-level__card-icon discipline-level__card-icon_type_module'></div>
              <div className='discipline-level__card-header'>
                <span className='badge badge_size_small badge_type_stage'>Модуль {row.process[0].index + 1}</span>
                <div></div>
              </div> 
              <p className='discipline-level__card-title'>{row.process[0].name}</p>
            </div>
          </div>
          <ul className='discipline-level__semesters'>
            {
              semesters.map((elem, i) => (
                <li className='discipline-level__column discipline-level__column_type_semester' key={i}>{arabicToRoman(i + 1)}</li>
              ))
            }
          </ul>
        </li>
      )
    } else {
      return (
        <li className='discipline-level__row' key={rowIndex}>
          <div className='discipline-level__column discipline-level__column_type_process'>
            <ul className='discipline-level__process-list'>
              {
                row.process.map((elem, i) => (
                  <li className='discipline-level__process-item' key={i}>
                    <div className='discipline-level__card-nested'></div>
                    <div className={`discipline-level__card ${elem.results.length > 0 ? '' : 'discipline-level__card_type_warning'}`}>
                      <div className='discipline-level__buttons'>
                        <button
                          className='icon icon_margin_left-8 icon_size_16 icon_type_open-grey'
                          type='button'
                          onClick={() => onViewProcess(elem)}
                        >
                        </button>
                      </div>

                      <p className='discipline-level__card-title'>{elem.name}</p>
                      <div className='levels__item-row'>
                        {
                          elem.results && elem.results.length > 0
                          ?
                          <ul className='levels__children-list'>
                            {
                              elem.results.map((elem) => (
                                <li key={`children-${elem.id}`} className='levels__children-item levels__children-item_type_knowledge'></li>
                              ))
                            }
                          </ul>
                          :
                          <>
                          <span className='badge badge_size_small badge_type_process badge_margin_right_8'>Результаты не добавлены!</span>
                          </>
                        }
                      </div>
                    </div>
                    <div className='discipline-level__card-arrow'></div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='discipline-level__column discipline-level__column_type_discipline'>
            <div className='discipline-level__card'>
              {
                row.discipline[0]
                ?
                <>
                <div className='discipline-level__buttons'>
                  <button
                    className='icon icon_margin_left-8 icon_size_16 icon_type_link-grey'
                    type='button'
                    onClick={() => onAttach(row.process[0])}
                  >
                  </button>
                  <button
                    className='icon icon_margin_left-8 icon_size_16 icon_type_edit-grey'
                    type='button'
                    onClick={() => onEdit(row.discipline[0])}
                  >
                  </button>
                  <button 
                    className='icon icon_margin_left-8 icon_size_16 icon_type_remove-grey' 
                    type='button'
                    onClick={() => onRemove(row.discipline[0])}
                  >
                  </button>
                </div>
                <div className='levels__item-header'>
                </div>
                <p className='discipline-level__card-title'>{row.discipline[0].name}</p>
                </>
                :
                <button 
                  className='badge badge_type_white badge-btn badge-btn_type_add'
                  type='button'
                  onClick={() => onAdd(row.process[0])}
                >
                  Добавить
                </button>
              }
            </div>
          </div>
          <ul className='discipline-level__semesters'>
            { semesters.map((elem, i) => (
              <li className='discipline-level__column discipline-level__column_type_semester' key={i}>
                {
                  row.discipline[0] && row.discipline[0].semesters && row.discipline[0].semesters.includes(elem.id) 
                  ?
                  <div 
                    className='discipline-level__semester-circle discipline-level__semester-circle_type_active'
                    onClick={() => onRemoveSemester(elem.id, row.discipline[0].id)}
                  >
                  </div>
                  :
                  <div 
                    className='discipline-level__semester-circle discipline-level__semester-circle_type_stub'
                    onClick={() => onAddSemester(elem.id, row.discipline[0].id)}
                  >
                  </div>
                }
              </li>
            ))}
          </ul>
        </li>
      )
    }
  }

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
    }
  // eslint-disable-next-line
  }, [disciplines]);

  React.useEffect(() => {

  }, [rows, disciplines]);

  const listStyle = {
    height: listHeight,
  };

  const semesterStyle = {
    width: 54 * semesters.length,
  };

  return (
    <div className='discipline-level'>
      <button className='btn-primary' type='button' onClick={onConstruct}>Сформировать дисциплины автоматически</button>
      <div className='discipline-level__row_type_stub'>
        <div className='discipline-level__column_type_process'><p className='discipline-level__column-title'>Процессы</p></div>
        <div className='discipline-level__column_type_discipline'><p className='discipline-level__column-title'>Дисциплины</p></div>
        <div className='discipline-level__column_type_semester_type_stub' style={Object.assign({}, semesterStyle)}><p className='discipline-level__column-title'>Семестры</p></div>
      </div>
      <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='discipline-level__list scroll'>
        {
          rows.length > 0 &&
          rows.map((row, rowIndex) => (
            renderRow(row, rowIndex)
          ))
        }
      </ul>
    </div>
  );
}

export default DisciplineLevel;
