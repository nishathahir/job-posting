import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const InterviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [candidates, setCandidates] = useState<string[]>([]);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [endDate, setEndDate] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleAddCandidate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && candidateEmail) {
      e.preventDefault();
      setCandidates([...candidates, candidateEmail]);
      setCandidateEmail("");
    }
  };

  const handleDeleteCandidate = (emailToDelete: string) => {
    setCandidates(candidates.filter((email) => email !== emailToDelete));
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidates: "",
    endDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      jobTitle: "",
      jobDescription: "",
      experienceLevel: "",
      candidates: "",
      endDate: "",
    });

    let isValid = true;

    if (!jobTitle) {
      isValid = false;
      setErrors((prev) => ({ ...prev, jobTitle: "Job Title is required." }));
    }

    if (!jobDescription) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        jobDescription: "Job Description is required.",
      }));
    }
    if (!experienceLevel) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        experienceLevel: "Experience Level is required.",
      }));
    }
    if (!experienceLevel) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        experienceLevel: "Experience Level is required.",
      }));
    }

    if (!endDate) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        endDate: "End Date is required.",
      }));
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (candidates.length === 0) {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        candidates: "At least one candidate email is required.",
      }));
    } else {
      for (const email of candidates) {
        if (!emailPattern.test(email)) {
          isValid = false;
          setErrors((prev) => ({
            ...prev,
            candidates: "Invalid Email.",
          }));
          break;
        }
      }
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "https://job-portal-posting-backend-6f18a648e9e3.herokuapp.com/api/interviews",
        {
          jobTitle,
          jobDescription,
          experienceLevel,
          candidates,
          endDate,
        }
      );
      if (response.status === 200) {
        setSnackbarMessage("Job alerts sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        setJobTitle("");
        setJobDescription("");
        setExperienceLevel("");
        setCandidates([]);
        setEndDate("");
      }
      setJobTitle("");
      setJobDescription("");
      setExperienceLevel("");
      setCandidates([]);
      setEndDate("");
    } catch (error) {
      setSnackbarMessage("Failed to submit interview details.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

      console.error("Error submitting form:", error);
    }
    setJobTitle("");
    setJobDescription("");
    setExperienceLevel("");
    setCandidates([]);
    setEndDate("");
  };

  const labelStyle = {
    fontSize: "2rem",
    fontWeight: "400",
  };

  return (
    <div style={{ margin: "4rem 5rem" }}>
      {/* Create Interview Button */}
      {!showForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          sx={{
            width: "250px",
            height: "57px",
            borderRadius: "8px",
            fontFamily: "DM Sans",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "20px",
            background: "#0B66EF",
          }}
        >
          Create Interview
        </Button>
      )}

      {/* Form that appears when button is clicked */}
      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: "600px", margin: "2rem" }}
        >
          {/* Job Title */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Grid item xs={4}>
              <Typography sx={{ ...labelStyle }}>Job Title</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter Job Title"
                value={jobTitle}
                InputProps={{
                  sx: {
                    fontSize: "1.3rem",
                  },
                }}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {errors.jobTitle && (
                <Typography
                  color="error"
                  sx={{ fontSize: "1.3rem", marginTop: "0.45rem" }}
                >
                  {errors.jobTitle}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Job Description */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Grid item xs={4}>
              <Typography sx={{ ...labelStyle }}>Job Description</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Enter Job Description"
                value={jobDescription}
                InputProps={{
                  sx: {
                    fontSize: "1.3rem",
                  },
                }}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {errors.jobDescription && (
                <Typography
                  color="error"
                  sx={{ fontSize: "1.3rem", marginTop: "0.25rem" }}
                >
                  {errors.jobDescription}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Experience Level */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Grid item xs={4}>
              <Typography sx={{ ...labelStyle }}>Experience Level</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                select
                fullWidth
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                InputProps={{
                  sx: {
                    fontSize: "1.3rem",
                  },
                }}
              >
                {/* Placeholder option */}
                <MenuItem value="" disabled>
                  Select Experience Level
                </MenuItem>
                <MenuItem value="Entry Level">Entry Level</MenuItem>
                <MenuItem value="Mid Level">Mid Level</MenuItem>
                <MenuItem value="Senior Level">Senior Level</MenuItem>
              </TextField>
              {errors.experienceLevel && (
                <Typography
                  color="error"
                  sx={{ fontSize: "1.3rem", marginTop: "0.25rem" }}
                >
                  {errors.experienceLevel}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Add Candidate Email */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Grid item xs={4}>
              <Typography sx={{ ...labelStyle }}>Add Candidate</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter candidate email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                onKeyDown={handleAddCandidate}
                InputProps={{
                  sx: {
                    fontSize: "1.3rem",
                  },
                  startAdornment: (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {candidates.map((email, index) => (
                        <Chip
                          key={index}
                          label={email}
                          onDelete={() => handleDeleteCandidate(email)}
                          sx={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                        />
                      ))}
                    </Box>
                  ),
                }}
              />
              {errors.candidates && (
                <Typography
                  color="error"
                  sx={{ fontSize: "1.3rem", marginTop: "0.25rem" }}
                >
                  {errors.candidates}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* End Date */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: "1rem" }}
          >
            <Grid item xs={4}>
              <Typography sx={{ ...labelStyle }}>End Date</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              {errors.endDate && (
                <Typography
                  color="error"
                  sx={{ fontSize: "1.3rem", marginTop: "0.45rem" }}
                >
                  {errors.endDate}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              width: "100px",
              height: "30px",
              fontSize: "12px",
              fontWeight: "700",
              background: " #0B66EF",
              float: "right",
              marginTop: "1.35rem",
            }}
          >
            Send
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%", fontSize: "1rem" }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Box>
      )}
    </div>
  );
};

export default InterviewForm;
