import { BudgetService } from "../src/BudgetService";
import dayJS from "dayjs";
import { BudgetRepo, Budget } from "../src/BudgetRepo";

// jest.mock("../src/BudgetRepo.js");

describe("BudgeService Test", () => {
  let budgetService = new BudgetService();

  const givenBudgetData = (budgetData) => {
    budgetService.getAll = () => [new Budget("202303", 31)];
    // BudgetRepo.mockImplementationOnce(() => {
    //   return {
    //     getAll: jest.fn().mockReturnValueOnce(),
    //   };
    // });
  };

  beforeAll(() => {
    budgetService = new BudgetService();
  });

  beforeEach(() => {
    // BudgetRepo.mockClear();
  });

  it("should be full-month ", () => {
    givenBudgetData();
    const total = budgetService.query(dayJS("2023-03-01"), dayJS("2023-03-31"));
    expect(total).toBe(31);
  });
});
