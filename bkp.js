import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import AddIcon from "@mui/icons-material/Add";
import { H1 } from "../../components/Text";
import { MenuItem, TextField } from "@mui/material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select'
import { priorityObject } from "../../services/staticData"

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

export default function ButtonNewService({ idUsuario, createNewOS }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [listClient, setListClient] = React.useState([]);
  const [listPriority, setListPriority] = React.useState([]);
  const [listTypeService, setListTypeService] = React.useState([]);
  const [listEquipment, setListEquipment] = React.useState([]);
  const [listInventories, setListInventories] = React.useState([]);

  const [client, setClient] = React.useState('');
  const [prior, setPrior] = React.useState('');
  const [typeService, setTypeServices] = React.useState('');
  const [motive, setMotive] = React.useState('');
  const [observacoes, setObservacoes] = React.useState('');
  const [equipments, setEquipments] = React.useState([]);
  const [inventories, setInventories] = React.useState([]);
  const [devolution, setDevolution] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
    setClient('')
    setPrior('')
    setTypeServices('')
    setMotive('')
    setObservacoes('')
    setEquipments([])
    setInventories([])
    setDevolution('')
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

  const handleChangeEquipment = (result) => {
    const value = result.map(el => el.value)
    setEquipments(value);
  };

  const handleChangeInventories = (result) => {
    console.log(result)
    // const value = result.map(el => el.value)
    setInventories(result);
  };

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleCreateOs = async (event) => {
    event.preventDefault();
    // if (client && prior && typeService && motive){
    //   await api.post('/os', {
    //       idUsuario: idUsuario,
    //       idClient: client, 
    //       idPriority: prior, 
    //       idTypeServices: typeService, 
    //       motive: motive,
    //       obs: observacoes,
    //       devolution: devolution,
    //       equipaments: equipments,
    //       inventories: inventories,
    //     }, 
    //     config
    //   )
    //   .then((response) => {
    //     toast.success("Cadastrado com Sucesso")
    //     createNewOS(response.data)
    //     setOpen(false);
    //   })
    //   .catch((error) => toast.error(error.response.data)
    //   );
    // }else{
    //   toast.error("Preencha o Formulário corretamente !")
    // }
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
            quantidade: el.quantity,
            quantity: 0
          }
        })
        setListInventories(arrayList)
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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ height: "100%" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Nova OS
      </Button>

      <ToastContainer />

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "900px",
          margin: "auto",
          overflow: 'scroll',
        }}
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
            rows={6}
            variant="outlined"
            sx={{ marginY: "10px" }}
          />
          <TextField
            fullWidth
            label="Observações"
            onChange={event => setObservacoes(event.target.value)}
            multiline
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
              marginY: "10px",
            }}
          >
            <TextField
              name="Data de Devolução"
              label="Data de Devolução (Optional)"
              InputLabelProps={{ shrink: true }}
              type="date"
              defaultValue=""
              onChange={event => setDevolution(event.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
          </Box>
          
          <InputLabel id="equipments-label">Selecione os Equipamentos (Optional)</InputLabel>
          <Select
            id="equipments-label"
            isMulti
            name="equipments"
            options={listEquipment}
            isSearchable={true}
            isClearable={true}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChangeEquipment}
          />

          <InputLabel sx={{ marginTop: "20px" }} id="inventory-label">Selecione os Produtos do Estoque se Necessário (Optional)</InputLabel>
          <Select
            id="inventory-label"
            isMulti
            name="inventories"
            options={listInventories}
            isSearchable={true}
            isClearable={true}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChangeInventories}
          />

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
                  helperText={`Quantidade no Estoque: ${produto.quantidade}`} 
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                  label={`${produto.label.split(" - ")[0]}`}
                  onChange={
                    event => {
                      const min = 1;
                      const max = produto.quantidade;
                      const value = Math.max(min, Math.min(max, Number(event.target.value)));
                      // if (quantity <= produto.quantidade){
                      //   console.log(quantity)
                      // }
                      console.log(value)
                    }
                  }
                  required
                />
              </Box>)
            )
          }


          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
              marginTop: "30px"
            }}
          >
            <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleCreateOs}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}