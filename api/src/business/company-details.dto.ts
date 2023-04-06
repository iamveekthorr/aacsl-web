export class CompanyDetails {
  company_number: string;
  date_of_creation: string;
  company_status: string;
  company_name: string;
  type: string;
  last_full_members_list_date?: string;
  jurisdiction?: string;
  registered_office_address?: RegisteredAddressDto;
  sic_codes?: Array<string>;
  undeliverable_registered_office_address?: boolean;
  has_insolvency_history?: boolean;
  has_charges?: boolean;
  registered_office_is_in_dispute?: boolean;
  date_of_cessation?: string;
  can_file?: boolean;
}

class RegisteredAddressDto {
  postal_code?: string;
  address_line_2?: string;
  country?: string;
  address_line_1?: string;
  locality?: string;
}

export class CompaniesHouseReturn {
  top_hit: CompanyDetails;
  items: CompanyDetails[];
  kind: string;
  hits: number;
}
