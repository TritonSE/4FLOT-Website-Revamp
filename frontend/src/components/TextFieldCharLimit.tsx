import React from "react";

import { CharacterCount } from "@/components/CharacterCount";
import { TextField } from "@/components/TextField";

export type TextFieldCharLimitProps = {
  label: string;
  placeholder: string;
  value: string;
  maxCount: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
} & Omit<React.ComponentProps<"input">, "type">;

export const TextFieldCharLimit = ({
  label,
  placeholder,
  value,
  maxCount,
  onChange,
  error,
}: TextFieldCharLimitProps) => {
  return (
    <div>
      <TextField
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
      {value.length > maxCount ? (
        <CharacterCount currCount={value.length} maxCount={maxCount} error={true} />
      ) : (
        <CharacterCount currCount={value.length} maxCount={maxCount} error={false} />
      )}
    </div>
  );
};
