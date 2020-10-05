import React from 'react';
import { Entry } from '../types';
import HealthCheckEntryC from './HealthCheckEntryC';
import HospitalEntryC from './HospitalEntryC';
import OccupationalHealthcareEntryC from './OccupationalHealthCareEntryC';
//import { useStateValue } from '../state';
//import { Icon } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Error: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
  case "Hospital":
    return <HospitalEntryC entry={entry} />;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareEntryC entry={entry} />;
  case "HealthCheck":
    return <HealthCheckEntryC entry={entry} />;
  default:
    return assertNever(entry);
  }
};

export default EntryDetails;