import React from "react";
import MfaTokenInput from "./PinInput";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <MfaTokenInput/>
  </React.StrictMode>,
);
