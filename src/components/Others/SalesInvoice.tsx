import React from "react";
import { useBarChart } from "../Charts/useBarChart";
import { ChartDataContext } from "../../context/ChartDataContext";
import { ReactPortal } from "../Portal/ReactPortal";
import { Button, Grid, Box } from "@mui/material";
import DialogPopup from "../Layouts/DialogPopup";
import { Upload, UploadFile } from "@mui/icons-material";

type ISalesInvoice = {};

const SalesInvoice: React.FC<ISalesInvoice> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);

  const [popupState, setPopupState] = React.useState(false)

  const [file, setFile] = React.useState<File | null>(null);

  const datasets = React.useContext(ChartDataContext);

  const svgRef = useBarChart(ref, datasets!.barChartData);

  const handleOpen = () => {
    setPopupState(true)
  }

  const handleClose = () => {
    setPopupState(false)
  }

  return (
    <>
      <svg width={"100%"} height={"inherit"} ref={svgRef} />
      <ReactPortal 
        wrapperId="id-SalesInvoice-utility"
      >
        <Grid container alignItems={'center'}>
          <Button onClick={handleOpen} variant="text" disableElevation disableFocusRipple disableRipple disableTouchRipple  translate="yes" sx={{backgroundColor:"#E8EFFC",color:"#58BB5F",textTransform:"capitalize", px:'0.5rem'}} size="small">New Sales invoice</Button>
        </Grid>
      </ReactPortal>

      <DialogPopup 
        closeDialog={handleClose}
        dialogOpen={popupState}
      >
        <Box
          sx={{
            width: "69vw",
            height: "64vh",
            backgroundColor: "#E8EFFC",
            color:"#58BB5F",
            borderRadius: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& input": {
              opacity: "0",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              position: "absolute",
            },
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}>
            <UploadFile/>
            <span>Click to Upload New Sales Invoice</span>
            {file && (
              <span>
                {file.name} ({file.size} bytes)
              </span>
            )}
           </Box>
          <input type="file" onChange={
            (e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                handleClose()
              }
            }
          } />
        </Box>
      </DialogPopup>
    </>
  );
};

export default SalesInvoice;
