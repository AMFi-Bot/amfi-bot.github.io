// Server API response types
export type apiSuccessResponseType = {
  success: true;
  status: number;
  status_description: string;
  data?: any;
};

export type apiRedirectResponseType = {
  response_type: "Redirect request";
  status: number;
  status_description: string;
  redirectTo?: string;
  data?: any;
};

export interface apiClientErrorResponseType {
  response_type: "Client error.";
  success: false;
  status: number;
  status_description: string;
  error?: {
    message?: string;
  };
  errors?: any;
}

export interface apiServerErrorResponseType {
  success: false;
  status: number;
  status_description: string;
  response_type: "Server error";
}
