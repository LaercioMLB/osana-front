import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import { H1 } from "../../components/Text";
import { MenuItem, TextField } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [inventories, setInventories] = React.useState([]);
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
    setInventories(osObj.outputInventories.map((obj) => {
      return {
        inventory: obj.inventory,
        quantity: obj.quantity,
      }
    }))
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"><H1>Visualizar OS</H1></DialogTitle>

        <DialogContent>

            <TextField
              label="Cliente"
              sx={{ marginY: "20px", width: "100%" }}
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
              sx={{ marginY: "20px" }}
            />
            <TextField
              fullWidth
              label="Observações"
              multiline
              value={observacoes}
              disabled={true}
              rows={6}
              variant="outlined"
              sx={{ marginY: "20px" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginY: "20px",
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
                marginY: "30px",
              }}
            >
              <TextField
                name="Data de Devolução"
                label="Data de Devolução (Optional)"
                InputLabelProps={{ shrink: true }}
                type="date"
                value={devolution}
                disabled={true}
                sx={{ width: "48%" }}
              />

              <TextField
                label="Status"
                value={status}
                disabled={true}
                sx={{ width: "48%" }}
              >
              </TextField>
            </Box>

            
            <InputLabel id="equipments-label">Equipamentos da OS</InputLabel>
            <Demo>
              <List sx={{ marginBottom: "30px"}}>
                {equipments.length > 0 ? equipments.map( el =>
                  <ListItem key={el.id}>
                    <ListItemText
                      primary={`Nome: ${el.name}`}
                      secondary={`Modelo: ${el.model}`}
                    />
                  </ListItem>
                ) : "Não Contem Nenhum Equipamento Cadastrado nesta OS"}
              </List>
            </Demo>

            <InputLabel id="inventory-label">Produto do Estoque</InputLabel>
            <Demo>
              <List>
                {inventories.length > 0 ? inventories.map( obj =>
                  <ListItem key={obj.inventory.id}>
                    <ListItemText
                      primary={`Nome: ${obj.inventory.name}`}
                      secondary={`Quantidade: ${obj.quantity}`}
                    />
                  </ListItem>
                ) : "Não Contêm Nenhum Produto do Estoque Cadastrado nesta OS"}
              </List>
            </Demo>

        </DialogContent>

        <DialogActions>
          <Button sx={{ margin: "30px"}} variant="outlined" onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

