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
    path: "/client",
    icon: <AccountCircleIcon sx={style} />,
  },
  {
    name: "Atendimento",
    path: "/atendimento",
    icon: <ListAltIcon sx={style} />,
    subItem: [
      {
        name: "Todos",
        path: "/todos",
      },
      {
        name: "Abertos",
        path: "/abertos",
      },
      {
        name: "Finalizados",
        path: "/finalizados",
      },
      {
        name: "Cancelados",
        path: "/cancelados",
      },
      {
        name: "Urgente",
        path: "/urgente",
      },
      {
        name: "Alta",
        path: "/alta",
      },
      {
        name: "Normal",
        path: "/normal",
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
        path: "/todos",
      },
      {
        name: "Em andamento",
        path: "/andamentos",
      },
      {
        name: "Finalizado",
        path: "/finalizado",
      },
      {
        name: "Cancelado",
        path: "/cancelado",
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
