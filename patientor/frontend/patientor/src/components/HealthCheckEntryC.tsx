import React from 'react';
import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state';
import { Icon } from "semantic-ui-react";

const HealthCheckEntryC: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const icon = "user md";

  const color = entry.healthCheckRating === 0 ? 'green' : entry.healthCheckRating === 1 ? 'yellow' : entry.healthCheckRating === 2 ? 'red' : 'black';

  return (
    <div>
      <h3>{entry.date} <Icon name={icon} /></h3>
      {entry.description} <br />
      {entry.diagnosisCodes?.map(d =>
        <li key={d}>
          {d} {diagnoses[d].name}
        </li>)}
        <Icon name='heart' color={color} />
    </div>
  );
};

export default HealthCheckEntryC;