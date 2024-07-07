import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import DepartmentComponent from "../components/DepartmentComponent";
import DisplayData from "../components/DisplayData";
import { useNavigate } from "react-router-dom";

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      navigate("/", {
        state: {
          error: "Please enter your details before accessing second page.",
        },
      });
    }
  }, [navigate]);
  const departmentsData = [
    {
      department: "customer_service",
      subDepartments: [{ name: "support" }, { name: "customer_success" }],
    },
    {
      department: "design",
      subDepartments: [
        { name: "graphic_design" },
        { name: "product_design" },
        { name: "web_design" },
      ],
    },
  ];

  return (
    <>
      <DisplayData />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Departments and Sub-Departments
        </Typography>
        {departmentsData.map((department, index) => (
          <DepartmentComponent key={index} department={department} />
        ))}
      </Container>
    </>
  );
};

export default SecondPage;
