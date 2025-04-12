import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from "@mui/icons-material";
import axios from "axios";

import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Patient, Diagnosis, Entry } from "../../types";

const genderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    default:
      return <Transgender />;
  };
};

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      const { data } = await axios.get<Patient>(
        `${import.meta.env.VITE_API_URL}/api/patients/${id}`
      );
      setPatient(data);
    };

    const fetchDiagnoses = async () => {
      const { data } = await axios.get<Diagnosis[]>(
        `${import.meta.env.VITE_API_URL}/api/diagnoses`
      );
      setDiagnoses(data);
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  const handleAddEntry = (entry: Entry) => {
    if (!patient) return;
    setPatient({
      ...patient,
      entries: patient.entries.concat(entry),
    });
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name} {genderIcon(patient.gender)}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>

      <AddEntryForm patientId={patient.id} onEntryAdded={handleAddEntry} />
      
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries</p>
      ) : (
        <div>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;