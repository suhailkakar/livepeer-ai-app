import { ReactNode } from "react";

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
}

export interface Model {
  pipeline: string;
  model_id: string;
}

export interface InputField {
  type: "select" | "textarea" | "number" | "boolean" | "file";
  for: "settings" | "prompt";
  name: string;
  id: string;
  isRequired: boolean;
  default_value?: number | string | boolean;
}

export interface InputGroup {
  pipeline: string;
  items: InputField[];
}

export interface Payload {
  pipeline: string;
  model_id: string;
  [key: string]: string;
}

export interface OutputImage {
  url: string;
}

export interface AppContextType {
  payload: Payload;
  setPayload: React.Dispatch<React.SetStateAction<Payload>>;
  output: OutputImage[];
  setOutput: React.Dispatch<React.SetStateAction<OutputImage[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
