import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 32,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          p: 1,
          m: 1,
          gap: 3,
        }}
      >
        <Box className="loading_text" sx={{ color: "black" }}>
          Please Wait...
        </Box>
        <Box>
          <CircularProgress disableShrink size={32} color="inherit" />
        </Box>
      </Box>
    </Box>
  );
};

// export const SpinnerImg = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CircularProgress />
//     </Box>
//   );
// };

export default Loader;
