import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material';
import { memo } from 'react';

import { Address } from '../../../types';

interface Props {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
}

const AddressItemImpl = ({ address, onEdit, onDelete }: Props) => (
  <ListItem
    sx={{
      border: '1px solid',
      borderColor: address.isPrimary ? 'primary.main' : 'divider',
      borderRadius: 2,
      mb: 1,
      backgroundColor: address.isPrimary ? 'primary.main' : 'transparent',
      color: address.isPrimary ? 'primary.contrastText' : 'inherit',
      ...(address.isPrimary && {
        '& .MuiListItemText-primary': { color: 'primary.contrastText' },
        '& .MuiListItemText-secondary': { color: 'rgba(255,255,255,0.85)' },
      }),
      transition: 'all 0.2s',
      '&:hover': {
        boxShadow: 1,
      },
    }}
    secondaryAction={
      <Stack direction="row">
        <Tooltip title="Editar">
          <IconButton
            edge="end"
            onClick={() => onEdit(address)}
            sx={{ color: address.isPrimary ? 'primary.contrastText' : 'inherit' }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            edge="end"
            onClick={() => onDelete(address)}
            sx={{
              color: address.isPrimary ? 'error.light' : 'error.main',
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    }
  >
    <ListItemIcon>
      <HomeIcon
        sx={{ color: address.isPrimary ? 'primary.contrastText' : 'action.active' }}
      />
    </ListItemIcon>
    <ListItemText
      primary={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{address.street}</span>
          {address.isPrimary && (
            <Chip
              size="small"
              icon={<StarIcon />}
              label="Principal"
              sx={{
                backgroundColor: '#FFFFFF',
                color: 'primary.main',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'primary.main' },
              }}
            />
          )}
        </Box>
      }
      secondary={`${address.city}, ${address.state}, ${address.zipCode} · ${address.country}`}
    />
  </ListItem>
);

export const AddressItem = memo(AddressItemImpl);
