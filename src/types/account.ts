export enum AccountType {
	LOCAL = 'Локальная',
	LDAP = 'LDAP',
}

export interface Account {
  id: number;
  mark: {text: string}[]
  type: AccountType;
  login: string;
  password: string | null;
}