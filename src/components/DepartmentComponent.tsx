import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface SubDepartment {
  name: string;
}

interface Department {
  department: string;
  subDepartments: SubDepartment[];
}

interface DepartmentProps {
  department: Department;
}

const DepartmentComponent: React.FC<DepartmentProps> = ({ department }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [subDepartmentsSelected, setSubDepartmentsSelected] = useState<
    boolean[]
  >(new Array(department.subDepartments.length).fill(false));

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSelectDepartment = () => {
    setSelected(!selected);
    setSubDepartmentsSelected(subDepartmentsSelected.fill(!selected));
  };

  const handleSelectSubDepartment = (index: number) => {
    const newSubDepartmentsSelected = [...subDepartmentsSelected];
    newSubDepartmentsSelected[index] = !subDepartmentsSelected[index];
    setSubDepartmentsSelected(newSubDepartmentsSelected);

    if (newSubDepartmentsSelected.every((isSelected) => isSelected)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  return (
    <List component="div" disablePadding>
      <ListItem button onClick={handleToggle}>
        <ListItemIcon>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            checked={selected}
            onChange={handleSelectDepartment}
          />
        </ListItemIcon>
        <ListItemText primary={department.department} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {department.subDepartments.map((subDepartment, index) => (
            <ListItem
              key={subDepartment.name}
              button
              style={{ paddingLeft: 32 }}
              onClick={() => handleSelectSubDepartment(index)}
            >
              <ListItemIcon>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={subDepartmentsSelected[index]}
                />
              </ListItemIcon>
              <ListItemText primary={subDepartment.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default DepartmentComponent;
