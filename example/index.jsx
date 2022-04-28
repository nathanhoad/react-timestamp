import React from 'react';
import { render } from 'react-dom';
import Timestamp from '../dist';

function App () {
  const firstDate = new Date('2019-04-01T00:30:00.000Z'); // Date in JSON format in UTC
  const secondDate = new Date('2022-04-28T00:30:00.000Z'); // Date in JSON format in UTC

  return (
    <div>
      <p>Between <strong><Timestamp date={firstDate} /></strong> and <strong><Timestamp date={secondDate} /></strong> there has been <Timestamp relative date={firstDate} relativeTo={secondDate} />.</p>
      <small>This page was rendered <Timestamp date={new Date} relative autoUpdate /></small>.
    </div>
  );
}

render(<App />, document.querySelector('#app'));
