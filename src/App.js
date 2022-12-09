import logo from "./logo.svg";
import "./App.css";
// import RentTable from "./components/RentTable";
import Grid from "@mui/material/Grid";
import Home from "./pages/Home";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Home />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
