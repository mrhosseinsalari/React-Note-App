import { render, RenderOptions, RenderResult } from "@testing-library/react";
import AppProviders from "./providers/AppProviders";
import { ReactNode } from "react";

const customRender = (
  ui: ReactNode,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult => render(ui, { wrapper: AppProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
