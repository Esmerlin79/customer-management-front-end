import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { FormEvent, useState } from 'react';

import { CreateClientDTO } from '../../../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  initialValues?: CreateClientDTO;
  onSubmit: (data: CreateClientDTO) => Promise<void> | void;
  onCancel: () => void;
  mode: 'create' | 'edit';
  loading?: boolean;
}

const emptyValues: CreateClientDTO = {
  name: '',
  email: '',
  phone: '',
  document: '',
};

type Errors = Partial<Record<keyof CreateClientDTO, string>>;

export const ClientForm = ({
  initialValues,
  onSubmit,
  onCancel,
  mode,
  loading = false,
}: Props) => {
  const [data, setData] = useState<CreateClientDTO>(
    initialValues ?? emptyValues
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (data.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = 'Email inválido';
    }
    if (data.phone.trim().length < 6) {
      newErrors.phone = 'Teléfono inválido (mínimo 6 caracteres)';
    }
    if (data.document.trim().length < 3) {
      newErrors.document = 'Documento requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof CreateClientDTO) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre / Razón social"
            value={data.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Teléfono"
            value={data.phone}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Documento (RNC / Cédula)"
            value={data.document}
            onChange={handleChange('document')}
            error={!!errors.document}
            helperText={errors.document}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {mode === 'create' ? 'Crear cliente' : 'Guardar cambios'}
        </Button>
      </Stack>
    </Box>
  );
};
