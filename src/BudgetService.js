import dayjs from "dayjs";
import isBetween from "dayJS/plugin/isBetween";
import { BudgetRepo } from "./BudgetRepo";

dayjs.extend(isBetween);

export class BudgetService {
  budgeRepo = new BudgetRepo();

  constructor() {}

  getBudgetDataInDuration(start, end) {
    const startYearMonth = dayjs(start).format("YYYYMM");
    const endYearMonth = dayjs(end).format("YYYYMM");
    const durationByMonth =
      dayjs(startYearMonth).diff(dayjs(endYearMonth), "month", true) + 1;
    const data = this.budgeRepo.getAll();
    const budgetDataInDuration = data.filter((item) => {
      const result = dayjs(item.year_month).isSame(
        dayjs(startYearMonth),
        dayjs(endYearMonth),
        "month"
      );

      return result;
    });
    // budgetDataInDuration.

    return { durationByMonth, budgetDataInDuration };
  }

  query(start, end) {
    try {
      let total = 0;

      const { durationByMonth, budgetDataInDuration } =
        this.getBudgetDataInDuration(start, end);
      for (let i = 0; i < durationByMonth; i++) {
        const budgetPerDay =
          budgetDataInDuration[i].amount /
          dayjs(start).add(i, "month").daysInMonth();

        if (i === 0 && dayjs(start).date() !== 1) {
          // 不足月
          total +=
            (dayjs(start).daysInMonth() - dayjs(start).date() + 1) *
            budgetPerDay;
        } else if (i === durationByMonth.length - 1 && isFinalDate(end)) {
          // 不足月
          total += dayjs(end).date() * budgetPerDay;
        } else {
          // 直接+足月的 budget
          total += budgetDataInDuration[i].amount;
        }
      }
      return total;
    } catch (error) {
      console.log("error: ", error);
    }
  }
}

// while(start< end){
//     if(start + 1month > end){
//        total += amount/這個月總天數* 範圍內天數
//     }
//     else() {

//     }
// }

// const thisMonth = start.addMonth(i)
// const thisMonthBudget =
// const thisMonthDays = dayjs(start).daysInMonth()
// cosnt thisMonthPerDayBudget = thisMonthBudget / thisMonthDays
