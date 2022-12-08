import { React } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts({ typeAlert, titleAlert, descriptionAlert }) {
  return (
    <Stack sx={{ width: '50%', align: "center", mt: "50px", mb: "50px", mx: "auto" }} spacing={2}>
      <Alert severity={ typeAlert }>
        <AlertTitle>{ titleAlert }</AlertTitle>
        <strong>{descriptionAlert}</strong>
      </Alert>
    </Stack>
  );
}