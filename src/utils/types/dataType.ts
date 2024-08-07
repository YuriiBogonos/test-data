 export interface IDataItem {
  created_dt: string,
  data_source_modified_dt: string,
  entity_type: string,
  legal_name: string,
  dba_name: string,
  physical_address: string,
  p_street: string,
  p_city: string,
  p_state: string,
  p_zip_code: string,
  phone: string,
  mailing_address: string,
  m_street: string,
  m_city: string,
  m_state: string,
  m_zip_code: string,
  usdot_number: string,
  power_units: string,
  mcs_150_form_date: string,
  drivers: string,
  mcs_150_mileage_year: string,
  id: string,
  credit_score: string,
  record_status: string,
  mc_mx_ff_number: string
  }
  
  export interface IData {
    data_items: IDataItem[];
  }
  