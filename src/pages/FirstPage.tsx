import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FirstPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);
  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateName(name)) {
      setError("Name should contain only alphabets and spaces.");
      return;
    }
    if (!validatePhone(phone)) {
      setError(
        "Phone number should be 10 digits long and contain only numbers."
      );
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify({ name, phone, email }));
    navigate("/second");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter Your Details
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!validateName(name) && name !== ""}
          helperText={
            !validateName(name) && name !== ""
              ? "Name should contain only alphabets."
              : ""
          }
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!validatePhone(phone) && phone !== ""}
          helperText={
            !validatePhone(phone) && phone !== ""
              ? "Phone number should be 10 digits long and contain only numbers."
              : ""
          }
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!validateEmail(email) && email !== ""}
          helperText={
            !validateEmail(email) && email !== ""
              ? "Please enter a valid email address."
              : ""
          }
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FirstPage;
