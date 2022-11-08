import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ListAltIcon from "@mui/icons-material/ListAlt";

const style = {
  width: "30px",
  height: "30px",
  marginRight: "10px",
};

const nav = [
  {
    name: "Clientes",
    path: "/clientes",
    icon: <AccountCircleIcon sx={style} />,
  },
  {
    name: "Atendimento",
    path: "/atendimentos",
    icon: <ListAltIcon sx={style} />,
    subItem: [
      {
        name: "Todos",
        filter: "todos",
      },
      {
        name: "Abertos",
        filter: "abertos",
      },
      {
        name: "Finalizados",
        filter: "finalizados",
      },
      {
        name: "Cancelados",
        filter: "cancelados",
      },
      {
        name: "Urgente",
        filter: "urgente",
      },
      {
        name: "Alta",
        filter: "alta",
      },
      {
        name: "Normal",
        filter: "normal",
      },
    ],
  },
  {
    name: "Meus Atendimentos",
    path: "/meus-atendimentos",
    icon: <SupportAgentIcon sx={style} />,
    subItem: [
      {
        name: "Todos",
        filter: "todos",
      },
      {
        name: "Em andamento",
        filter: "andamentos",
      },
      {
        name: "Finalizado",
        filter: "finalizado",
      },
      {
        name: "Cancelado",
        filter: "cancelado",
      },
    ],
  },
  {
    name: "Suporte",
    path: "/suporte",
    icon: <PrivacyTipIcon sx={style} />,
  },
];

export default nav;
