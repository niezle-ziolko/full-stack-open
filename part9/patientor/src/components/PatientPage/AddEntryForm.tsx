import { useState, useEffect } from "react";
import axios from "axios";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  TextField,
  Button,
  OutlinedInput,
  Checkbox,
  ListItemText
} from "@mui/material";

import { Entry, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
};

const AddEntryForm = ({ patientId, onEntryAdded }: Props) => {
  const [type, setType] = useState<"Hospital" | "HealthCheck" | "OccupationalHealthcare">("Hospital");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosis, setAllDiagnosis] = useState<Diagnosis[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Diagnosis[]>(`${import.meta.env.VITE_API_URL}/api/diagnoses`)
      .then((res) => setAllDiagnosis(res.data))
      .catch(() => setAllDiagnosis([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!date || !description || !specialist) {
      setError("Please fill in required fields: date, description, specialist.");
      return;
    };

    const baseEntry = {
      type,
      date,
      description,
      specialist,
      diagnosisCodes,
    };

    let entryData;

    switch (type) {
      case "Hospital":
        if (!dischargeDate || !dischargeCriteria) {
          setError("Please fill in discharge information.");
          return;
        }
        entryData = {
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      case "HealthCheck":
        entryData = {
          ...baseEntry,
          healthCheckRating
        };
        break;
      case "OccupationalHealthcare":
        if (!employerName) {
          setError("Please provide employer name.");
          return;
        }
        entryData = {
          ...baseEntry,
          employerName,
          sickLeave: sickLeaveStart && sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined
        };
        break;
      default:
        return;
    };

    try {
      const response = await axios.post<Entry>(
        `${import.meta.env.VITE_API_URL}/api/patients/${patientId}/entries`,
        entryData
      );
      onEntryAdded(response.data);
      // Reset
      setDate("");
      setDescription("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
      setDischargeDate("");
      setDischargeCriteria("");
      setHealthCheckRating(HealthCheckRating.Healthy);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        setError("Something went wrong");
      };
    };
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Add New Entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <Select value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(e: SelectChangeEvent<typeof diagnosisCodes>) =>
              setDiagnosisCodes(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)
            }
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {allDiagnosis.map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                <Checkbox checked={diagnosisCodes.indexOf(diag.code) > -1} />
                <ListItemText primary={`${diag.code} - ${diag.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "Hospital" && (
          <>
            <TextField
              type="date"
              label="Discharge Date"
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}

        {type === "HealthCheck" && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating.toString()}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              label="Health Check Rating"
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy (0)</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk (1)</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk (2)</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk (3)</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="date"
              label="Sick Leave Start"
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="date"
              label="Sick Leave End"
              InputLabelProps={{ shrink: true }}
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
          Add Entry
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;