export class BudgetRepo {
  getAll() {
    return [new Budget("202303", 31)];
  }
}

export class Budget {
  constructor(year_month, amount) {
    this.year_month = year_month;
    this.amount = amount;
  }
}
