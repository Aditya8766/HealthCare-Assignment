import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi } from "vitest";
import App from "./App";

vi.mock("./components/navbar/Navbar", () => ({
  default: () => <div data-testid="navbar" />,
}));

vi.mock("./components/dashboard/patients-profile/PatientProfile", () => ({
  default: () => <div data-testid="patients-profile" />,
}));

vi.mock("./components/dashboard/patients-list/PatientsList", () => ({
  default: () => <div data-testid="patients-list" />,
}));

vi.mock("./components/dashboard/diagnosis-history/DiagnosisHistory", () => ({
  default: () => <div data-testid="diagnosis-history" />,
}));

vi.mock("./components/dashboard/diagnostic-list/DiagnosticList", () => ({
  default: () => <div data-testid="diagnostic-list" />,
}));

describe("App Component", () => {
  test("renders all main components", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("patients-profile")).toBeInTheDocument();
    expect(screen.getByTestId("patients-list")).toBeInTheDocument();
    expect(screen.getByTestId("diagnosis-history")).toBeInTheDocument();
    expect(screen.getByTestId("diagnostic-list")).toBeInTheDocument();
  });
});
