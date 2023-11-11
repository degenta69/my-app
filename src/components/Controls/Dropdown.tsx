import {
  styled,
  Select,
  SelectProps,
} from "@mui/material";

interface Props extends SelectProps {
  children: React.ReactNode | React.ReactNode[] | null;
}

export const SmallDropdown = styled((props: Props) => (
  <Select {...props} size="small">
    {props.children}
  </Select>
))(({ theme }) => ({
  height: "max-content",

  "& .MuiSelect-select": {
    minHeight: "0rem",
    padding: "3.5px 10px",
  },
}));
