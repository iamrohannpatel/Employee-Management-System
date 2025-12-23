import { jsPDF } from 'jspdf';

export const generatePayslip = (employee, salaryDetails, monthYear) => {
    const doc = new jsPDF();

    // Company Header
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("TechNova Inc.", 20, 20);
    
    doc.setFontSize(16);
    doc.text("Payslip", 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Period: ${monthYear}`, 20, 38);

    // Separator Line
    doc.setDrawColor(200);
    doc.line(20, 45, 190, 45);

    // Employee Details Section
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text("Employee Details", 20, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text(`Name: ${employee.firstName} ${employee.lastName}`, 25, 70);
    doc.text(`Role: ${employee.role}`, 25, 78);
    doc.text(`Employee ID: ${employee.id}`, 25, 86);
    doc.text(`Email: ${employee.email}`, 25, 94); // Assuming email is in employee object

    // Payment Details Section
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text("Payment Details", 20, 110);

    doc.setFontSize(11);
    doc.setTextColor(60);

    // Table-like structure for payment details
    const startY = 120;
    const lineHeight = 10;
    
    // Header Row
    doc.setFillColor(240, 240, 240);
    doc.rect(20, startY - 6, 170, 8, 'F');
    doc.setFont("helvetica", "bold");
    doc.text("Description", 25, startY);
    doc.text("Amount", 150, startY);
    doc.setFont("helvetica", "normal");

    // Data Rows
    doc.text("Base Salary", 25, startY + lineHeight);
    doc.text(`$${employee.salary}`, 150, startY + lineHeight);
    
    doc.text("Days Present", 25, startY + lineHeight * 2);
    doc.text(`${salaryDetails.daysPresent}`, 150, startY + lineHeight * 2);

    // Net Pay Line
    doc.setDrawColor(200);
    doc.line(20, startY + lineHeight * 3, 190, startY + lineHeight * 3);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0); // Green color for Net Pay
    doc.text("Net Payable Salary", 25, startY + lineHeight * 4);
    doc.text(`$${salaryDetails.payable}`, 150, startY + lineHeight * 4);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("This is a computer-generated document and does not require a signature.", 105, 280, null, null, "center");

    // Save File
    doc.save(`Payslip_${employee.firstName}_${monthYear.replace(' ', '_')}.pdf`);
};
