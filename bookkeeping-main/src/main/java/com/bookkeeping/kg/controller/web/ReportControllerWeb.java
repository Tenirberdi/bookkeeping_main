package com.bookkeeping.kg.controller.web;

import com.bookkeeping.kg.model.ProductDto;
import com.bookkeeping.kg.model.ReportsDto;
import com.bookkeeping.kg.model.SalaryDetailInfoDto;
import com.bookkeeping.kg.model.salary.ProductInfo;
import com.bookkeeping.kg.service.ReportService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/report")
public class ReportControllerWeb {

    private final ReportService reportService;

    public ReportControllerWeb(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/list")
    public String getList(Model model) {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String yyyyMMdd = sdf.format(date);
        model.addAttribute("reportList", reportService.getReports(yyyyMMdd, yyyyMMdd).getProductDtoList());
        return "reportList";
    }

    @GetMapping("/salary")
    public String getSalaryList(Model model) {
        //model.addAttribute("salaryList", reportService.getReportAll());
        return "salaryList";
    }

    @ResponseBody
    @GetMapping("/getProduction")
    public List<ProductDto> getProduction (@RequestParam("from") String dateFrom,
                                                     @RequestParam("to") String dateTo){
        return reportService.getReports(dateFrom, dateTo).getProductDtoList();
    }

    @ResponseBody
    @GetMapping("/getProduction/xls")
    public void getProductionXls(@RequestParam("from") String dateFrom,
                                           @RequestParam("to") String dateTo, HttpServletResponse response) throws Exception {
        reportService.getReportsXls(dateFrom, dateTo, response);
    }

    @ResponseBody
    @GetMapping("/getDetailReportSalary")
    public List<ProductInfo> getSalary (@RequestParam("from") String dateFrom,
                                        @RequestParam("to") String dateTo){
        return reportService.getDetailReportSalary(dateFrom, dateTo);
    }

    @ResponseBody
    @GetMapping("/getReportSalary")
    public void getReportSalary (@RequestParam("from") String dateFrom,
                                      @RequestParam("to") String dateTo,HttpServletResponse response) throws Exception {
         reportService.getDetailReportSalaryXls(dateFrom, dateTo,response);
    }
}
