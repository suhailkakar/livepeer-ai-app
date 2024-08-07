import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Pipeline, Model, InputGroup, InputField } from "@/types";
import { useAppContext } from "@/context";

interface SettingsFormProps {
  pipelines: Pipeline[];
  models: Model[];
  inputs: InputGroup[];
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  pipelines,
  models,
  inputs,
}) => {
  const { payload, setPayload } = useAppContext();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setPayload((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderInput = (input: InputField) => {
    switch (input.type) {
      case "number":
        return (
          <Input
            type="number"
            id={input.id}
            name={input.id}
            defaultValue={Number(input.default_value)}
            onChange={handleChange}
          />
        );
      case "boolean":
        return (
          <Switch
            id={input.id}
            name={input.id}
            defaultChecked={Boolean(input.default_value)}
            onChange={handleChange}
          />
        );
      case "select":
        if (input.id === "model_id") {
          return (
            <Select
              defaultValue={input.default_value}
              onValueChange={(value) =>
                setPayload((prev) => ({ ...prev, model_id: value }))
              }
            >
              <SelectTrigger
                id="model_id"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models
                  .filter((item) => item.pipeline === payload.pipeline)
                  .map((item) => (
                    <SelectItem key={item.model_id} value={item.model_id}>
                      <div className="flex items-start text-muted-foreground">
                        <div className="grid">
                          <p>{item.model_id}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          );
        }
        return null;
      case "file":
        return (
          <>
            <Input
              type="file"
              accept="image/*"
              id={input.id}
              name={input.id}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
      <div className="grid gap-3">
        <Label htmlFor="pipeline">Pipeline</Label>
        <Select
          defaultValue={payload.pipeline}
          onValueChange={(value) =>
            setPayload((prev) => ({ ...prev, pipeline: value }))
          }
        >
          <SelectTrigger
            id="pipeline"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a pipeline" />
          </SelectTrigger>
          <SelectContent>
            {pipelines.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                <div className="flex items-start text-muted-foreground gap-1">
                  {item.icon}
                  <div className="grid gap-0.5 ml-2">
                    <p>{item.name}</p>
                    <p className="text-xs" data-description>
                      {item.description}
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {inputs
          .filter((item) => item.pipeline === payload.pipeline)
          .map((item) =>
            item.items
              .filter((input) => input.for === "settings")
              .map((input) => (
                <div
                  className={
                    input.type !== "boolean"
                      ? "flex flex-col gap-3"
                      : "flex flex-row justify-between w-full items-center"
                  }
                  key={input.id}
                >
                  <Label htmlFor={input.id}>{input.name}</Label>
                  {renderInput(input)}
                </div>
              ))
          )}
      </div>
    </fieldset>
  );
};
