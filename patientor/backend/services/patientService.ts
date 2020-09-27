import patientData from '../data/patientsts';

import { NonSsnPatients, Patient } from '../types';

//const patients: Array<Patient> = patientData;

const pat = (): Array<Patient> => {
  return patientData;
};

const getPatients = (): NonSsnPatients[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  pat
};