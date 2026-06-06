# Google Sheets Setup Guide

This guide walks you through setting up a Google Sheet and a Google Apps Script to securely store commission inquiries and newsletter subscriptions from your website.

---

## Step 1: Create a Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a new, blank spreadsheet.
2. Rename the spreadsheet to something recognizable, like `Kayla Nguyen Website Database`.
3. Create two tabs (sheets) inside this spreadsheet:
   - Name the first tab **`Commissions`**
   - Name the second tab **`Newsletter`**
4. (Optional) You can add the column headers in the first row of each tab for readability:
   - **`Commissions`** tab headers:
     `Name` | `Email` | `Phone` | `Country` | `Artwork Type` | `Dimensions` | `Budget` | `Message` | `Created At`
   - **`Newsletter`** tab headers:
     `Email` | `Created At`

---

## Step 2: Write the Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script** in the top menu bar.
2. Delete any existing code in the script editor and paste the following code block:

```javascript
/**
 * Handles incoming POST requests from the website
 */
function doPost(e) {
  try {
    // Parse the JSON request body
    var data = JSON.parse(e.postData.contents);
    var type = data.type; // 'commission' or 'newsletter'
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Automatically retrieve the spreadsheet owner's email address
    var ownerEmail = Session.getActiveUser().getEmail() || "your-email@gmail.com";
    
    // Format timestamp in Vietnam Time (GMT+7) with dd-MM-yyyy HH-mm-ss format
    var timestamp = Utilities.formatDate(new Date(), "GMT+7", "dd-MM-yyyy HH-mm-ss");
    
    if (type === 'newsletter') {
      var sheet = ss.getSheetByName('Newsletter');
      if (!sheet) {
        sheet = ss.insertSheet('Newsletter');
        sheet.appendRow(['Email', 'Created At']);
      }
      sheet.appendRow([
        data.email,
        timestamp
      ]);
      
      // SEND EMAIL NOTIFICATION FOR NEWSLETTER SIGNUP
      MailApp.sendEmail({
        to: ownerEmail,
        subject: "🔔 Đăng ký Bản tin Mới - Kayla Nguyen Studio",
        htmlBody: "<p>Có một người đăng ký nhận bản tin mới từ website:</p>" +
                  "<p><b>Email:</b> " + data.email + "</p>" +
                  "<p><i>Thời gian:</i> " + timestamp + "</p>"
      });
      
    } else {
      var sheet = ss.getSheetByName('Commissions');
      if (!sheet) {
        sheet = ss.insertSheet('Commissions');
        sheet.appendRow(['Name', 'Email', 'Phone', 'Country', 'Artwork Type', 'Dimensions', 'Budget', 'Message', 'Created At']);
      }
      sheet.appendRow([
        data.name,
        data.email,
        data.phone || '',
        data.country,
        data.artwork_type,
        data.dimensions,
        data.budget,
        data.message,
        timestamp
      ]);
      
      // SEND DETAILED EMAIL NOTIFICATION FOR NEW COMMISSION REQUEST
      MailApp.sendEmail({
        to: ownerEmail,
        subject: "✨ Yêu Cầu Đặt Tranh Mới từ " + data.name,
        htmlBody: "<h3>Có một yêu cầu hợp tác đặt tác phẩm mới:</h3>" +
                  "<p><b>Họ tên:</b> " + data.name + "</p>" +
                  "<p><b>Email:</b> " + data.email + "</p>" +
                  "<p><b>Số điện thoại:</b> " + (data.phone || 'Không có') + "</p>" +
                  "<p><b>Quốc gia/Thành phố:</b> " + data.country + "</p>" +
                  "<p><b>Thể loại tranh:</b> " + data.artwork_type + "</p>" +
                  "<p><b>Kích thước:</b> " + data.dimensions + "</p>" +
                  "<p><b>Khoảng ngân sách:</b> " + data.budget + "</p>" +
                  "<p><b>Lời nhắn/Ý tưởng:</b><br>" + data.message.replace(/\n/g, "<br>") + "</p>" +
                  "<hr>" +
                  "<p><i>Hãy mở bảng tính Google Sheets để xem toàn bộ danh sách.</i></p>"
      });
    }
    
    // Return standard success response
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return standard error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (disk icon) or press `Ctrl + S`.

---

## Step 3: Deploy as a Web App

To make the script accessible to your website, you must deploy it as a public web application:

1. In the top-right of the Apps Script page, click the **Deploy** button > **New deployment**.
2. Click the gear icon (**Select type**) and select **Web app**.
3. Configure the deployment settings:
   - **Description**: `Kayla Website API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(This is critical to allow your Next.js backend to make requests without manual login credentials).*
4. Click **Deploy**.
5. Google may ask you to authorize permissions. Click **Authorize access**, choose your Google account, click **Advanced**, then **Go to Untitled project (unsafe)** and click **Allow**.
6. Once deployed, copy the **`Web app URL`** under the deployment details (it looks like `https://script.google.com/macros/s/XXXXX/exec`).

---

## Step 4: Configure Next.js Environment Variables

1. Create or open your `.env.local` or production environment settings.
2. Add your copied **Web app URL** to the environment variable list:

```bash
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXXX/exec
```

3. Restart your development server (`npm run dev`) or redeploy to Vercel/your hosting provider to apply the environment changes.
