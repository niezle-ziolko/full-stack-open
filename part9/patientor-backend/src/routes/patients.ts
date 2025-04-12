import express from "express";

import { toNewEntry } from "../utils";
import patientService from "../services/patientService";
import { newPatientSchema } from "../schemas/patientSchema";

const router = express.Router();

router.get("/", (_req, res): void => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res): void => {
  const patient = patientService.getPatientById(req.params.id);
  
  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
  };

  res.json(patient);
});

router.post("/", (req, res): void => {
  const parseResult = newPatientSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.errors });
  };

  const newPatientData = parseResult.data;
  const addedPatient = patientService.addPatient(newPatientData);
  res.json(addedPatient);
});

router.post("/:id/entries", (req, res): void => {
  try {
    const patient = patientService.getPatientById(req.params.id);

    if (!patient) {
      res.status(404).send({ error: "Patient not found" });
    };

    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(patient.id, newEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong.";

    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    };
    
    res.status(400).send({ error: errorMessage });
  };
});

export default router;