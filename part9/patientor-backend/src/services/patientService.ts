import { v1 as uuid } from "uuid";

import { Entry, Patient } from "../types";
import patients from "../../data/patients";
import { NewPatientZod } from "../schemas/patientSchema";

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (newPatient: NewPatientZod): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
    entries: []
  };

  patients.push(patient);
  return patient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const isEntryType = (type: any): type is "Hospital" | "OccupationalHealthcare" => {
  return ["Hospital", "OccupationalHealthcare"].includes(type);
};

const addEntryToPatient = (id: string, entry: Entry): Entry => {
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  };

  patient.entries.push(entry);
  return entry;
};

export default {
  addPatient,
  isEntryType,
  getPatients,
  getPatientById,
  addEntryToPatient
};