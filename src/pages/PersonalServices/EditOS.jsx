import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { H1 } from "../../components/Text";
import api from "../../services/api";
import { toast } from 'react-toastify';
import { MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

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

export default function EditOS({ type, idUsuario, osObj, editOS }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [listClient, setListClient] = React.useState([]);
  const [listPriority, setListPriority] = React.useState([]);
  const [listTypeService, setListTypeService] = React.useState([]);
  const [listEquipment, setListEquipment] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);

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

  const handleChangeEquipment = (result) => {
    const value = result.map(el => el.value)
    setEquipments(value);
  };

  const convertData = (data) => {
    if (data){
      var newData = data.split("T")[0]
      return newData
    }
  }

  function setValues(){
    setClient(osObj.client.id)
    setPrior(osObj.priority.idPriority)
    setStatus(osObj.status.id)
    setTypeServices(osObj.typeServices.idTypeServices)
    setMotive(osObj.motive)
    setObservacoes(osObj.obs)
    setEquipments(osObj.equipment.map(el => {
      return {
        value: el.id,
        label: `${el.name} - ${el.model}`
      }
    }))
    setDevolution(convertData(osObj.devolution))
  }

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
        let arrayList = response.data.map(el => {
          return {
            value: el.id,
            label: `${el.name} - ${el.model}`
          }
        })
        setListEquipment(arrayList)
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
      setValues();
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
            sx={{ marginBottom: "20px", width: "100%" }}
          >
            {listStatus.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <Select
            isMulti
            name="equipments"
            defaultValue={equipments}
            options={listEquipment}
            isSearchable={true}
            isClearable={true}
            isDisabled={type === 'edit' ? false : true}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChangeEquipment}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
              marginTop: "30px"
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

