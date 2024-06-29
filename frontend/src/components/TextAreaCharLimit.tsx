import React from "react";

import { CharacterCount } from "@/components/CharacterCount";

export type TextAreaCharLimitProps = {
  id: string;
  className: string;
  placeholder: string;
  value: string;
  maxCount: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<React.ComponentProps<"input">, "type">;

export const TextAreaCharLimit = ({
  id,
  className,
  placeholder,
  value,
  maxCount,
  onChange,
}: TextAreaCharLimitProps) => {
  return (
    <div>
      <textarea
        id={id}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value.length > maxCount ? (
        <CharacterCount currCount={value.length} maxCount={maxCount} error={true} />
      ) : (
        <CharacterCount currCount={value.length} maxCount={maxCount} error={false} />
      )}
    </div>
  );
};
