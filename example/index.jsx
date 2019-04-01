import React from 'react';
import { render } from 'react-dom';
import Timestamp from '../dist';

const App = props => {
  const date = new Date('2019-04-01T00:30:00.000Z'); // Date in JSON format in UTC

  return (
    <div>
      It was <Timestamp date={date} /> <Timestamp relative date={date} autoUpdate />.
    </div>
  );
};

render(<App />, document.querySelector('#app'));
