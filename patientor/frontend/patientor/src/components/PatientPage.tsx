import React from 'react';
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC<{ id: string }> = ({ id }) => {
  const [{ sensitivePatient }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (!sensitivePatient || sensitivePatient.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "SET_PATIENT", payload: patientFromApi });
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [dispatch]);

  if (sensitivePatient) {
    const icon = sensitivePatient.gender === 'male' ? 'mars' : sensitivePatient.gender === 'female' ? 'venus' : 'neuter';
    return (
      <div>
        <h2>{sensitivePatient.name} <Icon name={icon} /></h2>
        <p>
          ssn: {sensitivePatient.ssn}<br />
          occupation: {sensitivePatient.occupation}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;