import React from 'react';

function DisciplineList({ disciplines }) {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
    }
  // eslint-disable-next-line
  }, [disciplines]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='list list_type_initial scroll-inside'>
      {
        disciplines.length > 0 &&
        disciplines.map((discipline, disciplineIndex) => (
          <li key={discipline.id} className={`list__item`}>
            <div className='list__item-info'>
              <span className='badge badge_size_small badge_type_discipline'>Дисциплина {disciplineIndex + 1}</span>
              <h4 className='list__item-name'>{discipline.name}</h4>
            </div>
            {
              discipline.abilities.length > 0 &&
              <ul className='list list_type_nested'>
                {
                  discipline.abilities.map((ability, abilityIndex) => (
                    <li key={ability.id} className={`list__item list__item_type_nested`}>
                      <div className='list__item-info'>
                        <span className='badge badge_size_small badge_type_ability'>Умение {disciplineIndex + 1}.{abilityIndex + 1}</span>
                        <h4 className='list__item-name'>{ability.name}</h4>
                      </div>
                      {
                        ability.knowledges.length > 0 &&
                        <ul className='list list_type_nested'>
                          {
                            ability.knowledges.map((knowledge, knowledgeIndex) => (
                              <li key={knowledge.id} className={`list__item`}>
                                <div className='list__item-info'>
                                <span className='badge badge_size_small badge_type_knowledge'>Знание {disciplineIndex + 1}.{abilityIndex + 1}.{knowledgeIndex + 1}</span>
                                  <h4 className='list__item-name'>{knowledge.name}</h4>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      }
                    </li>
                  ))
                }
              </ul>
            }
          </li>
        ))
      }
    </ul>
  );
}

export default DisciplineList;  