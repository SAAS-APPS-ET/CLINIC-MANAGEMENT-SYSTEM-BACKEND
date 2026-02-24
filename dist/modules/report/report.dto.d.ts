export declare class ReportDateRangeQueryDto {
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}
export declare class ReportStatusBreakdownQueryDto extends ReportDateRangeQueryDto {
    value?: string;
}
