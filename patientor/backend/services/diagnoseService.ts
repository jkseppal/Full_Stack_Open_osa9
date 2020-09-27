import diagnoseData from '../data/diagnosests';

import { Diagnose } from '../types';

//const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData;
};

export default {
  getDiagnoses
};