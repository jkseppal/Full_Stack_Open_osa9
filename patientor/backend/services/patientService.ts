import patientData from '../data/patientsts';
//import { v4 as uuidv4 } from 'uuid';
import uuid = require('uuid');
import { NonSsnPatients, Patient, NewPatient, Entry } from '../types';
import utils from '../utils';

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

const getPatient = (id: string): Patient => {
  const patient = patientData.find(p => p.id === id);
  if (!patient) {
    throw new Error('patient not found');
  }
  if (!patient.entries) {
    patient.entries = [];
  }
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const iidee: string = uuid.v4();
  const newPatient = {
    id: iidee,
    ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: Entry): Entry => {
  const newEntry = utils.toNewEntry(entry);
  const patient = patientData.find(p => p.id === id);
  if (!patient) {
    throw new Error("Patient does not exist!");
  }
  patient.entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  pat,
  addPatient,
  getPatient,
  addEntry
};