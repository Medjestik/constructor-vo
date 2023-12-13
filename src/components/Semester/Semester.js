import React from 'react';
import './Semester.css';
import Section from '../Section/Section.js';
import SemesterLevel from './SemesterLevel/SemesterLevel.js';

function Semester({ currentProgram, isEditRights }) {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);
  const [isShowList, setIsShowList] = React.useState(false);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
      setIsShowList(true);
    }
  // eslint-disable-next-line
  }, []);

  const listStyle = {
    height: listHeight,
  };

  return (
    <Section 
      title={'Распределение по семестрам'} 
      options={[]} 
      onChooseOption={{}} 
      heightType={'page'} 
      headerType={'large'}
    >
      <div ref={containerHeightRef} style={Object.assign({}, listStyle)} className='semester scroll'>
        {
          isShowList &&
          <SemesterLevel currentProgram={currentProgram} />
        }
      </div>
    </Section>
  )
}

export default Semester;

