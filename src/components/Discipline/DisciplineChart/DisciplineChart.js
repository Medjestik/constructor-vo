import React from 'react';
import './DisciplineChart.css';

function DisciplineChart() {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
    }
  // eslint-disable-next-line
  }, []);

  const dashboardLink = 'https://app.powerbi.com/view?r=eyJrIjoiOWY3YmFjZTgtNDE0MS00NTljLWE0MGItNGZiNGIyNThlMjE4IiwidCI6Ijk0NDUwNWJhLWEzZmEtNDVkZC1iYWI3LTY1YTk2NTVjYjdiYiIsImMiOjl9';

  return (
    <div ref={containerHeightRef} className='discipline-chart'>
      <iframe title='dashboard' src={dashboardLink} width='100%' height={listHeight} frameborder="0"></iframe>
    </div>
  );
}

export default DisciplineChart;  