import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { FormEvent, useState } from 'react';

import { CreateAddressDTO } from '../../../types';

interface Props {
  initialValues?: CreateAddressDTO;
  onSubmit: (data: CreateAddressDTO) => Promise<void> | void;
  onCancel: () => void;
  mode: 'create' | 'edit';
  loading?: boolean;
}

const emptyValues: CreateAddressDTO = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'República Dominicana',
  isPrimary: false,
};

type Errors = Partial<Record<keyof CreateAddressDTO, string>>;

export const AddressForm = ({
  initialValues,
  onSubmit,
  onCancel,
  mode,
  loading = false,
}: Props) => {
  const [data, setData] = useState<CreateAddressDTO>(
    initialValues ?? emptyValues
  );
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};
    const requireString = (field: keyof CreateAddressDTO, min = 2) => {
      const value = data[field];
      if (typeof value === 'string' && value.trim().length < min) {
        newErrors[field] = `Mínimo ${min} caracteres`;
      }
    };
    requireString('street');
    requireString('city');
    requireString('state');
    requireString('zipCode', 1);
    requireString('country');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof CreateAddressDTO) =>
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
        <Grid item xs={12}>
          <TextField
            label="Calle y número"
            value={data.street}
            onChange={handleChange('street')}
            error={!!errors.street}
            helperText={errors.street}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ciudad"
            value={data.city}
            onChange={handleChange('city')}
            error={!!errors.city}
            helperText={errors.city}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Provincia / Estado"
            value={data.state}
            onChange={handleChange('state')}
            error={!!errors.state}
            helperText={errors.state}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Código postal"
            value={data.zipCode}
            onChange={handleChange('zipCode')}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="País"
            value={data.country}
            onChange={handleChange('country')}
            error={!!errors.country}
            helperText={errors.country}
            fullWidth
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.isPrimary}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, isPrimary: e.target.checked }))
                }
                disabled={loading}
              />
            }
            label="Marcar como dirección principal"
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {mode === 'create' ? 'Agregar dirección' : 'Guardar cambios'}
        </Button>
      </Stack>
    </Box>
  );
};
