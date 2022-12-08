import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import { H1 } from "../../components/Text";
import { MenuItem, TextField } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

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
  width: "95%",
};

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ViewOS({ osObj, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);

  const [client, setClient] = React.useState(0);
  const [prior, setPrior] = React.useState(0);
  const [status, setStatus] = React.useState(0);
  const [typeService, setTypeServices] = React.useState(0);
  const [motive, setMotive] = React.useState("");
  const [observacoes, setObservacoes] = React.useState("");
  const [equipments, setEquipments] = React.useState([]);
  const [devolution, setDevolution] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const convertData = (data) => {
    if (data){
      var newData = data.split("T")[0]
      return newData
    }
  }

  function setValues(){
    setClient(osObj.client.firstName)
    setPrior(osObj.priority.name)
    setStatus(osObj.status.name)
    setTypeServices(osObj.typeServices.services)
    setMotive(osObj.motive)
    setObservacoes(osObj.obs === null ? "" : osObj.obs)
    setEquipments(osObj.equipment)
    setDevolution(osObj.devolution === null ? "" : convertData(osObj.devolution))
  }

  React.useEffect(() => {
    if (open === true){
      setValues();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Box>
      <MenuItem onClick={handleOpen}>Visualizar OS</MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "900px",
          margin: "auto",
          overflow: 'scroll',
        }}
        disableScrollLock={true}
      >
        <Box
          sx={{
            ...style,
          }}
        >
          <H1>Visualizar OS</H1>

          <TextField
            label="Cliente"
            sx={{ marginBottom: "10px" }}
            value={client}
            disabled={true}
          >
          </TextField>
          <TextField
            fullWidth
            label="Motivo"
            multiline
            value={motive}
            disabled={true}
            rows={6}
            variant="outlined"
            sx={{ marginY: "10px" }}
          />
          <TextField
            fullWidth
            label="Observações"
            multiline
            value={observacoes}
            disabled={true}
            rows={6}
            variant="outlined"
            sx={{ marginY: "10px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginY: "10px",
            }}
          >
            <TextField
              label="Prioridade"
              value={prior}
              disabled={true}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
            </TextField>

            <TextField
              label="Tipo de serviço"
              value={typeService}
              disabled={true}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
            </TextField>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginY: "10px",
            }}
          >
            <TextField
              name="Data de Devolução"
              label="Data de Devolução (Optional)"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={devolution}
              disabled={true}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
          </Box>

          <TextField
            label="Status"
            value={status}
            disabled={true}
            sx={{ marginBottom: "20px", width: "100%" }}
          >
          </TextField>
          
          <InputLabel id="equipments-label">Equipamentos da OS</InputLabel>
          <Demo>
            <List>
              {equipments.length > 0 ? equipments.map( el =>
                <ListItem>
                  <ListItemText
                    primary={`Nome: ${el.name}`}
                    secondary={`Modelo: ${el.model}`}
                  />
                </ListItem>
              ) : "Não Contem Nenhum Equipamento Cadastrado nesta OS"}
            </List>
          </Demo>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
              marginTop: "30px"
            }}
          >
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

