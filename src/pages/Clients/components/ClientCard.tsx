import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Client } from '../../../types';

interface Props {
  client: Client;
  onDelete: (client: Client) => void;
}

const ClientCardImpl = ({ client, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="h3" sx={{ mb: 0.5 }}>
            {client.name}
          </Typography>
          <Chip
            size="small"
            icon={<LocationOnIcon />}
            label={`${client.addresses.length} direcc.`}
            color={client.addresses.length > 0 ? 'primary' : 'default'}
            variant={client.addresses.length > 0 ? 'filled' : 'outlined'}
          />
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          Doc: {client.document}
        </Typography>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon fontSize="small" color="action" />
            <Typography variant="body2" noWrap>
              {client.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="body2">{client.phone}</Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
        <Tooltip title="Ver detalle">
          <IconButton size="small" onClick={() => navigate(`/clients/${client.id}`)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            size="small"
            onClick={() => navigate(`/clients/${client.id}/edit`)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton size="small" color="error" onClick={() => onDelete(client)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export const ClientCard = memo(ClientCardImpl);
