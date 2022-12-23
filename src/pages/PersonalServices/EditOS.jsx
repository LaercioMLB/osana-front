import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import { H1 } from "../../components/Text";
import api from "../../services/api";
import { toast } from 'react-toastify';
import { MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { statusObject, priorityObject } from "../../services/staticData"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditOS({ idUsuario, osObj, editOS, handleCloseMenu }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [listClient, setListClient] = React.useState([]);
  const [listPriority, setListPriority] = React.useState([]);
  const [listTypeService, setListTypeService] = React.useState([]);
  const [listEquipment, setListEquipment] = React.useState([]);
  const [listInventories, setListInventories] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);

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

  const handleChangeInventories = (result) => {
    setInventories(result);
  };

  const handlechangeInputInventories = (id_produto, quantity) => {
    let newList = [...inventories]
    const index = newList.findIndex((produto) => produto.value === id_produto)
    let inventorio = newList[index]
    inventorio.quantity = quantity
    setInventories(newList);
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
    setObservacoes(osObj.obs === null ? "" : osObj.obs)
    handleChangeEquipment(osObj.equipment.map(el => {
      return {
        value: el.id,
        label: `${el.name} - ${el.model}`
      }
    }))
    handleChangeInventories(osObj.outputInventories.map((obj) => {
      return {
        value: obj.inventory.id,
        label: `${obj.inventory.name} - Quantidade: ${obj.inventory.quantity}`,
        quantidadeTotalEstoque: obj.inventory.quantity,
        quantity: obj.quantity
      }
    }))
    setDevolution(osObj.devolution === null ? "" : convertData(osObj.devolution))
  }

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleUpdateOs = async (event) => {
    event.preventDefault();
    console.log(inventories.map((inventory) => {
      return { id: inventory.value, quantity: inventory.quantity }
    }))
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
          inventories: inventories.map((inventory) => {
            return { id: inventory.value, quantity: inventory.quantity }
          }),
        }, 
        config
      )
      .then((response) => {
        toast.success("Alterado com Sucesso")
        editOS(response.data)
        handleClose();
      })
      .catch((error) => toast.error(error.response.data)
      );
    }else{
      toast.error("Preencha o Formulário corretamente !")
    }
  };

  async function getListClientes(){
    await api.get(`/client/findAll`, config)
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
    await api.get(`/equipment/findAll`, config)
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

  async function getListinventories(){
    await api.get(`/inventory/findAll`, config)
      .then((response) => {
        let arrayList = response.data.map(el => {
          return {
            value: el.id,
            label: `${el.name} - Quantidade: ${el.quantity}`,
            quantidadeTotalEstoque: el.quantity,
            quantity: 0
          }
        })
        setListInventories(arrayList.filter((el) => el.quantidadeTotalEstoque > 0))
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
    await api.get(`/services/findAll`, config)
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
    if (open === true){
      getListClientes();
      getListServices();
      getListEquipments();
      getListinventories();
      setListPriority(priorityObject)
      setListStatus(statusObject)
      setValues();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Box>
      <MenuItem onClick={handleOpen}>Editar OS</MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"><H1>Editar OS</H1></DialogTitle>
        <DialogContent>

          <TextField
            select
            label="Cliente"
            onChange={handleChangeClient}
            sx={{ marginY: "20px", width: "100%" }}
            value={client}
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
            rows={6}
            variant="outlined"
            sx={{ marginY: "20px" }}
          />
          <TextField
            fullWidth
            label="Observações"
            onChange={event => setObservacoes(event.target.value)}
            multiline
            value={observacoes}
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
              select
              label="Prioridade"
              value={prior}
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
              marginY: "20px",
            }}
          >
            <TextField
              name="Data de Devolução"
              label="Data de Devolução (Optional)"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={devolution}
              onChange={event => setDevolution(event.target.value)}
              sx={{ marginBottom: "10px", width: "48%" }}
            />
            <TextField
              select
              label="Status"
              value={status}
              onChange={handleChangStatus}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
              {listStatus.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          
          <InputLabel sx={{ marginTop: "30px" }} id="equipments-label">Selecione os Equipamentos (Optional)</InputLabel>
          <Select
            id="equipments-label"
            isMulti
            name="equipments"
            defaultValue={osObj.equipment.map(el => {
              return {
                value: el.id,
                label: `${el.name} - ${el.model}`
              }
            })}
            options={listEquipment}
            isSearchable={true}
            isClearable={true}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChangeEquipment}
          />

          <InputLabel sx={{ marginTop: "30px" }} id="inventory-label">Selecione os Produtos do Estoque se Necessário (Optional)</InputLabel>
          <Select
            id="inventory-label"
            isMulti
            name="inventories"
            defaultValue={osObj.outputInventories.map((obj) => {
              return {
                value: obj.inventory.id,
                label: `${obj.inventory.name} - Quantidade: ${obj.inventory.quantity}`,
                quantidadeTotalEstoque: obj.inventory.quantity,
                quantityInitial: obj.quantity,
                quantity: obj.quantity
              }
            })}
            options={listInventories}
            isSearchable={true}
            isClearable={true}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChangeInventories}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              marginY: "30px",
              marginBottom: "60px",
            }}
          >
            {inventories.length === 0 ? "" : 
              inventories.map(produto =>
                (<Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    key={produto.value}
                  >
                  <TextField
                    type="number"
                    helperText={`Quantidade no Estoque: ${produto.quantidadeTotalEstoque}`} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: produto.quantidadeTotalEstoque}}
                    label={`${produto.label.split(" - ")[0]}`}
                    defaultValue={produto.quantity}
                    onChange={
                      event => {
                        const min = 1;
                        const max = produto.quantidadeTotalEstoque;
                        const value = Math.max(min, Math.min(max, Number(event.target.value)));
                        if (event.target.value > produto.quantidadeTotalEstoque && event.target.value > produto.quantityInitial){
                          event.target.value = value
                          toast.error(`O máximo do Estoque é ${produto.quantidadeTotalEstoque}`)
                        }
                        handlechangeInputInventories(produto.value, Number(event.target.value))
                      }
                    }
                    required
                  />
                </Box>)
              )
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleUpdateOs}>
            Confirmar
          </Button>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

