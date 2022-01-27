import React from 'react';
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
import Box from "@mui/material/Box";

  const SimpleDialog = (props) => {
    const { dialogTitle, dialogContent } = props;
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
    return (
      <>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            whiteSpace: "pre-line",
          }}
        >
          <HelpOutlineRoundedIcon
            sx={{ justify: "right" }}
            onClick={handleClickOpenDialog}
          />
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogContent}</DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    );
  };

export default SimpleDialog;
