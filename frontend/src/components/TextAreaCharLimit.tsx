import React from "react";

import { CharacterCount } from "@/components/CharacterCount";
import { TextArea } from "./TextArea";

export type TextAreaCharLimitProps = {
  label: string;
  id: string;
  className: string;
  placeholder: string;
  value: string;
  maxCount: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
} & Omit<React.ComponentProps<"input">, "type">;

export const TextAreaCharLimit = ({
  label,
  id,
  className,
  placeholder,
  value,
  maxCount,
  onChange,
  error,
}: TextAreaCharLimitProps) => {
  return (
    <div>
      <TextArea
        label={label}
        id={id}
        className={className}
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
