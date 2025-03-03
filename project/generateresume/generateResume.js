import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generateResume = (values) => {
  const doc = new jsPDF();
  doc.setFont("Helvetica");
  doc.setFontSize(18);
  doc.text("Resume", 90, 20);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let currentY = 40;
  const filterNA = (data) => data && data !== "N/A";

  const personalDetails = [
    ['Mobile Number:', values?.mobileNumber],
    ['Date of Birth:', values?.dateOfBirth],
    ['Gender:', values?.gender],
    ['Address:', values?.presentAddress]
  ].filter(item => filterNA(item[1]));

  if (filterNA(values?.firstName) || filterNA(values?.lastName)) {
    doc.text(`Name: ${values.firstName || ''} ${values.lastName || ''}`, 20, currentY);
    currentY += 10;
  }
  if (filterNA(values?.email)) {
    doc.text(`Email: ${values.email}`, 20, currentY);
    currentY += 10;
  }
  if (personalDetails.length) {
    doc.autoTable({ startY: currentY, head: [['Personal Details', '']], body: personalDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  const educationDetails = [
    ['Field of Study:', values?.branch],
    ['College Name:', values?.college],
    ['Percentage:', filterNA(values?.percentage) ? `${values.percentage}` : ''],
    ['Passing Year:', values?.passingYear]
  ].filter(item => filterNA(item[1]));

  if (educationDetails.length) {
    doc.setFontSize(14);
    doc.text("Education Details", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Details', '']], body: educationDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }
  if (filterNA(values?.profile)) {
    doc.setFontSize(14);
    doc.text("Profile", 20, currentY);
    doc.autoTable({ 
      startY: currentY + 10, 
      head: [['Profile Summary']], 
      body: [[values.profile]], 
      theme: 'striped', 
      styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, 
      margin: { left: 20, right: 20 }
    });
    currentY = doc.autoTable.previous.finalY + 10;
  }
  

  if (filterNA(values?.skills)) {
    doc.setFontSize(14);
    doc.text("Skills", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Skills']], body: [[values.skills]], theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  const certifications = [
    ['Technical Certifications:', values?.technicalCertifications],
    ['Internship Certifications:', values?.internshipCertifications]
  ].filter(item => filterNA(item[1]));

  if (certifications.length) {
    doc.setFontSize(14);
    doc.text("Certifications", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Certification Type', 'Details']], body: certifications, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  if (filterNA(values?.yearsOfExperience) && values.yearsOfExperience > 0) {
    doc.setFontSize(14);
    doc.text("Experience", 20, currentY);
    const experienceDetails = [
      ['Years of Experience:', values.yearsOfExperience],
      ['Experience Details:', values.experienceDetails]
    ].filter(item => filterNA(item[1]));
    
    doc.autoTable({ startY: currentY + 10, head: [['Details', '']], body: experienceDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
    currentY = doc.autoTable.previous.finalY + 10;
  }

  const additionalDetails = [
    ['LinkedIn Profile:', values?.linkedinProfile],
    ['Project:', values?.project],
    ['Hobbies:', values?.hobbies]
  ].filter(item => filterNA(item[1]));

  if (additionalDetails.length) {
    doc.setFontSize(14);
    doc.text("Additional Details", 20, currentY);
    doc.autoTable({ startY: currentY + 10, head: [['Details', '']], body: additionalDetails, theme: 'striped', styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 }, margin: { left: 20, right: 20 }});
  }

  doc.save('resume.pdf');
  console.log("Resume PDF generated successfully!");
};

export default generateResume;
