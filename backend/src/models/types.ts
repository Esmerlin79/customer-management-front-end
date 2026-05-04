export interface Address {
  id: string;
  clientId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
  addresses: Address[];
}

export type CreateClientDTO = Omit<Client, 'id' | 'createdAt' | 'addresses'>;

export type UpdateClientDTO = Partial<CreateClientDTO>;

export type CreateAddressDTO = Omit<Address, 'id' | 'clientId'>;

export type UpdateAddressDTO = Partial<CreateAddressDTO>;
