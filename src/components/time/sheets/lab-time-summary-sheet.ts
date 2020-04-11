import { Lo } from "../../../services/course/lo";
import { LabSheet } from "./lab-sheet";
import { deepScheme } from "./heat-map-colours";
import { UserMetric } from "../../../services/events/event-definitions";

export class LabsTimeSummarySheet extends LabSheet {
  title = "Lab Time in Minutes - Totals";
  subtitle = "Total Number of Minutes for each lab";

  populateCols(los: Lo[]) {
    los.forEach(lab => {
      this.columnDefs.push({
        headerName: lab.title,
        width: 48,
        field: lab.title,
        suppressSizeToFit: true,
        cellClassRules: deepScheme,
        menuTabs: []
      });
    });
  }

  populateRow(user: UserMetric, los: Lo[]) {
    let row = this.creatRow(user);
    this.zeroEntries(los, row);

    let summaryCount = 0;
    user.labActivity.forEach(labMetric => {
      let labSummaryCount = 0;
      if (labMetric) {
        labMetric.metrics.forEach(stepMetric => {
          if (stepMetric.duration) {
            labSummaryCount = labSummaryCount + stepMetric.duration / 2;
          }
        });
        row[`${labMetric.title}`] = labSummaryCount;
      }
      summaryCount = summaryCount + labSummaryCount;
    });
    row.summary = summaryCount;
    this.rowData.push(row);
  }

  updateRow(user: UserMetric, rowNode) {
    let summaryCount = 0;
    user.labActivity.forEach(labMetric => {
      let labSummaryCount = 0;
      if (labMetric) {
        labMetric.metrics.forEach(stepMetric => {
          if (stepMetric.duration) {
            labSummaryCount = labSummaryCount + stepMetric.duration / 2;
          }
        });
        rowNode.setDataValue(`${labMetric.title}`, labSummaryCount);
      }
      summaryCount = summaryCount + labSummaryCount;
    });
    rowNode.setDataValue("summary", summaryCount);
  }
}
