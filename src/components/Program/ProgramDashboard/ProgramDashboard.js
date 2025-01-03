import React from 'react';
import Section from '../../Section/Section.js';

function ProgramChart({ }) {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
    }
  // eslint-disable-next-line
  }, []);

  const dashboardLink = 'https://datalens.yandex/0fxmbqp1vryen';

  return (
    <>
      <Section 
        title={'Аналитика программы'} 
        options={[]} 
        heightType={'page'} 
        headerType={'large'}
      >
        <div ref={containerHeightRef} className='discipline-chart'>
          <iframe title='dashboard' src={dashboardLink} width='100%' height={listHeight} frameborder="0"></iframe>
        </div>
      </Section>
    </>
  )
}

export default ProgramChart; 