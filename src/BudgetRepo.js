export class BudgetRepo {
  getAll() {
    return [new Budget("202101", 3100)];
  }
}

class Budget {
  constructor(year_month, amount) {
    this.year = year_month;
    this.amount = amount;
  }
}
