import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { H1 } from "../../components/Text";
import api from "../../services/api";
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EditOS({ type, idUsuario, osObj, editOS }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [listClient, setListClient] = React.useState([]);
  const [listPriority, setListPriority] = React.useState([]);
  const [listTypeService, setListTypeService] = React.useState([]);
  const [listEquipment, setListEquipment] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);

  const [client, setClient] = React.useState(osObj.client.id);
  const [prior, setPrior] = React.useState(osObj.priority.idPriority);
  const [status, setStatus] = React.useState(osObj.status.id);
  const [typeService, setTypeServices] = React.useState(osObj.typeServices.idTypeServices);
  const [motive, setMotive] = React.useState(osObj.motive);
  const [observacoes, setObservacoes] = React.useState(osObj.obs);
  const [equipments, setEquipments] = React.useState([]);
  const [devolution, setDevolution] = React.useState(osObj.devolution);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const handleChangePrio = (event) => {
    setPrior(event.target.value);
  };

  const handleChangeTypeServices = (event) => {
    setTypeServices(event.target.value);
  };

  const handleChangStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeEquipment = (event) => {
    const {
      target: { value },
    } = event;
    setEquipments(value);
  };

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleUpdateOs = async (event) => {
    event.preventDefault();
    if (client && prior && typeService && motive){
      await api.put(`/os/${osObj.idOS}`, {
          idUsuario: idUsuario,
          idClient: client, 
          idPriority: prior, 
          idTypeServices: typeService, 
          idStatus: status, 
          motive: motive,
          obs: observacoes,
          devolution: devolution,
          equipaments: equipments,
          inventories: [],
        }, 
        config
      )
      .then((response) => {
        toast.success("Alterado com Sucesso")
        editOS(response.data)
        setOpen(false);
      })
      .catch((error) => toast.error(error.response.data)
      );
    }else{
      toast.error("Preencha o Formulário corretamente !")
    }
  };

  async function getListClientes(){
    await api.get(`/client`, config)
      .then((response) => {
        setListClient(response.data)
      })
      .catch((error) => {
          if (error.response.status === 403){
            localStorage.clear()
            navigate("/login")
          }else{
            toast.error("Algo deu errado !")
          }
        }
      );
  }

  async function getListEquipments(){
    await api.get(`/equipment`, config)
      .then((response) => {
        setListEquipment(response.data)
      })
      .catch((error) => {
          if (error.response.status === 403){
            localStorage.clear()
            navigate("/login")
          }else{
            toast.error("Algo deu errado !")
          }
        }
      );
  }

  async function getListServices(){
    await api.get(`/services`, config)
      .then((response) => {
        setListTypeService(response.data)
      })
      .catch((error) => {
          if (error.response.status === 403){
            localStorage.clear()
            navigate("/login")
          }else{
            toast.error("Algo deu errado !")
          }
        }
      );
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')){
      getListClientes();
      getListServices();
      getListEquipments();
      setListPriority([
        {id: 1, name: "Alta"},
        {id: 2, name: "Baixa"},
        {id: 3, name: "Urgente"},
      ])
      setListStatus([
        {id: 1, name: "Andamento"},
        {id: 2, name: "Finalizado"},
        {id: 3, name: "Aberto"},
      ])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <Box onClick={handleOpen}>{type === 'edit' ? "Editar" : "Visualizar"}</Box>

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
          <H1>Nova OS</H1>

          <TextField
            select
            label="Cliente"
            onChange={handleChangeClient}
            sx={{ marginBottom: "10px" }}
            value={client}
            disabled={type === 'edit' ? false : true}
          >
            {listClient.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.firstName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Motivo"
            onChange={event => setMotive(event.target.value)}
            multiline
            value={motive}
            disabled={type === 'edit' ? false : true}
            rows={6}
            variant="outlined"
            sx={{ marginY: "10px" }}
          />
          <TextField
            fullWidth
            label="Observações"
            onChange={event => setObservacoes(event.target.value)}
            multiline
            value={observacoes}
            disabled={type === 'edit' ? false : true}
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
              select
              label="Prioridade"
              value={prior}
              disabled={type === 'edit' ? false : true}
              onChange={handleChangePrio}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
              {listPriority.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Tipo de serviço"
              value={typeService}
              disabled={type === 'edit' ? false : true}
              onChange={handleChangeTypeServices}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
              {listTypeService.map((option) => (
                <MenuItem key={option.idTypeServices} value={option.idTypeServices}>
                  {option.services}
                </MenuItem>
              ))}
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
              disabled={type === 'edit' ? false : true}
              defaultValue=""
              onChange={event => setDevolution(event.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
          </Box>

          <TextField
            select
            label="Status"
            value={status}
            disabled={type === 'edit' ? false : true}
            onChange={handleChangStatus}
            sx={{ marginBottom: "10px", width: "100%" }}
          >
            {listStatus.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <InputLabel id="demo-multiple-chip-label">Selecione os Equipamentos (Optional)</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            sx={{ marginBottom: "10px", width: "100%" }}
            value={equipments}
            disabled={type === 'edit' ? false : true}
            onChange={handleChangeEquipment}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {listEquipment.map((equipment) => (
              <MenuItem
                key={equipment.id}
                value={equipment.id}
                style={getStyles(equipment.name, equipments, theme)}
              >
                {equipment.name} - {equipment.model}
              </MenuItem>
            ))}
          </Select>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
            }}
          >
            <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleUpdateOs} disabled={type === 'edit' ? false : true}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

