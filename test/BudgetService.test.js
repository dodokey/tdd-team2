import { BudgetService } from "../src/BudgetService";
import dayJS from "dayjs";
describe("BudgeService Test", () => {
  let budgetService = new BudgetService();

  beforeAll(() => {
    budgetService = new BudgetService();
  });

  it("should be full-month ", () => {
    const total = budgetService.query(dayJS("2023-03-01"), dayJS("2023-03-31"));
    expect(total).toBe(31);
  });
});
