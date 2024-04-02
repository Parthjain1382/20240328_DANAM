import { Component } from '@angular/core';
import { TableComponentComponent } from '../table-component/table-component.component';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-donor-profile-page',
  standalone: true,
  imports: [TableComponentComponent],
  templateUrl: './donor-profile-page.component.html',
  styleUrl: './donor-profile-page.component.css'
})
export class DonorProfilePageComponent {
  amount=500;
  causes=50;
  donorName:string="Pranay"


  generatePDF(){
    // Creating a jsPDF instance in landscape orientation.
    const doc = new jsPDF('l', 'pt', 'a4');

    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqavmFBs4lC3DVDcv4LaU32KBmrY2B_WVQcwWsHViEog&s'
    // Load the image from the URL
    const loadImage = (url: string, callback: (img: HTMLImageElement) => void) => {
      let img = new Image();
      img.onload = function() {
        // Use type assertion to treat `this` as HTMLImageElement
        callback(this as HTMLImageElement);
      };
      img.src = url;
    };

    // Once the image is loaded, add it to the PDF
    loadImage(imageUrl, (img) => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Assuming you have already adjusted the opacity of the image as needed
      doc.addImage(img, 'JPEG', 110, 50, 30, 30);
      let headingOffset2 = (doc.internal.pageSize.getWidth() - 50) / 2;

    doc.addFileToVFS("TimesNewRoman.ttf", "YourBase64EncodedFont");
    doc.addFont("TimesNewRoman.ttf", "TimesNewRoman", "normal");
    // Set the font to bold for the heading
    doc.setFont('TimesNewRoman', 'bold');
    doc.setFontSize(42); // Adjust the font size as needed for the heading

    // Calculate the position for the heading "Certificate" to center it
    let heading = "Certificate Of Appreciation";
    let headingWidth = doc.getStringUnitWidth(heading) * doc.getFontSize() / doc.internal.scaleFactor;
    let headingOffset = (doc.internal.pageSize.getWidth() - headingWidth) / 2;
    doc.text(heading, headingOffset, 80); // Adjust the Y position as needed

    // Set the font to normal and less bold for the subheading
    doc.setFont('helvetica', 'Bold');
    doc.setFontSize(22); // Adjust the font size as needed for the subheading

    // Calculate the position for the subheading "of donation" to center it
    // let subheading = "of donation";
    // let subheadingWidth = doc.getStringUnitWidth(subheading) * doc.getFontSize() / doc.internal.scaleFactor;
    // let subheadingOffset = (doc.internal.pageSize.getWidth() - subheadingWidth) / 2;
    // doc.text(subheading, subheadingOffset, 120); // Adjust the Y position as needed

    // Set the font and size for "Daanam"
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(30); // Adjust the font size as needed

    // Calculate the position for "Daanam" to center it
    let daanam = "Daanam";
    let daanamWidth = doc.getStringUnitWidth(daanam) * doc.getFontSize() / doc.internal.scaleFactor;
    let daanamOffset = (doc.internal.pageSize.getWidth() - daanamWidth) / 2;
    doc.text(daanam, daanamOffset,160); // Adjust the Y position as needed

    doc.setFont('helvetica', 'cursive');
    doc.setFontSize(16);
    let text = `This is To Certify that the user ${this.donorName} has successfully donated to our Charities`;
    // Calculate the text's width (in points) and the center position
    const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.getWidth() - textWidth) / 2; // Calculate the x offset to center the text

    // Adjust the Y position to ensure it doesn't overlap with "Daanam"
    // For example, placing it 40 points below "Daanam"
    const textYPosition = doc.internal.pageSize.getHeight() / 2 + 60;
    doc.text(text, textOffset, textYPosition);

    doc.setDrawColor(60, 200, 143); // This sets the draw color to green

    // Set the width of the border line
    doc.setLineWidth(3); // Adjust the line width as needed

    doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);



  // Save the document
  doc.save('DonationCertificate.pdf');
    })
  }
}

