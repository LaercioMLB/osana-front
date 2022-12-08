import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { H1 } from "../../../components/Text";
import api from "../../../services/api";
import { toast } from "react-toastify";

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

export default function ButtonNewEstoque() {
  const [open, setOpen] = React.useState(false);
  const [equipment, setEquipment] = React.useState("");
  const [model, setModel] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function postEquipment() {
    await api
      .post("/equipment", { name: equipment, model: model })
      .then((response) => {
        toast.success(`Equipamento cadastrado`);
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Algo deu errado !");
      });
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ height: "100%" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Adicionar no Esqtoque
      </Button>

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
          <TextField
            sx={{ width: "60%", mt: "10px" }}
            label="Material"
            variant="outlined"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
          <TextField
            sx={{ width: "60%", mt: "30px" }}
            type="number"
            label="Quantidade"
            variant="outlined"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "30px",
            }}
          >
            <Button
              sx={{ marginRight: "10px" }}
              variant="contained"
              onClick={postEquipment}
            >
              Confirmar
            </Button>
            <Button variant="outlined">Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
