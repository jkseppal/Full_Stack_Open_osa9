import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from '../state';
import { Icon } from "semantic-ui-react";

const OccupationalHealthcareEntryC: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const icon = "stethoscope";

  //const color = entry.healthCheckRating === 0 ? 'green' : entry.healthCheckRating === 1 ? 'yellow' : entry.healthCheckRating === 2 ? 'red' : 'black';

  return (
    <div>
      <h3>{entry.date} <Icon name={icon} /> {entry.employerName}</h3>
      {entry.description} <br />
      {entry.diagnosisCodes?.map(d =>
        <li key={d}>
          {d} {diagnoses[d].name}
        </li>)}<br />
    </div>
  );
};

export default OccupationalHealthcareEntryC;