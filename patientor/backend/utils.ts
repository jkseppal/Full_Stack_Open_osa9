/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, HealthCheckRating, Entry } from './types';
import { v4 as uuidv4 } from "uuid";

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEntryType = (entryType: any): string => {
  if (!entryType || !isString(entryType) || (entryType !== "Hospital" && entryType !== "HealthCheck" && entryType !== "OccupationalHealthcare")) {
    throw new Error('Incorrect or missing entry type');
  }
  return entryType;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating');
  }
  return rating;
};

const toNewEntry = (object: any): Entry => {
  const base = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    description: parseDescription(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseSpecialist(object.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: object.diagnosisCodes,
  };
  const entryType = parseEntryType(object.type);

  switch (entryType) {
    case "Hospital":
      return {
        ...base,
        type: entryType,
        discharge: {
          date: object.discharge.date,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          criteria: object.discharge.criteria,
        },
      };
    case "HealthCheck":
      return {
        ...base,
        type: entryType,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        ...base,
        type: entryType,
        employerName: object.employerName,
        sickLeave: {
          startDate: object.sickLeave.startDate,
          endDate: object.sickLeave.endDate,
        },
      };
    default:
      throw new Error("Something went sour");
  }
};



export default { toNewPatient, toNewEntry };