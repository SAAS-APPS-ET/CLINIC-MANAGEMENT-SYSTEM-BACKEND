"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitStage = exports.QueueStatus = exports.VisitStatus = void 0;
var VisitStatus;
(function (VisitStatus) {
    VisitStatus["ACTIVE"] = "ACTIVE";
    VisitStatus["COMPLETED"] = "COMPLETED";
    VisitStatus["CANCELLED"] = "CANCELLED";
})(VisitStatus || (exports.VisitStatus = VisitStatus = {}));
var QueueStatus;
(function (QueueStatus) {
    QueueStatus["ACTIVE"] = "ACTIVE";
    QueueStatus["PAUSED"] = "PAUSED";
    QueueStatus["REMOVED"] = "REMOVED";
})(QueueStatus || (exports.QueueStatus = QueueStatus = {}));
var VisitStage;
(function (VisitStage) {
    VisitStage["WAITING"] = "WAITING";
    VisitStage["WAITING_FOR_VITAL"] = "WAITING_FOR_VITAL";
    VisitStage["VITAL_IN_PROGRESS"] = "VITAL_IN_PROGRESS";
    VisitStage["WAITING_FOR_DOCTOR"] = "WAITING_FOR_DOCTOR";
    VisitStage["DOCTOR_IN_PROGRESS"] = "DOCTOR_IN_PROGRESS";
    VisitStage["WAITING_FOR_LAB"] = "WAITING_FOR_LAB";
    VisitStage["LAB_IN_PROGRESS"] = "LAB_IN_PROGRESS";
    VisitStage["WAITING_FOR_LAB_REPORT"] = "WAITING_FOR_LAB_REPORT";
    VisitStage["WAITING_FOR_DOCTOR_REVIEW"] = "WAITING_FOR_DOCTOR_REVIEW";
    VisitStage["DOCTOR_REVIEW_IN_PROGRESS"] = "DOCTOR_REVIEW_IN_PROGRESS";
    VisitStage["WAITING_FOR_PHARMACY"] = "WAITING_FOR_PHARMACY";
    VisitStage["PHARMACY_IN_PROGRESS"] = "PHARMACY_IN_PROGRESS";
    VisitStage["COMPLETED"] = "COMPLETED";
})(VisitStage || (exports.VisitStage = VisitStage = {}));
//# sourceMappingURL=visit.enums.js.map