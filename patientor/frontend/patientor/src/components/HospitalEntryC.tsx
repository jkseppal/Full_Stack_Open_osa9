import React from 'react';
import { HospitalEntry } from '../types';
import { useStateValue } from '../state';
import { Icon } from "semantic-ui-react";

const HospitalEntryC: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const icon = "hospital";

  //const color = entry.healthCheckRating === 0 ? 'green' : entry.healthCheckRating === 1 ? 'yellow' : entry.healthCheckRating === 2 ? 'red' : 'black';

  return (
    <div>
      <h3>{entry.date} <Icon name={icon} /></h3>
      {entry.description} <br />
      {entry.diagnosisCodes?.map(d =>
        <li key={d}>
          {d} {diagnoses[d].name}
        </li>)}
    </div>
  );
};

export default HospitalEntryC;