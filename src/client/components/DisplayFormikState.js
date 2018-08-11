import React from 'react';

const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }}>
State
    </h3>
    <pre
      style={{
        background: '#000',
        fontSize: '1.3rem',
        padding: '.5rem'
      }}
    >
      <strong>
props
      </strong>
      {' '}
=
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

export default DisplayFormikState;
