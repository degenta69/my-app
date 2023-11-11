import { Dialog, DialogContent, useTheme } from '@mui/material'
import React from 'react'

type Props = {
  children: React.ReactNode
  dialogOpen: boolean
  closeDialog: () => void
}

const DialogPopup = (props: Props) => {
  const theme = useTheme();

  const closeDialog = (event: any, reason: string) => {
    if (reason !== 'backdropClick') {
      props.closeDialog();
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.dialogOpen}
        onClose={closeDialog}
        closeAfterTransition
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            background: "transparent",
            boxShadow: "none",
            borderRadius: "unset",
            maxWidth: "1000px",
            [theme.breakpoints.down("sm")]: {
              minWidth: "90%",
            },
          }
        }}
      >
        <DialogContent>
          {props.children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default DialogPopup