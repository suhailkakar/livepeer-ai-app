import { InputField } from "@/types";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { models } from "@/lib/constants";

const renderInput = (input: InputField, selectedPipline: string) => {
  switch (input.type) {
    case "number":
      return (
        <Input
          type="number"
          id={input.id}
          name={input.id}
          defaultValue={Number(input.default_value)}
        />
      );
    case "boolean":
      return (
        <Switch
          id={input.id}
          name={input.id}
          defaultChecked={Boolean(input.default_value)}
        />
      );
    case "select":
      if (input.id === "model_id") {
        return (
          <Select name="model_id" defaultValue={String(input.default_value)}>
            <SelectTrigger
              id="model_id"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models
                .filter((item) => item.pipeline === selectedPipline)
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
        <Input type="file" accept="image/*" id={input.id} name={input.id} />
      );
    case "textarea":
      return (
        <Textarea
          id={input.id}
          name={input.id}
          defaultValue={input.default_value as string}
        />
      );
    default:
      return null;
  }
};

export default renderInput;
