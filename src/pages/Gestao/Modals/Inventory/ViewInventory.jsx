import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { H1 } from "../../../../components/Text";
import { MenuItem, TextField } from "@mui/material";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  padding: "20px",
  borderRadius: "6px",
  width: "100%",
};

export default function ViewInventory({ inventory, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(inventory.name);
  const [quantity, setQuantity] = React.useState(inventory.quantity);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>Visualizar Dados</MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            ...style,
          }}
        >
          <H1>Estoque</H1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: "48%" }}
              label="Nome do Produto do Estoque"
              value={name}
              variant="outlined"
              disabled
              onChange={event => setName(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Quantidade"
              value={quantity}
              variant="outlined"
              disabled
              onChange={event => setQuantity(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
              marginTop: "30px"
            }}
          >
            <Button variant="outlined" onClick={handleClose}>Fechar Modal</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

