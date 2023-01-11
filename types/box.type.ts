import React from 'react';

export type BoxElementType = {
  children: React.ReactNode;
  classes?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};