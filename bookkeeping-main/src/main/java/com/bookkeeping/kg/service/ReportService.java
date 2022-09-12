package com.bookkeeping.kg.service;

import com.bookkeeping.kg.model.ReportsDto;
import com.bookkeeping.kg.model.SalaryDetailInfoDto;
import com.bookkeeping.kg.model.SalaryInfoDto;
import com.bookkeeping.kg.model.salary.ProductInfo;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface ReportService {
    List<ReportsDto> getReportAll();
    ReportsDto getReports(String dateFrom, String dateTo);
    List<ProductInfo> getDetailReportSalary(String dateFrom, String dateTo);
    List<ProductInfo> getReportSalary(String dateFrom, String dateTo);
    void getDetailReportSalaryXls(String startDate, String endDate, HttpServletResponse response) throws Exception;
    void getReportsXls(String dateFrom, String dateTo,HttpServletResponse response) throws Exception;
}
