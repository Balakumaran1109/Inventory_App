import TextField from "@mui/material/TextField";

export default function ComboBox({ onChange, value }) {
  return (
    <>
    
      <TextField
      sx={{width: 300}}
        label="Search for products"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
