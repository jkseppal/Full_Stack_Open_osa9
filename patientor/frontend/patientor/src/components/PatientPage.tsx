import React from 'react';
import axios from 'axios';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { addEntry, setPatient, useStateValue } from '../state';
import { Button, Icon } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
//import { error } from 'console';
import AddHospitalEntryModal from '../AddHospitalEntryModal';
import { HospitalEntryFormValues } from '../AddHospitalEntryModal/AddHospitalEntryForm';

const PatientPage: React.FC<{ id: string }> = ({ id }) => {
  const [{ sensitivePatient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  //const [{ diagnoses }] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    if (!sensitivePatient || sensitivePatient.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          //dispatch({ type: "SET_PATIENT", payload: patientFromApi });
          dispatch(setPatient(patientFromApi));
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
        <h3>entries</h3>
        {/*sensitivePatient.entries?.map(e =>
          <div key={e.id}>
            <div>
              {e.date} {e.description}  
            </div>
            {e.diagnosisCodes?.map(d =>
              <li key={d}>
                {d} {diagnoses[d].name}
            </li>)}
          </div>
            )*/}
          {sensitivePatient.entries?.map(e =>
            <EntryDetails key={e.id} entry={e} />
            )}
          <AddHospitalEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewHospitalEntry}
            error={error}
            onClose={closeModal}
          />
        <Button onClick={() => openModal()}>Add New Hospital Entry</Button>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;